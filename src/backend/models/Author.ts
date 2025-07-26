
// Raw database interface (how Prisma returns data)
export interface AuthorRaw {
  id: number
  createdAt: Date
  updatedAt: Date
  
  // OpenLibrary fields
  openLibraryId?: string | null
  name: string
  personalName?: string | null
  birthDate?: string | null
  deathDate?: string | null
  bio?: string | null
  alternateNames?: string[] | null // Native PostgreSQL array
  location?: string | null
  easternOrder?: boolean | null
  wikipedia?: string | null
  links?: any | null // Native PostgreSQL JSON
}

// Application interface (with parsed arrays)
export interface Author {
  id: number
  createdAt: Date
  updatedAt: Date
  
  // OpenLibrary fields
  openLibraryId?: string
  name: string
  personalName?: string
  birthDate?: string
  deathDate?: string
  bio?: string
  alternateNames: string[]
  location?: string
  easternOrder?: boolean
  wikipedia?: string
  links: string[]
}

// Utility function to convert raw to parsed
export function parseAuthor(raw: AuthorRaw): Author {
  return {
    ...raw,
    openLibraryId: raw.openLibraryId || undefined,
    personalName: raw.personalName || undefined,
    birthDate: raw.birthDate || undefined,
    deathDate: raw.deathDate || undefined,
    bio: raw.bio || undefined,
    alternateNames: raw.alternateNames || [],
    location: raw.location || undefined,
    easternOrder: raw.easternOrder || undefined,
    wikipedia: raw.wikipedia || undefined,
    links: Array.isArray(raw.links) ? raw.links : (raw.links ? [raw.links] : []),
  }
}

export interface AuthorCreateInput {
  openLibraryId?: string
  name: string
  personalName?: string
  birthDate?: string
  deathDate?: string
  bio?: string
  alternateNames?: string[]
  location?: string
  easternOrder?: boolean
  wikipedia?: string
  links?: string[]
}

export interface AuthorUpdateInput {
  openLibraryId?: string
  name?: string
  personalName?: string
  birthDate?: string
  deathDate?: string
  bio?: string
  alternateNames?: string[]
  location?: string
  easternOrder?: boolean
  wikipedia?: string
  links?: string[]
}