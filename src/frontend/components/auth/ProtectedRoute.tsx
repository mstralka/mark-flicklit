import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireEmailVerification?: boolean
}

export function ProtectedRoute({ children, requireEmailVerification = false }: ProtectedRouteProps) {
  const { isAuthenticated, isInitialized, user, initialize } = useAuthStore()
  const location = useLocation()

  useEffect(() => {
    // Initialize auth state on mount
    initialize()
  }, [initialize])

  // Show loading while initializing authentication
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  // If not authenticated, redirect to login with return path
  if (!isAuthenticated || !user) {
    return (
      <Navigate 
        to="/auth/login" 
        state={{ from: location.pathname }} 
        replace 
      />
    )
  }

  // If email verification is required and user hasn't verified
  if (requireEmailVerification && !user.emailVerified) {
    return (
      <Navigate 
        to="/auth/verify-email" 
        state={{ email: user.email }} 
        replace 
      />
    )
  }

  return <>{children}</>
}

interface PublicRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

export function PublicRoute({ children, redirectTo = '/dashboard' }: PublicRouteProps) {
  const { isAuthenticated, isInitialized, initialize } = useAuthStore()

  useEffect(() => {
    // Initialize auth state on mount
    initialize()
  }, [initialize])

  // Show loading while initializing authentication
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  // If authenticated, redirect to dashboard or specified route
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}