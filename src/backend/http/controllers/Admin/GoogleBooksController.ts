import { Request, Response } from 'express'
import { PrismaClient } from '../../../generated/client'
import { BaseController } from '../BaseController'

/**
 * GoogleBooksController handles all Google Books admin operations
 * Similar to Laravel's Resource Controller
 */
export class GoogleBooksController extends BaseController {
  private prisma: PrismaClient

  constructor() {
    super()
    this.prisma = new PrismaClient()
  }

  /**
   * Display a listing of Google Books with intelligent pagination
   * GET /api/admin/google-books
   */
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const {
        page = '1',
        limit = '50',
        search,
        language,
        category,
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = req.query as {
        page?: string
        limit?: string
        search?: string
        language?: string
        category?: string
        sortBy?: 'createdAt' | 'title' | 'publishedDate' | 'averageRating'
        sortOrder?: 'asc' | 'desc'
      }

      const pageNum = Math.max(1, parseInt(page))
      const limitNum = Math.min(100, Math.max(1, parseInt(limit))) // Cap at 100 per page
      const skip = (pageNum - 1) * limitNum

      // Build where clause for filtering
      const where: any = {}

      if (search) {
        where.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { authors: { has: search } }, // PostgreSQL array contains
          { publisher: { contains: search, mode: 'insensitive' } },
          { googleBooksId: { contains: search, mode: 'insensitive' } }
        ]
      }

      if (language) {
        where.language = language
      }

      if (category) {
        where.categories = { has: category }
      }

      // Build orderBy clause
      const orderBy: any = {}
      if (sortBy === 'createdAt') {
        orderBy.createdAt = sortOrder
      } else if (sortBy === 'title') {
        orderBy.title = sortOrder
      } else if (sortBy === 'publishedDate') {
        orderBy.publishedDate = sortOrder
      } else if (sortBy === 'averageRating') {
        orderBy.averageRating = sortOrder
      }

      // For very large datasets, use cursor-based pagination for pages beyond reasonable limit
      const useCursorPagination = pageNum > 1000
      let books: any[] = []
      let total: number = 0

      if (useCursorPagination && sortBy === 'createdAt') {
        // Use cursor-based pagination for deep pages
        const cursorId = skip > 0 ? skip : undefined
        
        books = await this.prisma.googleBook.findMany({
          where: {
            ...where,
            ...(cursorId && { id: { [sortOrder === 'asc' ? 'gte' : 'lte']: cursorId } })
          },
          select: {
            id: true,
            googleBooksId: true,
            title: true,
            authors: true,
            publisher: true,
            publishedDate: true,
            language: true,
            categories: true,
            pageCount: true,
            averageRating: true,
            ratingsCount: true,
            createdAt: true
          },
          orderBy,
          take: limitNum
        })

        // Estimate total for cursor pagination (expensive exact count avoided)
        if (pageNum === 1) {
          total = await this.prisma.googleBook.count({ where })
        } else {
          // Use approximate count for deep pagination
          total = Math.max(pageNum * limitNum, 1000000) // Rough estimate
        }
      } else {
        // Use standard offset pagination for reasonable page numbers
        const [booksResult, totalResult] = await Promise.all([
          this.prisma.googleBook.findMany({
            where,
            select: {
              id: true,
              googleBooksId: true,
              title: true,
              authors: true,
              publisher: true,  
              publishedDate: true,
              language: true,
              categories: true,
              pageCount: true,
              averageRating: true,
              ratingsCount: true,
              createdAt: true
            },
            orderBy,
            skip,
            take: limitNum
          }),
          // Only get exact count for first few pages to avoid performance issues
          pageNum <= 100 
            ? this.prisma.googleBook.count({ where })
            : Promise.resolve(Math.max(skip + books?.length || limitNum, 1000000))
        ])

        books = booksResult
        total = totalResult
      }

      const totalPages = Math.ceil(total / limitNum)
      const hasNext = pageNum < totalPages
      const hasPrev = pageNum > 1

