// Mock API service for authentication
// In a real application, these would be HTTP requests to your backend

import type { LoginInput, RegisterInput } from '../lib/validations/auth'
import type { User } from '../models/User'

export interface AuthTokens {
  token: string
  expiresAt: Date
}

export interface AuthResult {
  success: boolean
  user?: User
  tokens?: AuthTokens
  error?: string
}

// Mock database - in production this would be your actual database
let mockUsers: Array<User & { password: string }> = []
let currentUserId = 1

// Simple password validation for demo
function validatePassword(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Mock token generation
function generateMockToken(): AuthTokens {
  const token = 'mock-jwt-token-' + Math.random().toString(36).substr(2, 9)
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  return { token, expiresAt }
}

export const AuthAPI = {
  async register(input: RegisterInput): Promise<AuthResult> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Validate password
    const passwordValidation = validatePassword(input.password)
    if (!passwordValidation.isValid) {
      return {
        success: false,
        error: passwordValidation.errors.join(', ')
      }
    }

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email.toLowerCase() === input.email.toLowerCase())
    if (existingUser) {
      return {
        success: false,
        error: 'A user with this email already exists'
      }
    }

    // Create user
    const user: User & { password: string } = {
      id: currentUserId++,
      createdAt: new Date(),
      updatedAt: new Date(),
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email.toLowerCase(),
      password: input.password, // In real app, this would be hashed
      status: 'Active',
      emailVerified: false,
      subjectPreferences: {},
      placePreferences: {},
      timePreferences: {},
      peoplePreferences: {},
      languagePreferences: {},
      dislikedSubjects: {},
      dislikedPlaces: {},
      dislikedAuthors: {},
      totalLikes: 0,
      totalDislikes: 0,
    }

    mockUsers.push(user)

    // Return user without password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user
    const tokens = generateMockToken()

    return {
      success: true,
      user: userWithoutPassword,
      tokens
    }
  },

  async login(input: LoginInput): Promise<AuthResult> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Find user by email
    const user = mockUsers.find(u => u.email.toLowerCase() === input.email.toLowerCase())
    if (!user) {
      return {
        success: false,
        error: 'Invalid email or password'
      }
    }

    // Check password (in real app, compare hashed passwords)
    if (user.password !== input.password) {
      return {
        success: false,
        error: 'Invalid email or password'
      }
    }

    // Check if user is active
    if (user.status !== 'Active') {
      return {
        success: false,
        error: 'Account is deactivated. Please contact support.'
      }
    }

    // Return user without password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user
    const tokens = generateMockToken()

    return {
      success: true,
      user: userWithoutPassword,
      tokens
    }
  },

  async getUserById(userId: number): Promise<User | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))

    const user = mockUsers.find(u => u.id === userId)
    if (!user) {
      return null
    }

    // Return user without password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  },

  async changePassword(userId: number, currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const user = mockUsers.find(u => u.id === userId)
    if (!user) {
      return {
        success: false,
        error: 'User not found'
      }
    }

    // Verify current password
    if (user.password !== currentPassword) {
      return {
        success: false,
        error: 'Current password is incorrect'
      }
    }

    // Validate new password
    const passwordValidation = validatePassword(newPassword)
    if (!passwordValidation.isValid) {
      return {
        success: false,
        error: passwordValidation.errors.join(', ')
      }
    }

    // Update password
    user.password = newPassword
    user.updatedAt = new Date()

    return { success: true }
  },

  async requestPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Always return success for security (don't reveal if email exists)
    console.log(`Password reset requested for: ${email}`)

    return { success: true }
  },

  async verifyEmail(userId: number): Promise<{ success: boolean; error?: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const user = mockUsers.find(u => u.id === userId)
    if (!user) {
      return {
        success: false,
        error: 'User not found'
      }
    }

    user.emailVerified = true
    user.updatedAt = new Date()

    return { success: true }
  },

  async resendVerificationEmail(email: string): Promise<{ success: boolean; error?: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (!user) {
      return {
        success: false,
        error: 'User not found'
      }
    }

    if (user.emailVerified) {
      return {
        success: false,
        error: 'Email is already verified'
      }
    }

    console.log(`Verification email would be resent to user ID: ${user.id}`)

    return { success: true }
  }
}