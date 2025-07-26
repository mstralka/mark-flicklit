import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireEmailVerification?: boolean
}

export function ProtectedRoute({ children, requireEmailVerification = false }: ProtectedRouteProps) {
  const { isAuthenticated, user, initialize } = useAuthStore()
  const location = useLocation()

  useEffect(() => {
    // Initialize auth state on mount
    initialize()
  }, [initialize])

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
  const { isAuthenticated, initialize } = useAuthStore()

  useEffect(() => {
    // Initialize auth state on mount
    initialize()
  }, [initialize])

  // If authenticated, redirect to dashboard or specified route
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}