      return res.json({
        data: books,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages,
          hasNext,
          hasPrev
        }
      })

    } catch (error) {
      console.error('Error fetching Google Books:', error)
      return this.error(res, 'Failed to fetch Google Books')
    }
  }

  /**
   * Display Google Books statistics for dashboard
   * GET /api/admin/google-books/stats
   */
  public async stats(req: Request, res: Response): Promise<Response> {
    try {
      const [
        totalBooks,
        recentBooks,
        languageStats,
        ratingStats,
        categoryStats
      ] = await Promise.all([
        // Total count
        this.prisma.googleBook.count(),
        
        // Books added in last 24 hours
        this.prisma.googleBook.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
            }
          }
        }),
        
        // Top languages
        this.prisma.googleBook.groupBy({
          by: ['language'],
          _count: { language: true },
          orderBy: { _count: { language: 'desc' } },
          take: 10
        }),
        
        // Rating distribution
        this.prisma.googleBook.aggregate({
          _avg: { averageRating: true },
          _count: { averageRating: true }
        }),
        
        // Top categories (using raw query for array field)
        this.prisma.$queryRaw<Array<{ category: string; count: bigint }>>`
          SELECT category, COUNT(*) as count
          FROM (
            SELECT unnest(categories) as category
            FROM google_books
            WHERE array_length(categories, 1) > 0
          ) as category_data
          GROUP BY category
          ORDER BY count DESC
          LIMIT 10
        `
      ])

      return res.json({
        totalBooks,
        recentBooks,
        averageRating: ratingStats._avg.averageRating,
        booksWithRatings: ratingStats._count.averageRating,
        topLanguages: languageStats.map(stat => ({
          language: stat.language || 'Unknown',
          count: stat._count.language
        })),
        topCategories: categoryStats.map(stat => ({
          category: stat.category,
          count: Number(stat.count)
        }))
      })

    } catch (error) {
      console.error('Error fetching Google Books stats:', error)
      return this.error(res, 'Failed to fetch statistics')
    }
  }

  /**
   * Display the specified Google Book
   * GET /api/admin/google-books/:id
   */
  public async show(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      
      const book = await this.prisma.googleBook.findFirst({
        where: {
          OR: [
            { id: parseInt(id) || 0 },
            { googleBooksId: id }
          ]
        },
        include: {
          work: {
            include: {
              authors: {
                include: {
                  author: true
                }
              }
            }
          }
        }
      })

      if (!book) {
        return this.notFound(res, 'Google Book not found')
      }

      return this.success(res, book, 'Google Book retrieved successfully')

    } catch (error) {
      console.error('Error fetching Google Book:', error)
      return this.error(res, 'Failed to fetch Google Book')
    }
  }

  /**
   * Get filter options for dropdowns
   * GET /api/admin/google-books/filters/options
   */
  public async filterOptions(req: Request, res: Response): Promise<Response> {
    try {
      const [languages, categories] = await Promise.all([
        // Get available languages
        this.prisma.googleBook.groupBy({
          by: ['language'],
          _count: { language: true },
          orderBy: { _count: { language: 'desc' } },
          take: 50,
          where: {
            language: { not: null }
          }
        }),
        
        // Get available categories
        this.prisma.$queryRaw<Array<{ category: string; count: bigint }>>`
          SELECT category, COUNT(*) as count
          FROM (
            SELECT unnest(categories) as category
            FROM google_books
            WHERE array_length(categories, 1) > 0
          ) as category_data
          GROUP BY category
          ORDER BY count DESC
          LIMIT 100
        `
      ])

      return res.json({
        languages: languages.map(lang => ({
          value: lang.language,
          label: lang.language?.toUpperCase() || 'Unknown',
          count: lang._count.language
        })),
        categories: categories.map(cat => ({
          value: cat.category,
          label: cat.category,
          count: Number(cat.count)
        }))
      })

    } catch (error) {
      console.error('Error fetching filter options:', error)
      return this.error(res, 'Failed to fetch filter options')
    }
  }

  /**
   * Clean up resources
   * Call this in middleware or application shutdown
   */
  public async dispose(): Promise<void> {
    await this.prisma.$disconnect()
  }
}