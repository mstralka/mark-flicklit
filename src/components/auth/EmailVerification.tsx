import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EnvelopeIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Button } from '../ui/Button'
import { useAuthStore } from '../../store/authStore'

export function EmailVerification() {
  const navigate = useNavigate()
  const { user, resendVerificationEmail, verifyEmail, isLoading, error, clearError } = useAuthStore()

  // Redirect if no user
  useEffect(() => {
    if (!user) {
      navigate('/auth/login', { replace: true })
      return
    }
    
    // If already verified, redirect to dashboard
    if (user.emailVerified) {
      navigate('/dashboard', { replace: true })
    }
  }, [user, navigate])

  // Clear error when component unmounts
  useEffect(() => {
    return () => clearError()
  }, [clearError])

  if (!user) {
    return null
  }

  const handleResendEmail = async () => {
    await resendVerificationEmail(user.email)
  }

  const handleVerifyNow = async () => {
    // In a real app, this would be called from an email link
    // For demo purposes, we'll allow manual verification
    await verifyEmail()
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <EnvelopeIcon className="mx-auto h-12 w-12 text-primary-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Check your email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a verification link to
          </p>
          <p className="text-sm font-medium text-gray-900">{user.email}</p>
        </div>
        
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  {error}
                </h3>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Click the link in the email to verify your account. If you don't see the email, check your spam folder.
          </p>
          
          <Button
            onClick={handleResendEmail}
            variant="outline"
            className="w-full mb-2"
            loading={isLoading}
          >
            Resend verification email
          </Button>
          
          {/* Demo button - remove in production */}
          <Button
            onClick={handleVerifyNow}
            className="w-full"
            loading={isLoading}
          >
            Verify Email Now (Demo)
          </Button>
          
          <div className="text-center">
            <span className="text-sm text-gray-600">
              Wrong email?{' '}
              <Link
                to="/auth/register"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Sign up again
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )

}