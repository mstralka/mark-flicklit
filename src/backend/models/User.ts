// No imports needed for this file

// Raw database interface (how Prisma returns data)
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

// Application interface (with parsed fields)
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

export interface UserCreateInput {
  firstName: string
  lastName: string
  email: string
  password: string
  status?: 'Active' | 'Inactive'
  emailVerified?: boolean
}

export interface UserUpdateInput {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  status?: 'Active' | 'Inactive'
  emailVerified?: boolean
}