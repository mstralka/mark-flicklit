// User interface for frontend
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