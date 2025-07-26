import { Request, Response } from 'express'
import { z } from 'zod'
import { PrismaClient } from '../../../generated/client'
import { parseAuthor } from '../../../models/Author'
import { BaseController } from '../BaseController'
import { AuthorListRequest } from '../../requests/AuthorListRequest'

/**
 * AuthorController handles all author-related admin operations
 * Similar to Laravel's Resource Controller
 */
export class AuthorController extends BaseController {
  private prisma: PrismaClient

  constructor() {
    super()
    this.prisma = new PrismaClient()
  }

  /**
   * Display a listing of the authors with efficient cursor-based pagination
   * GET /api/admin/authors
   */
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const { cursor, limit, search, sortBy, sortOrder } = AuthorListRequest.validate(req)

      // Build search where clause with optimized queries
      const searchWhere = search ? {
        OR: [
          // Use indexed name field first for better performance
          { name: { contains: search, mode: 'insensitive' as const } },
          { personalName: { contains: search, mode: 'insensitive' as const } },
          { location: { contains: search, mode: 'insensitive' as const } },
          // Array search on alternateNames (GIN indexed)
          { alternateNames: { has: search } }
        ]
      } : {}

      // Build cursor where clause for pagination
      const cursorWhere = cursor ? this.buildCursorWhere(cursor, sortBy, sortOrder) : {}

      // Combine where clauses
      const where = {
        ...searchWhere,
        ...cursorWhere
      }

      // Build optimized orderBy clause with id as secondary sort for consistency
      const orderBy = this.buildOrderBy(sortBy, sortOrder)

      // Get authors with cursor-based pagination (more efficient than offset for large datasets)
      const authorsRaw = await this.prisma.author.findMany({
        where,
        orderBy,
        take: limit + 1, // Fetch one extra to check if there's a next page
        select: {
          id: true,
          name: true,
          personalName: true,
          birthDate: true,
          deathDate: true,
          bio: true,
          alternateNames: true,
          location: true,
          easternOrder: true,
          wikipedia: true,
          links: true,
          openLibraryId: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              works: true
            }
          }
        }
      })

      // Check if there are more results
      const hasNextPage = authorsRaw.length > limit
      const authors = hasNextPage ? authorsRaw.slice(0, limit) : authorsRaw

      // Generate next cursor from the last item
      const nextCursor = hasNextPage && authors.length > 0 
        ? this.generateCursor(authors[authors.length - 1], sortBy) 
        : null

      // Parse authors to application format
      const parsedAuthors = authors.map(author => ({
        ...parseAuthor(author),
        worksCount: author._count.works
      }))

      // For search queries, provide approximate count (expensive exact count avoided)
      const approximateCount = search ? (
        hasNextPage ? `${limit}+` : authors.length
      ) : null

      return this.successWithPagination(
        res,
        parsedAuthors,
        {
          limit,
          hasNextPage,
          nextCursor,
          approximateCount
        },
        {
          search,
          sortBy,
          sortOrder,
          cursor
        },
        'Authors retrieved successfully'
      )

    } catch (error) {
      console.error('Error fetching authors:', error)
      
      if (error instanceof z.ZodError) {
        return this.validationError(res, error.issues, 'Invalid query parameters')
      }

      return this.error(res, 'Failed to fetch authors')
    }
  }

  /**
   * Display the specified author
   * GET /api/admin/authors/:id
   */
  public async show(req: Request, res: Response): Promise<Response> {
    try {
      const authorId = parseInt(req.params.id, 10)
      
      if (isNaN(authorId)) {
        return this.validationError(res, { id: 'Invalid author ID' })
      }

      const authorRaw = await this.prisma.author.findUnique({
        where: { id: authorId },
        include: {
          works: {
            include: {
              work: {
                select: {
                  id: true,
                  title: true,
                  subtitle: true,
                  firstPublishDate: true,
                  subjects: true
                }
              }
            },
            orderBy: {
              work: {
                firstPublishDate: 'desc'
              }
            }
          },
          _count: {
            select: {
              works: true
            }
          }
        }
      })

      if (!authorRaw) {
        return this.notFound(res, 'Author not found')
      }

      const author = {
        ...parseAuthor(authorRaw),
        works: authorRaw.works.map(aw => ({
          id: aw.work.id,
          title: aw.work.title,
          subtitle: aw.work.subtitle,
          firstPublishDate: aw.work.firstPublishDate,
          subjects: aw.work.subjects,
          role: aw.role
        })),
        worksCount: authorRaw._count.works
      }

      return this.success(res, author, 'Author retrieved successfully')

    } catch (error) {
      console.error('Error fetching author details:', error)
      return this.error(res, 'Failed to fetch author details')
    }
  }

  /**
   * Build cursor where clause for pagination
   * Private helper method
   */
  private buildCursorWhere(cursor: string, sortBy: string, sortOrder: string) {
    const [cursorValue, cursorId] = cursor.split('|')
    
    switch (sortBy) {
      case 'name':
        return sortOrder === 'asc' 
          ? { 
              OR: [
                { name: { gt: cursorValue } },
                { name: cursorValue, id: { gt: parseInt(cursorId, 10) } }
              ]
            }
          : { 
              OR: [
                { name: { lt: cursorValue } },
                { name: cursorValue, id: { gt: parseInt(cursorId, 10) } }
              ]
            }
      case 'birthDate':
        return sortOrder === 'asc'
          ? {
              OR: [
                { birthDate: { gt: cursorValue || null } },
                { birthDate: cursorValue || null, id: { gt: parseInt(cursorId, 10) } }
              ]
            }
          : {
              OR: [
                { birthDate: { lt: cursorValue || null } },
                { birthDate: cursorValue || null, id: { gt: parseInt(cursorId, 10) } }
              ]
            }
      case 'createdAt':
        return sortOrder === 'asc'
          ? {
              OR: [
                { createdAt: { gt: new Date(cursorValue) } },
                { createdAt: new Date(cursorValue), id: { gt: parseInt(cursorId, 10) } }
              ]
            }
          : {
              OR: [
                { createdAt: { lt: new Date(cursorValue) } },
                { createdAt: new Date(cursorValue), id: { gt: parseInt(cursorId, 10) } }
              ]
            }
      default: // id
        return sortOrder === 'asc'
          ? { id: { gt: parseInt(cursorId, 10) } }
          : { id: { lt: parseInt(cursorId, 10) } }
    }
  }

  /**
   * Build optimized orderBy clause
   * Private helper method
   */
  private buildOrderBy(sortBy: string, sortOrder: string) {
    const order = sortOrder as 'asc' | 'desc'
    const primarySort = (() => {
      switch (sortBy) {
        case 'name': return { name: order }
        case 'birthDate': return { birthDate: order }
        case 'createdAt': return { createdAt: order }
        default: return { id: order }
      }
    })()
    
    // Always include id as secondary sort for cursor stability
    return sortBy === 'id' ? primarySort : [primarySort, { id: 'asc' as const }]
  }

  /**
   * Generate cursor for pagination
   * Private helper method
   */
  private generateCursor(author: any, sortBy: string): string {
    switch (sortBy) {
      case 'name':
        return `${author.name}|${author.id}`
      case 'birthDate':
        return `${author.birthDate || ''}|${author.id}`
      case 'createdAt':
        return `${author.createdAt.toISOString()}|${author.id}`
      default: // id
        return `|${author.id}`
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