import { PrismaClient } from '@prisma/client'
import type { 
  User, 
  RecommendationRequest, 
  RecommendationResponse, 
  RecommendationScore
} from '../types/recommendation'
import type { WorkWithAuthors } from '../models/Work'
import { parseWork } from '../models/Work'
import { parseAuthor } from '../models/Author'
import { UserBuilder } from './UserBuilder'
import { CollaborativeFilter } from './CollaborativeFilter'

export class RecommendationEngine {
  private prisma: PrismaClient
  private userBuilder: UserBuilder
  private collaborativeFilter: CollaborativeFilter
  private userCache: Map<string, { user: User; timestamp: number }> = new Map()
  private readonly CACHE_TTL = 60 * 60 * 1000 // 1 hour in milliseconds

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
    this.userBuilder = new UserBuilder(prisma)
    this.collaborativeFilter = new CollaborativeFilter(prisma)
  }

  /**
   * Get personalized recommendations for a user
   */
  async getRecommendations(request: RecommendationRequest): Promise<RecommendationResponse> {
    const { userId, limit, excludeWorkIds = [] } = request

    // Get or build user profile
    const user = userId ? await this.getUserProfile(userId) : null

    // Get candidate works (excluding already seen ones)
    const candidateWorks = await this.getCandidateWorks(excludeWorkIds, limit * 3) // Get more to filter

    // If no user profile, return popular/random books
    if (!user) {
      const recommendations = await this.getPopularRecommendations(candidateWorks, limit)
      return {
        recommendations,
        totalAvailable: candidateWorks.length
      }
    }

    // Generate personalized recommendations
    const recommendations = await this.generatePersonalizedRecommendations(user, candidateWorks, limit)

    return {
      recommendations,
      userProfile: user,
      totalAvailable: candidateWorks.length
    }
  }

  /**
   * Record user interaction and update their profile
   */
  async recordInteraction(userId: string, workId: string, liked: boolean): Promise<void> {
    // Save interaction to database
    await this.prisma.userInteraction.create({
      data: {
        userId,
        workId,
        liked
      }
    })

    // Update cached user profile if it exists
    const cachedData = this.userCache.get(userId)
    if (cachedData) {
      const updatedUser = await this.userBuilder.updateUserProfile(cachedData.user, workId, liked)
      this.userCache.set(userId, {
        user: updatedUser,
        timestamp: Date.now()
      })
    }
  }

  /**
   * Get or build user profile with caching
   */
  private async getUserProfile(userId: string): Promise<User> {
    // Check cache first
    const cachedData = this.userCache.get(userId)
    if (cachedData && (Date.now() - cachedData.timestamp) < this.CACHE_TTL) {
      return cachedData.user
    }

    // Build fresh user profile
    const user = await this.userBuilder.buildUserProfile(userId)
    
    // Cache the result
    this.userCache.set(userId, {
      user,
      timestamp: Date.now()
    })

    return user
  }

  /**
   * Get candidate works for recommendations
   */
  private async getCandidateWorks(excludeWorkIds: string[], limit: number): Promise<WorkWithAuthors[]> {
    const works = await this.prisma.work.findMany({
      where: {
        id: { notIn: excludeWorkIds }
      },
      include: {
        authors: {
          include: {
            author: true
          }
        }
      },
      take: limit,
      orderBy: {
        createdAt: 'desc' // Prefer newer additions to database
      }
    })

    return works.map(work => ({
      ...parseWork(work),
      authors: work.authors.map(authorWork => ({
        id: authorWork.id,
        authorId: authorWork.authorId,
        workId: authorWork.workId,
        role: authorWork.role || undefined,
        author: parseAuthor(authorWork.author)
      }))
    }))
  }

  /**
   * Generate personalized recommendations for a user
   */
  private async generatePersonalizedRecommendations(
    user: User, 
    candidateWorks: WorkWithAuthors[], 
    limit: number
  ): Promise<RecommendationScore[]> {
    const scores: RecommendationScore[] = []

    for (const work of candidateWorks) {
      const score = await this.calculateWorkScore(user, work)
      scores.push(score)
    }

    // Sort by final score and return top recommendations
    return scores
      .sort((a, b) => b.finalScore - a.finalScore)
      .slice(0, limit)
  }

  /**
   * Calculate recommendation score for a work
   */
  private async calculateWorkScore(user: User, work: WorkWithAuthors): Promise<RecommendationScore> {
    const reasons: string[] = []

    // Content-based score
    const contentScore = this.calculateContentScore(user, work, reasons)

    // Collaborative filtering score
    const collaborativeScore = await this.calculateCollaborativeScore(user, work, reasons)

    // Novelty bonus (for introducing new subjects/authors)
    const noveltyBonus = this.calculateNoveltyBonus(user, work, reasons)

    // Negative feedback multiplier
    const negativeMultiplier = this.calculateNegativeMultiplier(user, work, reasons)

    // Final weighted score: content (60%) + collaborative (30%) + novelty (10%)
    const finalScore = (
      contentScore * 0.6 + 
      collaborativeScore * 0.3 + 
      noveltyBonus * 0.1
    ) * negativeMultiplier

    return {
      workId: work.id,
      contentScore,
      collaborativeScore,
      noveltyBonus,
      negativeMultiplier,
      finalScore,
      reasons
    }
  }

  /**
   * Calculate content-based similarity score
   */
  private calculateContentScore(user: User, work: WorkWithAuthors, reasons: string[]): number {
    let score = 0
    
    // Subject preferences
    const subjectScore = this.calculatePreferenceScore(user.subjectPreferences, work.subjects)
    if (subjectScore > 0) {
      score += subjectScore * 0.4
      const topSubjects = work.subjects.filter(s => user.subjectPreferences[s.toLowerCase()] > 0.3)
      if (topSubjects.length > 0) {
        reasons.push(`Matches your interest in ${topSubjects.join(', ')}`)
      }
    }

    // Place preferences
    const placeScore = this.calculatePreferenceScore(user.placePreferences, work.subjectPlaces)
    if (placeScore > 0) {
      score += placeScore * 0.15
      const topPlaces = work.subjectPlaces.filter(p => user.placePreferences[p.toLowerCase()] > 0.3)
      if (topPlaces.length > 0) {
        reasons.push(`Set in ${topPlaces.join(', ')} which you enjoy`)
      }
    }

    // Time period preferences
    const timeScore = this.calculatePreferenceScore(user.timePreferences, work.subjectTimes)
    if (timeScore > 0) {
      score += timeScore * 0.15
    }

    // People preferences
    const peopleScore = this.calculatePreferenceScore(user.peoplePreferences, work.subjectPeople)
    if (peopleScore > 0) {
      score += peopleScore * 0.1
    }

    // Language preferences
    const languageScore = this.calculatePreferenceScore(user.languagePreferences, work.originalLanguages)
    if (languageScore > 0) {
      score += languageScore * 0.1
    }

    // Temporal preference (publication era)
    if (user.preferredPublishEra && work.firstPublishDate) {
      const workEra = this.determineWorkEra(work.firstPublishDate)
      if (workEra === user.preferredPublishEra) {
        score += 0.1
        reasons.push(`From your preferred ${workEra} era`)
      }
    }

    return Math.min(score, 1) // Cap at 1.0
  }

  /**
   * Calculate collaborative filtering score
   */
  private async calculateCollaborativeScore(user: User, work: WorkWithAuthors, reasons: string[]): Promise<number> {
    try {
      const collaborativeRecs = await this.collaborativeFilter.getCollaborativeRecommendations(
        user.id,
        [], // Don't exclude any works for scoring
        50  // Get more recommendations to find this specific work
      )

      const recommendation = collaborativeRecs.find(rec => rec.workId === work.id)
      
      if (recommendation) {
        const score = recommendation.score * recommendation.confidence
        
        if (score > 0.3) {
          const userCount = recommendation.supportingUsers.length
          reasons.push(`Liked by ${userCount} similar user${userCount > 1 ? 's' : ''}`)
        }
        
        return Math.min(score, 1) // Cap at 1.0
      }
      
      return 0
    } catch (error) {
      console.error('Error calculating collaborative score:', error)
      return 0
    }
  }

  /**
   * Calculate preference score for an array of attributes
   */
  private calculatePreferenceScore(preferences: Record<string, number>, attributes: string[]): number {
    if (attributes.length === 0) return 0

    const scores = attributes.map(attr => preferences[attr.toLowerCase()] || 0)
    return scores.reduce((sum, score) => sum + score, 0) / attributes.length
  }

  /**
   * Calculate novelty bonus for introducing new content
   */
  private calculateNoveltyBonus(user: User, work: WorkWithAuthors, reasons: string[]): number {
    let bonus = 0

    // Bonus for new subjects
    const newSubjects = work.subjects.filter(s => !user.subjectPreferences[s.toLowerCase()])
    if (newSubjects.length > 0 && newSubjects.length <= 2) { // Moderate novelty
      bonus += 0.05
      reasons.push('Introduces new topics')
    }

    // Bonus for new authors
    const hasNewAuthor = work.authors.some(author => !user.dislikedAuthors[author.authorId])
    if (hasNewAuthor) {
      bonus += 0.03
    }

    return bonus
  }

  /**
   * Calculate negative feedback multiplier
   */
  private calculateNegativeMultiplier(user: User, work: WorkWithAuthors, reasons: string[]): number {
    let multiplier = 1.0

    // Penalize disliked subjects
    const dislikedSubjectPenalty = this.calculatePreferenceScore(user.dislikedSubjects, work.subjects)
    multiplier *= Math.max(0.1, 1 - dislikedSubjectPenalty)

    // Penalize disliked places
    const dislikedPlacePenalty = this.calculatePreferenceScore(user.dislikedPlaces, work.subjectPlaces)
    multiplier *= Math.max(0.1, 1 - dislikedPlacePenalty)

    // Penalize disliked authors
    const dislikedAuthorPenalty = work.authors.reduce((penalty, author) => {
      return penalty + (user.dislikedAuthors[author.authorId] || 0)
    }, 0) / work.authors.length
    multiplier *= Math.max(0.1, 1 - dislikedAuthorPenalty)

    if (multiplier < 0.8) {
      reasons.push('Reduced due to previous preferences')
    }

    return multiplier
  }

  /**
   * Determine work era from publication date
   */
  private determineWorkEra(firstPublishDate: string): string {
    const year = this.extractYear(firstPublishDate)
    if (!year) return 'unknown'

    if (year < 1800) return 'classical'
    if (year < 1900) return '19th-century'
    if (year < 1950) return 'early-20th-century'
    if (year < 2000) return 'mid-20th-century'
    return 'contemporary'
  }

  /**
   * Extract year from date string
   */
  private extractYear(dateStr: string): number | null {
    const yearMatch = dateStr.match(/(\d{4})/)
    return yearMatch ? parseInt(yearMatch[1], 10) : null
  }

  /**
   * Get popular recommendations for users without profiles
   */
  private async getPopularRecommendations(candidateWorks: WorkWithAuthors[], limit: number): Promise<RecommendationScore[]> {
    // For now, just return works with basic scoring
    // In the future, this could be based on global popularity metrics
    return candidateWorks.slice(0, limit).map(work => ({
      workId: work.id,
      contentScore: 0.5,
      collaborativeScore: 0,
      noveltyBonus: 0.1,
      negativeMultiplier: 1.0,
      finalScore: 0.6,
      reasons: ['Popular recommendation']
    }))
  }

  /**
   * Clear user cache (useful for testing or manual cache invalidation)
   */
  clearUserCache(userId?: string): void {
    if (userId) {
      this.userCache.delete(userId)
    } else {
      this.userCache.clear()
    }
  }
}