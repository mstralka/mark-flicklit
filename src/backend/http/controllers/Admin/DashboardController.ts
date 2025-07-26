import { Request, Response } from 'express'
import { PrismaClient } from '../../../generated/client'
import { BaseController } from '../BaseController'

/**
 * DashboardController handles admin dashboard statistics and overview data
 */
export class DashboardController extends BaseController {
  private prisma: PrismaClient

  constructor() {
    super()
    this.prisma = new PrismaClient()
  }

  /**
   * Get admin dashboard statistics
   * GET /api/admin/stats
   */
  public async stats(req: Request, res: Response): Promise<Response> {
    try {
      const [
        totalAuthors,
        totalWorks,
        totalUsers,
        recentAuthors,
        recentWorks
      ] = await Promise.all([
        this.prisma.author.count(),
        this.prisma.work.count(),
        this.prisma.user.count(),
        this.prisma.author.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
            }
          }
        }),
        this.prisma.work.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
            }
          }
        })
      ])

      const stats = {
        totals: {
          authors: totalAuthors,
          works: totalWorks,
          users: totalUsers
        },
        recent: {
          authors: recentAuthors,
          works: recentWorks
        }
      }

      return this.success(res, stats, 'Dashboard statistics retrieved successfully')

    } catch (error) {
      console.error('Error fetching admin stats:', error)
      return this.error(res, 'Failed to fetch statistics')
    }
  }

  /**
   * Get detailed analytics for the admin dashboard
   * GET /api/admin/analytics
   */
  public async analytics(req: Request, res: Response): Promise<Response> {
    try {
      // Get growth metrics for the last 30 days
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

      const [
        authorsLast30Days,
        authorsLast7Days,
        worksLast30Days,
        worksLast7Days,
        usersLast30Days,
        usersLast7Days,
        topAuthorsByWorks,
        recentActivity
      ] = await Promise.all([
        this.prisma.author.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
        this.prisma.author.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
        this.prisma.work.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
        this.prisma.work.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
        this.prisma.user.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
        this.prisma.user.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
        
        // Top authors by number of works
        this.prisma.author.findMany({
          select: {
            id: true,
            name: true,
            _count: {
              select: { works: true }
            }
          },
          orderBy: {
            works: {
              _count: 'desc'
            }
          },
          take: 10
        }),

        // Recent activity (latest additions)
        this.prisma.author.findMany({
          select: {
            id: true,
            name: true,
            createdAt: true,
            _count: {
              select: { works: true }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 5
        })
      ])

      const analytics = {
        growth: {
          authors: {
            last30Days: authorsLast30Days,
            last7Days: authorsLast7Days,
            weeklyGrowthRate: authorsLast7Days > 0 ? 
              ((authorsLast7Days / Math.max(authorsLast30Days - authorsLast7Days, 1)) * 100).toFixed(2) : '0'
          },
          works: {
            last30Days: worksLast30Days,
            last7Days: worksLast7Days,
            weeklyGrowthRate: worksLast7Days > 0 ? 
              ((worksLast7Days / Math.max(worksLast30Days - worksLast7Days, 1)) * 100).toFixed(2) : '0'
          },
          users: {
            last30Days: usersLast30Days,
            last7Days: usersLast7Days,
            weeklyGrowthRate: usersLast7Days > 0 ? 
              ((usersLast7Days / Math.max(usersLast30Days - usersLast7Days, 1)) * 100).toFixed(2) : '0'
          }
        },
        topAuthors: topAuthorsByWorks.map(author => ({
          id: author.id,
          name: author.name,
          worksCount: author._count.works
        })),
        recentActivity: recentActivity.map(author => ({
          id: author.id,
          name: author.name,
          createdAt: author.createdAt,
          worksCount: author._count.works
        }))
      }

      return this.success(res, analytics, 'Analytics data retrieved successfully')

    } catch (error) {
      console.error('Error fetching analytics:', error)
      return this.error(res, 'Failed to fetch analytics data')
    }
  }

  /**
   * Clean up resources
   */
  public async dispose(): Promise<void> {
    await this.prisma.$disconnect()
  }
}