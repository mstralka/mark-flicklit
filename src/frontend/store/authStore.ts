import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthService } from '../services/AuthService'
import type { User } from '../types/User'
import type { LoginInput, RegisterInput } from '../lib/validations/auth'

interface AuthTokens {
  token: string
  expiresAt: Date
}

interface AuthState {
  // State
  user: User | null
  tokens: AuthTokens | null
  isAuthenticated: boolean
  isInitialized: boolean
  isLoading: boolean
  error: string | null

  // Actions
  login: (credentials: LoginInput) => Promise<void>
  register: (userData: RegisterInput) => Promise<void>
  logout: () => void
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>
  requestPasswordReset: (email: string) => Promise<void>
  resendVerificationEmail: (email: string) => Promise<void>
  verifyEmail: () => Promise<void>
  clearError: () => void
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      tokens: null,
      isAuthenticated: false,
      isInitialized: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials: LoginInput) => {
        set({ isLoading: true, error: null })
        
        try {
          const result = await AuthService.login(credentials)
          
          if (result.success && result.user && result.tokens) {
            set({
              user: result.user,
              tokens: result.tokens,
              isAuthenticated: true,
              isLoading: false,
              error: null
            })
          } else {
            set({
              user: null,
              tokens: null,
              isAuthenticated: false,
              isLoading: false,
              error: result.error || 'Login failed'
            })
          }
        } catch (error) {
          console.error('Login error:', error)
          set({
            user: null,
            tokens: null,
            isAuthenticated: false,
            isLoading: false,
            error: 'An unexpected error occurred. Please try again.'
          })
        }
      },

      register: async (userData: RegisterInput) => {
        set({ isLoading: true, error: null })
        
        try {
          const result = await AuthService.register(userData)
          
          if (result.success && result.user && result.tokens) {
            set({
              user: result.user,
              tokens: result.tokens,
              isAuthenticated: true,
              isLoading: false,
              error: null
            })
          } else {
            set({
              user: null,
              tokens: null,
              isAuthenticated: false,
              isLoading: false,
              error: result.error || 'Registration failed'
            })
          }
        } catch (error) {
          console.error('Registration error:', error)
          set({
            user: null,
            tokens: null,
            isAuthenticated: false,
            isLoading: false,
            error: 'An unexpected error occurred. Please try again.'
          })
        }
      },

      logout: () => {
        set({
          user: null,
          tokens: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        })
      },

      changePassword: async (currentPassword: string, newPassword: string) => {
        const { user } = get()
        if (!user) {
          set({ error: 'You must be logged in to change your password' })
          return
        }

        set({ isLoading: true, error: null })
        
        try {
          const result = await AuthService.changePassword(user.id, currentPassword, newPassword)
          
          if (result.success) {
            set({ isLoading: false, error: null })
          } else {
            set({ isLoading: false, error: result.error || 'Failed to change password' })
          }
        } catch (error) {
          console.error('Change password error:', error)
          set({
            isLoading: false,
            error: 'An unexpected error occurred. Please try again.'
          })
        }
      },

      requestPasswordReset: async (email: string) => {
        set({ isLoading: true, error: null })
        
        try {
          const result = await AuthService.requestPasswordReset(email)
          
          if (!result.success) {
            set({ isLoading: false, error: result.error || 'Failed to send password reset email' })
          } else {
            set({ isLoading: false, error: null })
          }
        } catch (error) {
          console.error('Password reset request error:', error)
          set({
            isLoading: false,
            error: 'An unexpected error occurred. Please try again.'
          })
        }
      },

      resendVerificationEmail: async (email: string) => {
        set({ isLoading: true, error: null })
        
        try {
          const result = await AuthService.resendVerificationEmail(email)
          
          if (!result.success) {
            set({ isLoading: false, error: result.error || 'Failed to resend verification email' })
          } else {
            set({ isLoading: false, error: null })
          }
        } catch (error) {
          console.error('Resend verification email error:', error)
          set({
            isLoading: false,
            error: 'An unexpected error occurred. Please try again.'
          })
        }
      },

      verifyEmail: async () => {
        const { user } = get()
        if (!user) {
          set({ error: 'You must be logged in to verify your email' })
          return
        }

        set({ isLoading: true, error: null })
        
        try {
          const result = await AuthService.verifyEmail(user.id)
          
          if (result.success) {
            // Update user in state to reflect email verification
            set(state => ({
              user: state.user ? { ...state.user, emailVerified: true } : null,
              isLoading: false,
              error: null
            }))
          } else {
            set({ isLoading: false, error: result.error || 'Failed to verify email' })
          }
        } catch (error) {
          console.error('Email verification error:', error)
          set({
            isLoading: false,
            error: 'An unexpected error occurred. Please try again.'
          })
        }
      },

      clearError: () => {
        set({ error: null })
      },

      initialize: async () => {
        const { tokens, user } = get()
        
        if (!tokens || !tokens.token || !user) {
          set({ isInitialized: true })
          return
        }

        // Set token for API client
        AuthService.setToken(tokens.token)

        // Check if token is expired
        const now = new Date()
        const expiresAt = new Date(tokens.expiresAt)
        
        if (now >= expiresAt) {
          // Token expired, clear auth state
          set({
            user: null,
            tokens: null,
            isAuthenticated: false,
            isInitialized: true
          })
          AuthService.setToken(null)
          return
        }

        // Token is still valid, refresh user data
        try {
          const freshUser = await AuthService.getUserById(user.id)
          if (freshUser) {
            set({
              user: freshUser,
              isAuthenticated: true,
              isInitialized: true
            })
          } else {
            // User not found, clear auth state
            set({
              user: null,
              tokens: null,
              isAuthenticated: false,
              isInitialized: true
            })
            AuthService.setToken(null)
          }
        } catch (error) {
          console.error('Initialize auth error:', error)
          // Clear auth state on error
          set({
            user: null,
            tokens: null,
            isAuthenticated: false,
            isInitialized: true
          })
          AuthService.setToken(null)
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)