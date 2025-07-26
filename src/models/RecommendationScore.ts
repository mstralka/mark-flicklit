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