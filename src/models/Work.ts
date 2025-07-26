import type { Author } from './Author'
import { parseJsonArray } from '../utils/json'

// Raw database interface (how Prisma returns data)
export interface WorkRaw {
  id: number
  createdAt: Date
  updatedAt: Date
  
  // OpenLibrary fields
  openLibraryId?: string | null
  title: string
  subtitle?: string | null
  description?: string | null
  firstPublishDate?: string | null
  firstSentence?: string | null
  subjects?: string | null // JSON string
  subjectPlaces?: string | null // JSON string
  subjectTimes?: string | null // JSON string
  subjectPeople?: string | null // JSON string
  originalLanguages?: string | null // JSON string
  otherTitles?: string | null // JSON string
}

// Application interface (with parsed arrays)
export interface Work {
  id: number
  createdAt: Date
  updatedAt: Date
  
  // OpenLibrary fields
  openLibraryId?: string
  title: string
  subtitle?: string
  description?: string
  firstPublishDate?: string
  firstSentence?: string
  subjects: string[]
  subjectPlaces: string[]
  subjectTimes: string[]
  subjectPeople: string[]
  originalLanguages: string[]
  otherTitles: string[]
}

// Utility function to convert raw to parsed
export function parseWork(raw: WorkRaw): Work {
  return {
    ...raw,
    openLibraryId: raw.openLibraryId || undefined,
    subtitle: raw.subtitle || undefined,
    description: raw.description || undefined,
    firstPublishDate: raw.firstPublishDate || undefined,
    firstSentence: raw.firstSentence || undefined,
    subjects: parseJsonArray(raw.subjects || null),
    subjectPlaces: parseJsonArray(raw.subjectPlaces || null),
    subjectTimes: parseJsonArray(raw.subjectTimes || null),
    subjectPeople: parseJsonArray(raw.subjectPeople || null),
    originalLanguages: parseJsonArray(raw.originalLanguages || null),
    otherTitles: parseJsonArray(raw.otherTitles || null),
  }
}

export interface WorkWithAuthors extends Work {
  authors: AuthorWork[]
}

export interface AuthorWork {
  id: number
  authorId: number
  workId: number
  role?: string
  author: Author
}

export interface WorkCreateInput {
  openLibraryId?: string
  title: string
  subtitle?: string
  description?: string
  firstPublishDate?: string
  firstSentence?: string
  subjects?: string[]
  subjectPlaces?: string[]
  subjectTimes?: string[]
  subjectPeople?: string[]
  originalLanguages?: string[]
  otherTitles?: string[]
}

export interface WorkUpdateInput {
  openLibraryId?: string
  title?: string
  subtitle?: string
  description?: string
  firstPublishDate?: string
  firstSentence?: string
  subjects?: string[]
  subjectPlaces?: string[]
  subjectTimes?: string[]
  subjectPeople?: string[]
  originalLanguages?: string[]
  otherTitles?: string[]
}