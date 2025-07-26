import { AuthAPI } from '../api/auth'
import type { User } from '../models/User'
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
    return AuthAPI.register(input)
  }

  /**
   * Login user
   */
  static async login(input: LoginInput): Promise<AuthResult> {
    return AuthAPI.login(input)
  }

  /**
   * Get user by ID
   */
  static async getUserById(userId: number): Promise<User | null> {
    return AuthAPI.getUserById(userId)
  }

  /**
   * Update user password
   */
  static async changePassword(userId: number, currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
    return AuthAPI.changePassword(userId, currentPassword, newPassword)
  }

  /**
   * Send password reset email
   */
  static async requestPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
    return AuthAPI.requestPasswordReset(email)
  }

  /**
   * Verify user email
   */
  static async verifyEmail(userId: number): Promise<{ success: boolean; error?: string }> {
    return AuthAPI.verifyEmail(userId)
  }

  /**
   * Resend verification email
   */
  static async resendVerificationEmail(email: string): Promise<{ success: boolean; error?: string }> {
    return AuthAPI.resendVerificationEmail(email)
  }
}