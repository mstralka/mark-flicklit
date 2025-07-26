import { PrismaClient } from '@/generated/client'
import { RecommendationEngine } from '@/services'
import type { RecommendationRequest, RecommendationResponse } from '@/types'

const prisma = new PrismaClient()
const recommendationEngine = new RecommendationEngine(prisma)

/**
 * API Handler for getting recommendations
 */
export async function getRecommendations(
  userId?: number,
  limit: number = 10,
  excludeWorkIds: number[] = []
): Promise<RecommendationResponse> {
  try {
    const request: RecommendationRequest = {
      userId,
      limit,
      excludeWorkIds
    }

    const response = await recommendationEngine.getRecommendations(request)
    return response
  } catch (error) {
    console.error('Error getting recommendations:', error)
    throw new Error('Failed to get recommendations')
  }
}

/**
 * API Handler for recording user interactions
 */
export async function recordUserInteraction(
  userId: number,
  workId: number,
  liked: boolean
): Promise<{ success: boolean; message: string }> {
  try {
    await recommendationEngine.recordInteraction(userId, workId, liked)
    
    return {
      success: true,
      message: 'Interaction recorded successfully'
    }
  } catch (error) {
    console.error('Error recording interaction:', error)
    return {
      success: false,
      message: 'Failed to record interaction'
    }
  }
}

/**
 * API Handler for getting user profile
 */
export async function getUserProfile(userId: number) {
  try {
    // Get recommendations to build/update user profile
    const response = await getRecommendations(userId, 1)
    return {
      success: true,
      profile: response.userProfile
    }
  } catch (error) {
    console.error('Error getting user profile:', error)
    return {
      success: false,
      message: 'Failed to get user profile'
    }
  }
}

/**
 * Helper function to generate anonymous user ID
 */
export function generateAnonymousUserId(): number {
  return Math.floor(Math.random() * 1000000) + Date.now() % 1000000
}

/**
 * Clean up resources
 */
export async function cleanup(): Promise<void> {
  await prisma.$disconnect()
}