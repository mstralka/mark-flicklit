// Raw database interfaces
export interface UserRaw {
  id: number
  createdAt: Date
  updatedAt: Date
  firstName: string
  lastName: string
  email: string
  password: string
  status: 'Active' | 'Inactive'
  emailVerified: boolean
}

export interface UserProfileRaw {
  id: number
  createdAt: Date
  updatedAt: Date
  userId: number
  subjectPreferences?: string | null
  placePreferences?: string | null
  timePreferences?: string | null
  peoplePreferences?: string | null
  languagePreferences?: string | null
  preferredPublishEra?: string | null
  dislikedSubjects?: string | null
  dislikedPlaces?: string | null
  dislikedAuthors?: string | null
  totalLikes: number
  totalDislikes: number
  lastInteractionAt?: Date | null
}

// Application interfaces
export interface User {
  id: number
  createdAt: Date
  updatedAt: Date
  firstName: string
  lastName: string
  email: string
  status: 'Active' | 'Inactive'
  emailVerified: boolean
  
  // Preference weights (0-1 scale)
  subjectPreferences: Record<string, number>
  placePreferences: Record<string, number>
  timePreferences: Record<string, number>
  peoplePreferences: Record<string, number>
  languagePreferences: Record<string, number>
  
  // Temporal preferences
  preferredPublishEra?: string
  
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
  workId: number
  similarity: number
}

export interface RecommendationScore {
  workId: number
  contentScore: number
  collaborativeScore: number
  noveltyBonus: number
  negativeMultiplier: number
  finalScore: number
  reasons: string[] // Why this was recommended
}

export interface RecommendationRequest {
  userId?: number // Optional for anonymous users
  limit: number
  excludeWorkIds?: number[] // Works user has already seen
}

export interface RecommendationResponse {
  recommendations: RecommendationScore[]
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

// Utility functions for parsing JSON fields
function parseJsonRecord(jsonString: string | null | undefined): Record<string, number> {
  if (!jsonString) return {}
  try {
    return JSON.parse(jsonString) || {}
  } catch {
    return {}
  }
}

export function parseUserProfile(raw: UserProfileRaw): Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'firstName' | 'lastName' | 'email' | 'status' | 'emailVerified'> {
  return {
    subjectPreferences: parseJsonRecord(raw.subjectPreferences),
    placePreferences: parseJsonRecord(raw.placePreferences),
    timePreferences: parseJsonRecord(raw.timePreferences),
    peoplePreferences: parseJsonRecord(raw.peoplePreferences),
    languagePreferences: parseJsonRecord(raw.languagePreferences),
    preferredPublishEra: raw.preferredPublishEra || undefined,
    dislikedSubjects: parseJsonRecord(raw.dislikedSubjects),
    dislikedPlaces: parseJsonRecord(raw.dislikedPlaces),
    dislikedAuthors: parseJsonRecord(raw.dislikedAuthors),
    totalLikes: raw.totalLikes,
    totalDislikes: raw.totalDislikes,
    lastInteractionAt: raw.lastInteractionAt || undefined,
  }
}

export function parseUser(userRaw: UserRaw, profileRaw?: UserProfileRaw | null): User {
  const profileData = profileRaw ? parseUserProfile(profileRaw) : {
    subjectPreferences: {},
    placePreferences: {},
    timePreferences: {},
    peoplePreferences: {},
    languagePreferences: {},
    dislikedSubjects: {},
    dislikedPlaces: {},
    dislikedAuthors: {},
    totalLikes: 0,
    totalDislikes: 0,
  }

  return {
    id: userRaw.id,
    createdAt: userRaw.createdAt,
    updatedAt: userRaw.updatedAt,
    firstName: userRaw.firstName,
    lastName: userRaw.lastName,
    email: userRaw.email,
    status: userRaw.status,
    emailVerified: userRaw.emailVerified,
    ...profileData,
  }
}