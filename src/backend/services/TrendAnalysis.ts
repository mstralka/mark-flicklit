import { PrismaClient } from '../generated/client'
import type { WorkWithAuthors } from '../models'

export interface TrendData {
  period: string
  totalInteractions: number
  likes: number
  dislikes: number
  likeRatio: number
  topSubjects: Array<{ subject: string; count: number }>
  topAuthors: Array<{ authorId: number; authorName: string; count: number }>
}

export interface SeasonalTrend {
  season: 'spring' | 'summer' | 'fall' | 'winter'
  subjects: Record<string, number>
  popularity: number
}

export interface WorkTrend {
  workId: number
  title: string
  trendScore: number
  velocityScore: number
  seasonalBonus: number
  recencyBonus: number
}

export class TrendAnalysis {
  private prisma: PrismaClient
  private seasonalPatterns: Record<string, SeasonalTrend> = {}

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  /**
   * Analyze trending works based on recent interaction patterns
   */
  async analyzeTrendingWorks(days: number = 30, limit: number = 20): Promise<WorkTrend[]> {
    const since = new Date()
    since.setDate(since.getDate() - days)

    // Get recent interactions with work details
    const recentInteractions = await this.prisma.userInteraction.findMany({
      where: {
        createdAt: { gte: since }
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
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Group interactions by work
    const workStats = new Map<number, {
      work: any
      interactions: Array<{ liked: boolean; createdAt: Date }>
    }>()

    for (const interaction of recentInteractions) {
      const workId = interaction.workId
      if (!workStats.has(workId)) {
        workStats.set(workId, {
          work: interaction.work,
          interactions: []
        })
      }
      workStats.get(workId)!.interactions.push({
        liked: interaction.liked,
        createdAt: interaction.createdAt
      })
    }

    // Calculate trend scores
    const trends: WorkTrend[] = []
    const currentSeason = this.getCurrentSeason()

    for (const [workId, stats] of workStats.entries()) {
      if (stats.interactions.length < 3) continue // Need minimum interactions

      const trendScore = this.calculateTrendScore(stats.interactions)
      const velocityScore = this.calculateVelocityScore(stats.interactions, days)
      const seasonalBonus = this.calculateSeasonalBonus(stats.work, currentSeason)
      const recencyBonus = this.calculateRecencyBonus(stats.interactions)

      trends.push({
        workId,
        title: stats.work.title,
        trendScore,
        velocityScore,
        seasonalBonus,
        recencyBonus
      })
    }

    return trends
      .sort((a, b) => {
        const scoreA = a.trendScore + a.velocityScore + a.seasonalBonus + a.recencyBonus
        const scoreB = b.trendScore + b.velocityScore + b.seasonalBonus + b.recencyBonus
        return scoreB - scoreA
      })
      .slice(0, limit)
  }

  /**
   * Build seasonal patterns from historical data
   */
  async buildSeasonalPatterns(): Promise<void> {
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

    const historicalInteractions = await this.prisma.userInteraction.findMany({
      where: {
        createdAt: { gte: oneYearAgo },
        liked: true // Only consider liked books for seasonal patterns
      },
      include: {
        work: true
      }
    })

    // Group by season
    const seasonalData: Record<string, Array<{ subjects: string[]; date: Date }>> = {
      spring: [],
      summer: [],
      fall: [],
      winter: []
    }

    for (const interaction of historicalInteractions) {
      const season = this.getSeasonFromDate(interaction.createdAt)
      const subjects = interaction.work.subjects || []
      
      seasonalData[season].push({
        subjects,
        date: interaction.createdAt
      })
    }

    // Build seasonal patterns
    for (const [season, data] of Object.entries(seasonalData)) {
      const subjectCounts: Record<string, number> = {}
      let totalInteractions = 0

      for (const item of data) {
        totalInteractions++
        for (const subject of item.subjects) {
          const normalizedSubject = subject.toLowerCase()
          subjectCounts[normalizedSubject] = (subjectCounts[normalizedSubject] || 0) + 1
        }
      }

      // Normalize to frequencies
      const subjectFrequencies: Record<string, number> = {}
      for (const [subject, count] of Object.entries(subjectCounts)) {
        subjectFrequencies[subject] = count / totalInteractions
      }

      this.seasonalPatterns[season] = {
        season: season as SeasonalTrend['season'],
        subjects: subjectFrequencies,
        popularity: totalInteractions
      }
    }
  }

  /**
   * Get seasonal recommendation boost for a work
   */
  getSeasonalBoost(work: WorkWithAuthors): number {
    const currentSeason = this.getCurrentSeason()
    const seasonalPattern = this.seasonalPatterns[currentSeason]
    
    if (!seasonalPattern) return 0

    let boost = 0
    const subjects = work.subjects.map(s => s.toLowerCase())
    
    for (const subject of subjects) {
      const seasonalFreq = seasonalPattern.subjects[subject] || 0
      boost += seasonalFreq
    }

    return Math.min(boost / subjects.length, 0.2) // Cap at 20% boost
  }

  /**
   * Analyze interaction trends over time periods
   */
  async getTrendData(days: number = 30): Promise<TrendData[]> {
    const periods: TrendData[] = []
    const periodLength = Math.max(1, Math.floor(days / 7)) // Weekly periods

    for (let i = 0; i < 7; i++) {
      const endDate = new Date()
      endDate.setDate(endDate.getDate() - (i * periodLength))
      
      const startDate = new Date(endDate)
      startDate.setDate(startDate.getDate() - periodLength)

      const interactions = await this.prisma.userInteraction.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lt: endDate
          }
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

      const likes = interactions.filter(i => i.liked).length
      const dislikes = interactions.filter(i => !i.liked).length
      const total = interactions.length

      // Analyze subjects
      const subjectCounts: Record<string, number> = {}
      const authorCounts: Record<number, { name: string; count: number }> = {}

      for (const interaction of interactions.filter(i => i.liked)) {
        const subjects = interaction.work.subjects || []
        for (const subject of subjects) {
          subjectCounts[subject] = (subjectCounts[subject] || 0) + 1
        }

        for (const authorWork of interaction.work.authors) {
          const authorId = authorWork.authorId
          const authorName = authorWork.author.name
          if (!authorCounts[authorId]) {
            authorCounts[authorId] = { name: authorName, count: 0 }
          }
          authorCounts[authorId].count++
        }
      }

      periods.push({
        period: `${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]}`,
        totalInteractions: total,
        likes,
        dislikes,
        likeRatio: total > 0 ? likes / total : 0,
        topSubjects: Object.entries(subjectCounts)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5)
          .map(([subject, count]) => ({ subject, count })),
        topAuthors: Object.entries(authorCounts)
          .sort(([,a], [,b]) => b.count - a.count)
          .slice(0, 5)
          .map(([authorId, data]) => ({ authorId: parseInt(authorId), authorName: data.name, count: data.count }))
      })
    }

    return periods.reverse() // Most recent first
  }

  /**
   * Calculate trend score based on like/dislike ratio and growth
   */
  private calculateTrendScore(interactions: Array<{ liked: boolean; createdAt: Date }>): number {
    const likes = interactions.filter(i => i.liked).length
    const total = interactions.length
    
    if (total === 0) return 0
    
    const likeRatio = likes / total
    const popularityScore = Math.log(total + 1) / 10 // Diminishing returns for high volume
    
    return (likeRatio * 0.7) + (popularityScore * 0.3)
  }

  /**
   * Calculate velocity score based on interaction frequency
   */
  private calculateVelocityScore(interactions: Array<{ liked: boolean; createdAt: Date }>, days: number): number {
    const interactionsPerDay = interactions.length / days
    return Math.min(interactionsPerDay / 5, 1) // Normalize, cap at 1
  }

  /**
   * Calculate seasonal bonus for work subjects
   */
  private calculateSeasonalBonus(work: any, season: string): number {
    const seasonalPattern = this.seasonalPatterns[season]
    if (!seasonalPattern) return 0

    const subjects = JSON.parse(work.subjects || '[]') as string[]
    let bonus = 0

    for (const subject of subjects) {
      const normalizedSubject = subject.toLowerCase()
      bonus += seasonalPattern.subjects[normalizedSubject] || 0
    }

    return Math.min(bonus / subjects.length, 0.15) // Cap at 15%
  }

  /**
   * Calculate recency bonus - more recent interactions get higher scores
   */
  private calculateRecencyBonus(interactions: Array<{ liked: boolean; createdAt: Date }>): number {
    const now = new Date()
    const recencyScores = interactions.map(interaction => {
      const daysSince = (now.getTime() - interaction.createdAt.getTime()) / (1000 * 60 * 60 * 24)
      return Math.max(0, 1 - (daysSince / 30)) // Linear decay over 30 days
    })

    return recencyScores.reduce((sum, score) => sum + score, 0) / interactions.length
  }

  /**
   * Get current season
   */
  private getCurrentSeason(): string {
    const month = new Date().getMonth() + 1 // 1-12
    
    if (month >= 3 && month <= 5) return 'spring'
    if (month >= 6 && month <= 8) return 'summer'  
    if (month >= 9 && month <= 11) return 'fall'
    return 'winter'
  }

  /**
   * Get season from date
   */
  private getSeasonFromDate(date: Date): string {
    const month = date.getMonth() + 1 // 1-12
    
    if (month >= 3 && month <= 5) return 'spring'
    if (month >= 6 && month <= 8) return 'summer'
    if (month >= 9 && month <= 11) return 'fall'
    return 'winter'
  }

  /**
   * Get trending subjects for current period
   */
  async getTrendingSubjects(days: number = 7, limit: number = 10): Promise<Array<{ subject: string; trendScore: number }>> {
    const since = new Date()
    since.setDate(since.getDate() - days)

    const recentLikes = await this.prisma.userInteraction.findMany({
      where: {
        createdAt: { gte: since },
        liked: true
      },
      include: {
        work: true
      }
    })

    const subjectCounts: Record<string, number> = {}
    
    for (const interaction of recentLikes) {
      const subjects = interaction.work.subjects || []
      for (const subject of subjects) {
        subjectCounts[subject] = (subjectCounts[subject] || 0) + 1
      }
    }

    return Object.entries(subjectCounts)
      .map(([subject, count]) => ({
        subject,
        trendScore: count / recentLikes.length
      }))
      .sort((a, b) => b.trendScore - a.trendScore)
      .slice(0, limit)
  }
}