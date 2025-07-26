import { PrismaClient } from '@/generated/client'
import type { User, RecommendationScore } from '@/types'

export interface RealtimeUpdate {
  userId: string
  workId: number
  action: 'like' | 'dislike' | 'view'
  timestamp: Date
  context?: string
}

export interface CacheEntry {
  recommendations: RecommendationScore[]
  timestamp: number
  userFingerprint: string
}

export class RealtimeEngine {
  private recommendationCache: Map<string, CacheEntry> = new Map()
  private recentUpdates: RealtimeUpdate[] = []
  private readonly CACHE_TTL = 30 * 60 * 1000 // 30 minutes
  private readonly MAX_RECENT_UPDATES = 1000

  constructor(_prisma: PrismaClient) {
    // Prisma instance available but not currently used in this implementation
    
    // Clean up cache periodically
    setInterval(() => {
      this.cleanupCache()
    }, 5 * 60 * 1000) // Every 5 minutes
  }

  /**
   * Record real-time user interaction and trigger updates
   */
  async recordRealtimeInteraction(
    userId: string,
    workId: number,
    action: 'like' | 'dislike' | 'view',
    context?: string
  ): Promise<void> {
    const update: RealtimeUpdate = {
      userId,
      workId,
      action,
      timestamp: new Date(),
      context
    }

    // Store the update
    this.recentUpdates.push(update)
    
    // Keep only recent updates
    if (this.recentUpdates.length > this.MAX_RECENT_UPDATES) {
      this.recentUpdates = this.recentUpdates.slice(-this.MAX_RECENT_UPDATES)
    }

    // Invalidate user's cached recommendations if they interacted
    if (action === 'like' || action === 'dislike') {
      this.invalidateUserCache(userId)
      
      // Also invalidate similar users' caches (collaborative filtering impact)
      await this.invalidateSimilarUserCaches(userId)
    }

    // Update global trending data
    await this.updateTrendingData(workId, action)
  }

  /**
   * Get cached recommendations or indicate they need refresh
   */
  getCachedRecommendations(userId: string, userFingerprint: string): RecommendationScore[] | null {
    const cached = this.recommendationCache.get(userId)
    
    if (!cached) return null
    
    const isExpired = Date.now() - cached.timestamp > this.CACHE_TTL
    const fingerprintChanged = cached.userFingerprint !== userFingerprint
    
    if (isExpired || fingerprintChanged) {
      this.recommendationCache.delete(userId)
      return null
    }
    
    return cached.recommendations
  }

  /**
   * Cache recommendations for a user
   */
  cacheRecommendations(
    userId: string, 
    recommendations: RecommendationScore[], 
    userFingerprint: string
  ): void {
    this.recommendationCache.set(userId, {
      recommendations,
      timestamp: Date.now(),
      userFingerprint
    })
  }

  /**
   * Generate user fingerprint based on recent preferences
   */
  generateUserFingerprint(user: User): string {
    const topSubjects = Object.entries(user.subjectPreferences)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([subject]) => subject)
      .join(',')
    
    const interactionCount = user.totalLikes + user.totalDislikes
    const lastInteraction = user.lastInteractionAt?.getTime() || 0
    
