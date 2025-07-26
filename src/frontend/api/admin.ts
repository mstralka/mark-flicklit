import { apiClient } from './client'

// Types for admin API responses
export interface Author {
  id: number
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
  openLibraryId?: string
  createdAt: Date
  updatedAt: Date
  worksCount: number
}

export interface AuthorListResponse {
  success: boolean
  data: Author[]
  pagination: {
    limit: number
    hasNextPage: boolean
    nextCursor: string | null
    approximateCount?: string | null
  }
  filters: {
    search?: string
    sortBy: string
    sortOrder: string
    cursor?: string
  }
}

export interface AuthorDetailResponse {
  success: boolean
  data: Author & {
    works: Array<{
      id: number
      title: string
      subtitle?: string
      firstPublishDate?: string
      subjects: string[]
      role?: string
    }>
  }
}

export interface AdminStatsResponse {
  success: boolean
  data: {
    totals: {
      authors: number
      works: number
      users: number
    }
    recent: {
      authors: number
      works: number
    }
  }
}

// Admin API endpoints
export const adminApi = {
  // Get paginated list of authors
  getAuthors: async (params: {
    cursor?: string
    limit?: number
    search?: string
    sortBy?: 'name' | 'birthDate' | 'createdAt' | 'id'
    sortOrder?: 'asc' | 'desc'
  } = {}): Promise<AuthorListResponse> => {
    const searchParams = new URLSearchParams()
    
    if (params.cursor) searchParams.set('cursor', params.cursor)
    if (params.limit) searchParams.set('limit', params.limit.toString())
    if (params.search) searchParams.set('search', params.search)
    if (params.sortBy) searchParams.set('sortBy', params.sortBy)
    if (params.sortOrder) searchParams.set('sortOrder', params.sortOrder)

    const queryString = searchParams.toString()
    const url = `/api/admin/authors${queryString ? `?${queryString}` : ''}`
    
    return apiClient.get(url) as Promise<AuthorListResponse>
  },

  // Get single author details
  getAuthor: async (id: number): Promise<AuthorDetailResponse> => {
    return apiClient.get(`/api/admin/authors/${id}`) as Promise<AuthorDetailResponse>
  },

  // Get admin dashboard statistics
  getStats: async (): Promise<AdminStatsResponse> => {
    return apiClient.get('/api/admin/stats') as Promise<AdminStatsResponse>
  }
}

// Custom hook for authors list with cursor-based pagination
export const useAuthors = () => {
  // This will be implemented with React Query or similar in a real application
  // For now, we'll use direct API calls in the component
  return {
    fetchAuthors: adminApi.getAuthors
  }
}