import { useEffect } from 'react'
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl shadow-blue-500/10 rounded-2xl border border-white/20 p-8 text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
              <EnvelopeIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Check your email
            </h1>
            <p className="text-gray-600 mb-2">
              We've sent a verification link to
            </p>
            <p className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg inline-block">
              {user.email}
            </p>
          </div>
          
          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          )}
          
          {/* Content */}
          <div className="space-y-6">
            <p className="text-gray-600 text-left bg-gray-50 p-4 rounded-xl">
              Click the link in the email to verify your account. If you don't see the email, check your spam folder.
            </p>
            
            {/* Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleResendEmail}
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                size="lg"
                loading={isLoading}
              >
                Resend verification email
              </Button>
              
              {/* Demo button - remove in production */}
              <Button
                onClick={handleVerifyNow}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                size="lg"
                loading={isLoading}
              >
                Verify Email Now (Demo)
              </Button>
            </div>
            
            {/* Sign Up Link */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-gray-600">
                Wrong email?{' '}
                <Link
                  to="/auth/register"
                  className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Sign up again
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Check your email and click the verification link to continue
        </p>
      </div>
    </div>
  )

}