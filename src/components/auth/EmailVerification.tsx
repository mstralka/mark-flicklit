import React from 'react'
import { Link } from 'react-router-dom'
import { EnvelopeIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { Button } from '../ui/Button'

interface EmailVerificationProps {
  email: string
  onResendEmail: () => Promise<void>
  loading?: boolean
  verified?: boolean
}

export function EmailVerification({ email, onResendEmail, loading, verified }: EmailVerificationProps) {
  if (verified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <CheckCircleIcon className="mx-auto h-12 w-12 text-green-500" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Email verified!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Your email has been successfully verified. You can now access your account.
            </p>
          </div>
          
          <div>
            <Link to="/dashboard">
              <Button className="w-full" size="lg">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
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
          <p className="text-sm font-medium text-gray-900">{email}</p>
        </div>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Click the link in the email to verify your account. If you don't see the email, check your spam folder.
          </p>
          
          <Button
            onClick={onResendEmail}
            variant="outline"
            className="w-full"
            loading={loading}
          >
            Resend verification email
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