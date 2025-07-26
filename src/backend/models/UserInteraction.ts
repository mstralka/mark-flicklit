import type { Work } from './Work'

export interface UserInteraction {
  id: string
  createdAt: Date
  workId: string
  userId?: string
  liked: boolean
}

export interface UserInteractionWithWork extends UserInteraction {
  work: Work
}

export interface UserInteractionCreateInput {
  workId: string
  userId?: string
  liked: boolean
}

export interface RecommendationData {
  likedWorks: Work[]
  dislikedWorks: Work[]
  preferredSubjects: string[]
  preferredAuthors: string[]
  preferredLanguages: string[]
}