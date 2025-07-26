import type { Author } from './Author'

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
  subjects?: string[] | null // Native PostgreSQL array
  subjectPlaces?: string[] | null // Native PostgreSQL array
  subjectTimes?: string[] | null // Native PostgreSQL array
  subjectPeople?: string[] | null // Native PostgreSQL array
  originalLanguages?: string[] | null // Native PostgreSQL array
  otherTitles?: string[] | null // Native PostgreSQL array
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
    subjects: raw.subjects || [],
    subjectPlaces: raw.subjectPlaces || [],
    subjectTimes: raw.subjectTimes || [],
    subjectPeople: raw.subjectPeople || [],
    originalLanguages: raw.originalLanguages || [],
    otherTitles: raw.otherTitles || [],
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