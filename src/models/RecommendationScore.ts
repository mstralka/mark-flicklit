import { parseJsonArray } from '../utils/json'

// Raw database interface (how Prisma returns data)
export interface RecommendationScoreRaw {
  id: number
  createdAt: Date
  updatedAt: Date
  userId: number
  workId: number
  contentScore: number
  collaborativeScore: number
  noveltyBonus: number
  negativeMultiplier: number
  finalScore: number
  reasons: string // JSON array stored as text
}

// Application interface (with parsed arrays)
export interface RecommendationScore {
  id: number
  createdAt: Date
  updatedAt: Date
  userId: number
  workId: number
  contentScore: number
  collaborativeScore: number
  noveltyBonus: number
  negativeMultiplier: number
  finalScore: number
  reasons: string[] // Why this was recommended
}

// Utility function to convert raw to parsed
export function parseRecommendationScore(raw: RecommendationScoreRaw): RecommendationScore {
  return {
    ...raw,
    reasons: parseJsonArray(raw.reasons),
  }
}

export interface RecommendationScoreCreateInput {
  userId: number
  workId: number
  contentScore: number
  collaborativeScore: number
  noveltyBonus: number
  negativeMultiplier: number
  finalScore: number
  reasons: string[]
}

export interface RecommendationScoreUpdateInput {
  contentScore?: number
  collaborativeScore?: number
  noveltyBonus?: number
  negativeMultiplier?: number
  finalScore?: number
  reasons?: string[]
}

// Helper type for calculations (without database metadata)
export type RecommendationScoreCalculation = Omit<RecommendationScore, 'id' | 'createdAt' | 'updatedAt' | 'userId'>

// Helper function to create calculation-only format
export function toCalculationFormat(score: RecommendationScore): RecommendationScoreCalculation {
  return {
    workId: score.workId,
    contentScore: score.contentScore,
    collaborativeScore: score.collaborativeScore,
    noveltyBonus: score.noveltyBonus,
    negativeMultiplier: score.negativeMultiplier,
    finalScore: score.finalScore,
    reasons: score.reasons
  }
}