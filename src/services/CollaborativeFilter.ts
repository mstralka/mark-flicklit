import { PrismaClient } from '@/generated/client'
import type { UserInteraction } from '@/types'

export interface UserSimilarity {
  userId: number
  similarity: number
  commonInteractions: number
}

export interface CollaborativeRecommendation {
  workId: number
  score: number
  supportingUsers: number[]
  confidence: number
}

export class CollaborativeFilter {
  private prisma: PrismaClient
  private minCommonInteractions: number
  private maxSimilarUsers: number

  constructor(
    prisma: PrismaClient, 
    minCommonInteractions: number = 3,
    maxSimilarUsers: number = 20
  ) {
    this.prisma = prisma
    this.minCommonInteractions = minCommonInteractions
    this.maxSimilarUsers = maxSimilarUsers
  }

  /**
   * Find users similar to the target user based on interaction patterns
   */
  async findSimilarUsers(targetUserId: number): Promise<UserSimilarity[]> {
    // Get target user's interactions
    const targetInteractions = await this.getUserInteractions(targetUserId)
    if (targetInteractions.length < this.minCommonInteractions) {
      return []
    }

    // Get all other users who have interacted with the same works
    const targetWorkIds = targetInteractions.map(i => i.workId)
    const otherUsers = await this.getUsersWithCommonWorks(targetUserId, targetWorkIds)

    const similarities: UserSimilarity[] = []

    for (const otherUserId of otherUsers) {
      const otherInteractions = await this.getUserInteractions(otherUserId)
      const similarity = this.calculateUserSimilarity(targetInteractions, otherInteractions)
      
      if (similarity.similarity >= 0.1 && similarity.commonInteractions >= this.minCommonInteractions) {
        similarities.push({
          userId: otherUserId,
          similarity: similarity.similarity,
          commonInteractions: similarity.commonInteractions
        })
      }
    }

    // Sort by similarity and return top users
    return similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, this.maxSimilarUsers)
  }

  /**
   * Generate collaborative recommendations based on similar users
   */
  async getCollaborativeRecommendations(
    targetUserId: number,
    excludeWorkIds: number[] = [],
    limit: number = 10
  ): Promise<CollaborativeRecommendation[]> {
    const similarUsers = await this.findSimilarUsers(targetUserId)
    
    if (similarUsers.length === 0) {
      return []
    }

    // Get liked works from similar users
    const candidateWorks = await this.getLikedWorksBySimilarUsers(similarUsers.map(u => u.userId))
    
    // Filter out works the target user has already seen
    const targetInteractionWorkIds = await this.getUserWorkIds(targetUserId)
    const filteredWorks = candidateWorks.filter(
      work => !targetInteractionWorkIds.includes(work.workId) && !excludeWorkIds.includes(work.workId)
    )

    // Calculate collaborative scores
    const recommendations: CollaborativeRecommendation[] = []
    const workScores = new Map<number, { score: number; users: number[]; totalSimilarity: number }>()

    for (const work of filteredWorks) {
      if (!workScores.has(work.workId)) {
        workScores.set(work.workId, { score: 0, users: [], totalSimilarity: 0 })
      }

      const workData = workScores.get(work.workId)!
      const userSimilarity = similarUsers.find(u => u.userId === work.userId)
      
      if (userSimilarity) {
        workData.score += userSimilarity.similarity
        workData.users.push(work.userId)
        workData.totalSimilarity += userSimilarity.similarity
      }
    }

    // Convert to recommendations with confidence scores
    for (const [workId, data] of workScores.entries()) {
      const confidence = Math.min(data.users.length / 5, 1) // Higher confidence with more supporting users
      const normalizedScore = data.score / similarUsers.length // Normalize by total similar users
      
      recommendations.push({
        workId,
        score: normalizedScore,
        supportingUsers: data.users,
        confidence
      })
    }

    return recommendations
      .sort((a, b) => (b.score * b.confidence) - (a.score * a.confidence))
      .slice(0, limit)
  }

  /**
   * Calculate similarity between two users using Jaccard coefficient
   */
  private calculateUserSimilarity(
    user1Interactions: UserInteraction[], 
    user2Interactions: UserInteraction[]
  ): { similarity: number; commonInteractions: number } {
    // Create sets of liked and disliked works for each user
    const user1Liked = new Set(user1Interactions.filter(i => i.liked).map(i => i.workId))
    const user1Disliked = new Set(user1Interactions.filter(i => !i.liked).map(i => i.workId))
    const user2Liked = new Set(user2Interactions.filter(i => i.liked).map(i => i.workId))
    const user2Disliked = new Set(user2Interactions.filter(i => !i.liked).map(i => i.workId))

    // Find common works both users have interacted with
    const allUser1Works = new Set([...user1Liked, ...user1Disliked])
    const allUser2Works = new Set([...user2Liked, ...user2Disliked])
    const commonWorks = new Set([...allUser1Works].filter(work => allUser2Works.has(work)))

    if (commonWorks.size === 0) {
      return { similarity: 0, commonInteractions: 0 }
    }

    // Calculate agreement on common works
    let agreements = 0
    let disagreements = 0

    for (const work of commonWorks) {
      const user1LikesIt = user1Liked.has(work)
      const user2LikesIt = user2Liked.has(work)

      if (user1LikesIt === user2LikesIt) {
        agreements++
      } else {
        disagreements++
      }
    }

    // Calculate Jaccard-style similarity with agreement weighting
    const totalCommon = agreements + disagreements
    const agreementRatio = totalCommon > 0 ? agreements / totalCommon : 0

    // Also consider the overlap of their total preferences
    const unionSize = new Set([...allUser1Works, ...allUser2Works]).size
    const jaccardSimilarity = commonWorks.size / unionSize

    // Combine agreement ratio with Jaccard similarity
    const similarity = (agreementRatio * 0.7) + (jaccardSimilarity * 0.3)

    return {
      similarity,
      commonInteractions: commonWorks.size
    }
  }

  /**
   * Get user interactions from database
   */
  private async getUserInteractions(userId: number): Promise<UserInteraction[]> {
    const interactions = await this.prisma.userInteraction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 500 // Limit for performance
    })

    return interactions.map(interaction => ({
      id: interaction.id,
      userId: interaction.userId,
      workId: interaction.workId,
      liked: interaction.liked,
      createdAt: interaction.createdAt
    }))
  }

  /**
   * Get users who have interacted with common works
   */
  private async getUsersWithCommonWorks(targetUserId: number, workIds: number[]): Promise<number[]> {
    const interactions = await this.prisma.userInteraction.findMany({
      where: {
        workId: { in: workIds },
        userId: { not: targetUserId }
      },
      select: { userId: true },
      distinct: ['userId']
    })

    return interactions.map(i => i.userId)
  }

  /**
   * Get work IDs that a user has already interacted with
   */
  private async getUserWorkIds(userId: number): Promise<number[]> {
    const interactions = await this.prisma.userInteraction.findMany({
      where: { userId },
      select: { workId: true }
    })

    return interactions.map(i => i.workId)
  }

  /**
   * Get liked works from similar users
   */
  private async getLikedWorksBySimilarUsers(userIds: number[]): Promise<Array<{ workId: number; userId: number }>> {
    const interactions = await this.prisma.userInteraction.findMany({
      where: {
        userId: { in: userIds },
        liked: true
      },
      select: {
        workId: true,
        userId: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return interactions as Array<{ workId: number; userId: number }>
  }

  /**
   * Update similarity calculation parameters
   */
  updateParameters(minCommonInteractions?: number, maxSimilarUsers?: number): void {
    if (minCommonInteractions !== undefined) {
      this.minCommonInteractions = minCommonInteractions
    }
    if (maxSimilarUsers !== undefined) {
      this.maxSimilarUsers = maxSimilarUsers
    }
  }

  /**
   * Get collaborative filtering statistics for a user
   */
  async getCollaborativeStats(userId: number): Promise<{
    similarUsers: number
    totalRecommendations: number
    averageConfidence: number
  }> {
    const similarUsers = await this.findSimilarUsers(userId)
    const recommendations = await this.getCollaborativeRecommendations(userId)
    
    const averageConfidence = recommendations.length > 0
      ? recommendations.reduce((sum, rec) => sum + rec.confidence, 0) / recommendations.length
      : 0

    return {
      similarUsers: similarUsers.length,
      totalRecommendations: recommendations.length,
      averageConfidence
    }
  }
}