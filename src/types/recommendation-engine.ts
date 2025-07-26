// Types specific to the recommendation engine logic (not stored in database)
export interface RecommendationScoreCalculation {
  workId: number
  contentScore: number
  collaborativeScore: number
  noveltyBonus: number
  negativeMultiplier: number
  finalScore: number
  reasons: string[] // Why this was recommended
}