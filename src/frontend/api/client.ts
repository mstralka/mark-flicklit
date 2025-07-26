// HTTP client for communicating with the backend API

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  user?: any
  tokens?: { token: string; expiresAt: Date }
  message?: string
  error?: string
}

class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor() {
    // In development, use proxy. In production, use environment variable
    this.baseURL = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_URL || '')
  }

  setToken(token: string | null) {
    this.token = token
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    // Add any additional headers from options
    if (options.headers) {
      Object.assign(headers, options.headers)
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    const config: RequestInit = {
      ...options,
      headers,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: data.error || `HTTP ${response.status}: ${response.statusText}`
        }
      }

      return data
    } catch (error) {
      console.error('API request failed:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error'
      }
    }
  }

  // Auth endpoints
  async register(userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
  }): Promise<ApiResponse> {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async login(credentials: {
    email: string
    password: string
  }): Promise<ApiResponse> {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  }

  async getMe(): Promise<ApiResponse> {
    return this.request('/api/auth/me')
  }

  async changePassword(passwordData: {
    currentPassword: string
    newPassword: string
    confirmPassword: string
  }): Promise<ApiResponse> {
    return this.request('/api/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(passwordData),
    })
  }

  async requestPasswordReset(email: string): Promise<ApiResponse> {
    return this.request('/api/auth/request-password-reset', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  }

  async verifyEmail(): Promise<ApiResponse> {
    return this.request('/api/auth/verify-email', {
      method: 'POST',
    })
  }

  async resendVerificationEmail(email: string): Promise<ApiResponse> {
    return this.request('/api/auth/resend-verification-email', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  }

  // Generic GET method
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  // Health check
  async healthCheck(): Promise<ApiResponse> {
    return this.request('/health')
  }
}

export const apiClient = new ApiClient()