    return `${topSubjects}:${interactionCount}:${lastInteraction}`
  }

  /**
   * Get real-time trending boost for works
   */
  getRealtimeTrendingBoost(workId: number): number {
    const recentInteractions = this.recentUpdates.filter(
      update => update.workId === workId && 
      Date.now() - update.timestamp.getTime() < 60 * 60 * 1000 // Last hour
    )

    if (recentInteractions.length === 0) return 0

    const likes = recentInteractions.filter(u => u.action === 'like').length
    const dislikes = recentInteractions.filter(u => u.action === 'dislike').length
    const total = likes + dislikes

    if (total === 0) return 0

    const likeRatio = likes / total
    const volumeBoost = Math.min(Math.log(total + 1) / 10, 0.2) // Cap at 20%
    
    return likeRatio * volumeBoost
  }

  /**
   * Apply real-time adjustments to recommendations
   */
  applyRealtimeAdjustments(recommendations: RecommendationScore[]): RecommendationScore[] {
    return recommendations.map(rec => {
      const trendingBoost = this.getRealtimeTrendingBoost(rec.workId)
      
      if (trendingBoost > 0.05) { // Only apply significant boosts
        return {
          ...rec,
          finalScore: rec.finalScore + trendingBoost,
          reasons: [...rec.reasons, 'Currently trending']
        }
      }
      
      return rec
    }).sort((a, b) => b.finalScore - a.finalScore)
  }

  /**
   * Get recent interaction patterns for analysis
   */
  getRecentInteractionPatterns(minutes: number = 60): {
    totalInteractions: number
    likeRatio: number
    topWorks: Array<{ workId: number; interactions: number }>
    peakTimes: Array<{ hour: number; interactions: number }>
  } {
    const since = new Date()
    since.setMinutes(since.getMinutes() - minutes)

    const recentUpdates = this.recentUpdates.filter(
      update => update.timestamp >= since
    )

    const totalInteractions = recentUpdates.length
    const likes = recentUpdates.filter(u => u.action === 'like').length
    const likeRatio = totalInteractions > 0 ? likes / totalInteractions : 0

    // Count interactions per work
    const workCounts: Record<number, number> = {}
    for (const update of recentUpdates) {
      workCounts[update.workId] = (workCounts[update.workId] || 0) + 1
    }

    const topWorks = Object.entries(workCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([workId, interactions]) => ({ workId: parseInt(workId), interactions }))

    // Count interactions per hour
    const hourCounts: Record<number, number> = {}
    for (const update of recentUpdates) {
      const hour = update.timestamp.getHours()
      hourCounts[hour] = (hourCounts[hour] || 0) + 1
    }

    const peakTimes = Object.entries(hourCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([hour, interactions]) => ({ hour: parseInt(hour), interactions }))

    return {
      totalInteractions,
      likeRatio,
      topWorks,
      peakTimes
    }
  }

  /**
   * Invalidate a user's cached recommendations
   */
  private invalidateUserCache(userId: string): void {
    this.recommendationCache.delete(userId)
  }

  /**
   * Invalidate similar users' caches (collaborative filtering impact)
   */
  private async invalidateSimilarUserCaches(_userId: string): Promise<void> {
    // This is a simplified implementation
    // In practice, you'd find users with similar preferences and invalidate their caches
    // For now, we'll just clear a few random caches to simulate the effect
    
    const cacheKeys = Array.from(this.recommendationCache.keys())
    const toInvalidate = cacheKeys.slice(0, Math.min(3, cacheKeys.length))
    
    for (const key of toInvalidate) {
      if (Math.random() < 0.3) { // 30% chance to invalidate similar user
        this.recommendationCache.delete(key)
      }
    }
  }

  /**
   * Update trending data based on real-time interactions
   */
  private async updateTrendingData(_workId: number, _action: string): Promise<void> {
    // This could update a trending score in the database
    // For now, we'll just ensure the interaction is recorded in our memory
    
    if (_action === 'like' || _action === 'dislike') {
      // In a real implementation, you might update a trending score table
      // or push to a message queue for processing
    }
  }

  /**
   * Clean up expired cache entries
   */
  private cleanupCache(): void {
    const now = Date.now()
    const expiredKeys: string[] = []

    for (const [userId, cached] of this.recommendationCache.entries()) {
      if (now - cached.timestamp > this.CACHE_TTL) {
        expiredKeys.push(userId)
      }
    }

    for (const key of expiredKeys) {
      this.recommendationCache.delete(key)
    }

    // Clean up old updates
    const cutoff = new Date()
    cutoff.setHours(cutoff.getHours() - 24) // Keep last 24 hours
    
    this.recentUpdates = this.recentUpdates.filter(
      update => update.timestamp >= cutoff
    )
  }

  /**
   * Get cache statistics for monitoring
   */
  getCacheStats(): {
    totalCached: number
    hitRate: number
    avgCacheAge: number
    recentUpdatesCount: number
  } {
    const now = Date.now()
    let totalAge = 0
    
    for (const cached of this.recommendationCache.values()) {
      totalAge += now - cached.timestamp
    }

    const avgCacheAge = this.recommendationCache.size > 0 ? 
      totalAge / this.recommendationCache.size : 0

    return {
      totalCached: this.recommendationCache.size,
      hitRate: 0, // Would need to track hits/misses to calculate
      avgCacheAge: avgCacheAge / 1000, // Convert to seconds
      recentUpdatesCount: this.recentUpdates.length
    }
  }

  /**
   * Preload recommendations for active users
   */
  async preloadRecommendations(
    activeUserIds: string[],
    getRecommendationsFunction: (userId: string) => Promise<RecommendationScore[]>,
    getUserFunction: (userId: string) => Promise<User>
  ): Promise<void> {
    const preloadPromises = activeUserIds.map(async userId => {
      try {
        const user = await getUserFunction(userId)
        const fingerprint = this.generateUserFingerprint(user)
        
        // Only preload if not already cached
        if (!this.getCachedRecommendations(userId, fingerprint)) {
          const recommendations = await getRecommendationsFunction(userId)
          this.cacheRecommendations(userId, recommendations, fingerprint)
        }
      } catch (error) {
        console.error(`Failed to preload recommendations for user ${userId}:`, error)
      }
    })

    await Promise.all(preloadPromises)
  }
}