import type { User, WorkSimilarityCompat, RecommendationScoreCalculation } from '@/models'

// Re-export for backward compatibility  
export type { User } from '@/models'
export type WorkSimilarity = WorkSimilarityCompat

export interface RecommendationRequest {
  userId?: number // Optional for anonymous users
  limit: number
  excludeWorkIds?: number[] // Works user has already seen
}

export interface RecommendationResponse {
  recommendations: RecommendationScoreCalculation[]
  userProfile?: User
  totalAvailable: number
}

export interface UserInteraction {
  id: string
  userId: number
  workId: number
  liked: boolean
  createdAt: Date
}

export interface ContentFeatures {
  subjects: string[]
  subjectPlaces: string[]
  subjectTimes: string[]
  subjectPeople: string[]
  originalLanguages: string[]
  firstPublishDate?: string
  authorIds: number[]
}

export interface SimilarityWeights {
  subjects: number
  places: number
  times: number
  people: number
  languages: number
  temporal: number
  authors: number
}

export const DEFAULT_SIMILARITY_WEIGHTS: SimilarityWeights = {
  subjects: 0.4,
  places: 0.15,
  times: 0.15,
  people: 0.1,
  languages: 0.1,
  temporal: 0.05,
  authors: 0.05
}

// Re-export utility functions from models (not type-only)
export { parseUser, parseUserProfile } from '@/models/User'