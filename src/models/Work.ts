import type { Author } from './Author'
import { parseJsonArray } from '../utils/json'

// Raw database interface (how Prisma returns data)
export interface WorkRaw {
  id: string
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
  id: string
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
    subjects: parseJsonArray(raw.subjects),
    subjectPlaces: parseJsonArray(raw.subjectPlaces),
    subjectTimes: parseJsonArray(raw.subjectTimes),
    subjectPeople: parseJsonArray(raw.subjectPeople),
    originalLanguages: parseJsonArray(raw.originalLanguages),
    otherTitles: parseJsonArray(raw.otherTitles),
  }
}

export interface WorkWithAuthors extends Work {
  authors: AuthorWork[]
}

export interface AuthorWork {
  id: string
  authorId: string
  workId: string
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