import type { Work } from './Work'

// Raw database interface (how Prisma returns data)
export interface CoverRaw {
  id: number
  createdAt: Date
  updatedAt: Date
  
  workId: number
  
  // OpenLibrary cover fields
  openLibraryCoverId?: string | null
  isbn10?: string | null
  isbn13?: string | null
  size?: string | null
  width?: number | null
  height?: number | null
  url?: string | null
  sourceUrl?: string | null
  
  // Metadata
  contentType?: string | null
  fileSize?: number | null
  lastModified?: Date | null
}

// Application interface (with cleaned up nulls)
export interface Cover {
  id: number
  createdAt: Date
  updatedAt: Date
  
  workId: number
  
  // OpenLibrary cover fields
  openLibraryCoverId?: string
  isbn10?: string
  isbn13?: string
  size?: string
  width?: number
  height?: number
  url?: string
  sourceUrl?: string
  
  // Metadata
  contentType?: string
  fileSize?: number
  lastModified?: Date
}

// Utility function to convert raw to parsed
export function parseCover(raw: CoverRaw): Cover {
  return {
    ...raw,
    openLibraryCoverId: raw.openLibraryCoverId || undefined,
    isbn10: raw.isbn10 || undefined,
    isbn13: raw.isbn13 || undefined,
    size: raw.size || undefined,
    width: raw.width || undefined,
    height: raw.height || undefined,
    url: raw.url || undefined,
    sourceUrl: raw.sourceUrl || undefined,
    contentType: raw.contentType || undefined,
    fileSize: raw.fileSize || undefined,
    lastModified: raw.lastModified || undefined,
  }
}

// Cover with related work data
export interface CoverWithWork extends Cover {
  work: Work
}

// Input interfaces for creating/updating covers
export interface CoverCreateInput {
  workId: number
  openLibraryCoverId?: string
  isbn10?: string
  isbn13?: string
  size?: string
  width?: number
  height?: number
  url?: string
  sourceUrl?: string
  contentType?: string
  fileSize?: number
  lastModified?: Date
}

export interface CoverUpdateInput {
  workId?: number
  openLibraryCoverId?: string
  isbn10?: string
  isbn13?: string
  size?: string
  width?: number
  height?: number
  url?: string
  sourceUrl?: string
  contentType?: string
  fileSize?: number
  lastModified?: Date
}

// Cover size enum for type safety
export enum CoverSize {
  SMALL = 'S',
  MEDIUM = 'M', 
  LARGE = 'L'
}

// Helper function to generate OpenLibrary cover URLs
export function generateCoverUrl(coverId: string, size: CoverSize = CoverSize.LARGE): string {
  const id = coverId.replace('/covers/', '').replace('/', '')
  return `https://covers.openlibrary.org/b/id/${id}-${size}.jpg`
}

// Helper function to generate cover URLs by ISBN
export function generateCoverUrlByIsbn(isbn: string, size: CoverSize = CoverSize.LARGE): string {
  return `https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg`
}