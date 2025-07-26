import { apiClient } from '../api/client'
import type { User } from '../types/User'
import type { LoginInput, RegisterInput } from '../lib/validations/auth'

export interface AuthResult {
  success: boolean
  user?: User
  tokens?: { token: string; expiresAt: Date }
  error?: string
}

export interface RegisterResult {
  success: boolean
  user?: User
  tokens?: { token: string; expiresAt: Date }
  error?: string
}

export class AuthService {
  /**
   * Register a new user
   */
  static async register(input: RegisterInput): Promise<RegisterResult> {
    const response = await apiClient.register(input)
    return {
      success: response.success,
      user: response.user,
      tokens: response.tokens,
      error: response.error
    }
  }

  /**
   * Login user
   */
  static async login(input: LoginInput): Promise<AuthResult> {
    const response = await apiClient.login(input)
    
    if (response.success && response.tokens) {
      // Set token for future requests
      apiClient.setToken(response.tokens.token)
    }
    
    return {
      success: response.success,
      user: response.user,
      tokens: response.tokens,
      error: response.error
    }
  }

  /**
   * Get current user
   */
  static async getUserById(_userId: number): Promise<User | null> {
    const response = await apiClient.getMe()
    return response.success ? response.user : null
  }

  /**
   * Update user password
   */
  static async changePassword(_userId: number, currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
    const response = await apiClient.changePassword({
      currentPassword,
      newPassword,
      confirmPassword: newPassword
    })
    
    return {
      success: response.success,
      error: response.error
    }
  }

  /**
   * Send password reset email
   */
  static async requestPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
    const response = await apiClient.requestPasswordReset(email)
    return {
      success: response.success,
      error: response.error
    }
  }

  /**
   * Verify user email
   */
  static async verifyEmail(_userId: number): Promise<{ success: boolean; error?: string }> {
    const response = await apiClient.verifyEmail()
    return {
      success: response.success,
      error: response.error
    }
  }

  /**
   * Resend verification email
   */
  static async resendVerificationEmail(email: string): Promise<{ success: boolean; error?: string }> {
    const response = await apiClient.resendVerificationEmail(email)
    return {
      success: response.success,
      error: response.error
    }
  }

  /**
   * Set authentication token
   */
  static setToken(token: string | null) {
    apiClient.setToken(token)
  }
}