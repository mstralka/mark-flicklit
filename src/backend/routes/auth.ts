import { Router, Request, Response } from 'express'
import { PrismaClient } from '../generated/client'
import { hashPassword, comparePasswords, generateTokens, validatePasswordStrength } from '../utils/auth'
import { parseUser } from '../models/User'
import { authenticate, type AuthenticatedRequest } from '../middleware/auth'
import { z } from 'zod'

const router = Router()
const prisma = new PrismaClient()

// Validation schemas
const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

const resetPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const validatedData = registerSchema.parse(req.body)

    // Validate password strength
    const passwordValidation = validatePasswordStrength(validatedData.password)
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        error: passwordValidation.errors.join(', ')
      })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email.toLowerCase() }
    })

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'A user with this email already exists'
      })
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedData.password)

    // Create user with profile
    const userRaw = await prisma.user.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email.toLowerCase(),
        password: hashedPassword,
        status: 'Active',
        emailVerified: false
      },
      include: {
        profile: true
      }
    })

    // Create empty user profile
    await prisma.userProfile.create({
      data: {
        userId: userRaw.id
      }
    })

    // Get user with profile for parsing
    const fullUser = await prisma.user.findUnique({
      where: { id: userRaw.id },
      include: { profile: true }
    })

    if (!fullUser) {
      return res.status(500).json({
        success: false,
        error: 'Failed to create user'
      })
    }

    const user = parseUser(fullUser, fullUser.profile)

    // Generate tokens
    const jwtPayload = {
      userId: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    }
    const tokens = generateTokens(jwtPayload)

    res.status(201).json({
      success: true,
      user,
      tokens
    })

  } catch (error) {
    console.error('Registration error:', error)
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: error.issues[0].message
      })
    }

    res.status(500).json({
      success: false,
      error: 'Failed to create account. Please try again.'
    })
  }
})

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body)

    // Find user by email
    const userRaw = await prisma.user.findUnique({
      where: { email: validatedData.email.toLowerCase() },
      include: { profile: true }
    })

    if (!userRaw) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email or password'
      })
    }

    // Check password
    const isPasswordValid = await comparePasswords(validatedData.password, userRaw.password)
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email or password'
      })
    }

    // Check if user is active
    if (userRaw.status !== 'Active') {
      return res.status(400).json({
        success: false,
        error: 'Account is deactivated. Please contact support.'
      })
    }

    const user = parseUser(userRaw, userRaw.profile)

    // Generate tokens
    const jwtPayload = {
      userId: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    }
    const tokens = generateTokens(jwtPayload)

    res.json({
      success: true,
      user,
      tokens
    })

  } catch (error) {
    console.error('Login error:', error)
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: error.issues[0].message
      })
    }

    res.status(500).json({
      success: false,
      error: 'Login failed. Please try again.'
    })
  }
})

// GET /api/auth/me
router.get('/me', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not found'
      })
    }

    // Get fresh user data
    const userRaw = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { profile: true }
    })

    if (!userRaw) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }

    const user = parseUser(userRaw, userRaw.profile)

    res.json({
      success: true,
      user
    })

  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to get user data'
    })
  }
})

// POST /api/auth/change-password
router.post('/change-password', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not found'
      })
    }

    const validatedData = changePasswordSchema.parse(req.body)

    // Get current user
    const userRaw = await prisma.user.findUnique({
      where: { id: req.user.id }
    })

    if (!userRaw) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }

    // Verify current password
    const isCurrentPasswordValid = await comparePasswords(validatedData.currentPassword, userRaw.password)
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        error: 'Current password is incorrect'
      })
    }

    // Validate new password strength
    const passwordValidation = validatePasswordStrength(validatedData.newPassword)
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        error: passwordValidation.errors.join(', ')
      })
    }

    // Hash new password
    const hashedNewPassword = await hashPassword(validatedData.newPassword)

    // Update password
    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashedNewPassword }
    })

    res.json({
      success: true,
      message: 'Password changed successfully'
    })

  } catch (error) {
    console.error('Change password error:', error)
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: error.issues[0].message
      })
    }

    res.status(500).json({
      success: false,
      error: 'Failed to change password. Please try again.'
    })
  }
})

// POST /api/auth/request-password-reset
router.post('/request-password-reset', async (req: Request, res: Response) => {
  try {
    const validatedData = resetPasswordSchema.parse(req.body)

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email.toLowerCase() }
    })

    // Always return success for security (don't reveal if email exists)
    // In production, you would generate a reset token and send email here
    console.log(`Password reset requested for: ${validatedData.email}`)
    
    if (user) {
      // TODO: Generate reset token and send email
      console.log(`Reset token would be sent to user ID: ${user.id}`)
    }

    res.json({
      success: true,
      message: 'If an account with that email exists, a password reset link has been sent.'
    })

  } catch (error) {
    console.error('Password reset request error:', error)
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: error.issues[0].message
      })
    }

    res.status(500).json({
      success: false,
      error: 'Failed to process password reset request. Please try again.'
    })
  }
})

// POST /api/auth/verify-email
router.post('/verify-email', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not found'
      })
    }

    await prisma.user.update({
      where: { id: req.user.id },
      data: { emailVerified: true }
    })

    res.json({
      success: true,
      message: 'Email verified successfully'
    })

  } catch (error) {
    console.error('Email verification error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to verify email. Please try again.'
    })
  }
})

// POST /api/auth/resend-verification-email
router.post('/resend-verification-email', async (req: Request, res: Response) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      })
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }

    if (user.emailVerified) {
      return res.status(400).json({
        success: false,
        error: 'Email is already verified'
      })
    }

    // TODO: Generate verification token and send email
    console.log(`Verification email would be resent to user ID: ${user.id}`)

    res.json({
      success: true,
      message: 'Verification email sent'
    })

  } catch (error) {
    console.error('Resend verification email error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to resend verification email. Please try again.'
    })
  }
})

export { router as authRoutes }