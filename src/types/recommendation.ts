export interface User {
  id: string
  createdAt: Date
  updatedAt: Date
  
  // Preference weights (0-1 scale)
  subjectPreferences: Record<string, number>
  placePreferences: Record<string, number>
  timePreferences: Record<string, number>
  peoplePreferences: Record<string, number>
  languagePreferences: Record<string, number>
  
  // Temporal preferences
  preferredPublishEra?: string // e.g., "1900-1950", "modern"
  
  // Negative preferences (subjects/attributes to avoid)
  dislikedSubjects: Record<string, number>
  dislikedPlaces: Record<string, number>
  dislikedAuthors: Record<string, number>
  
  // Interaction stats
  totalLikes: number
  totalDislikes: number
  lastInteractionAt?: Date
}

export interface WorkSimilarity {
  workId: string
  similarity: number
}

export interface RecommendationScore {
  workId: string
  contentScore: number
  collaborativeScore: number
  noveltyBonus: number
  negativeMultiplier: number
  finalScore: number
  reasons: string[] // Why this was recommended
}

export interface RecommendationRequest {
  userId?: string // Optional for anonymous users
  limit: number
  excludeWorkIds?: string[] // Works user has already seen
}

export interface RecommendationResponse {
  recommendations: RecommendationScore[]
  userProfile?: User
  totalAvailable: number
}

export interface UserInteraction {
  id: string
  userId?: string
  workId: string
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
  authorIds: string[]
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