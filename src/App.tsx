import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { LoginForm } from './components/auth/LoginForm'
import { RegisterForm } from './components/auth/RegisterForm'
import { ResetPasswordForm } from './components/auth/ResetPasswordForm'
import { EmailVerification } from './components/auth/EmailVerification'
import { ProtectedRoute, PublicRoute } from './components/auth/ProtectedRoute'
import { Dashboard } from './components/Dashboard'
import { useAuthStore } from './store/authStore'

function App() {
  const { initialize } = useAuthStore()

  useEffect(() => {
    // Initialize authentication state on app load
    initialize()
  }, [initialize])

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Public routes - redirect to dashboard if authenticated */}
          <Route 
            path="/auth/login" 
            element={
              <PublicRoute>
                <LoginForm />
              </PublicRoute>
            } 
          />
          <Route 
            path="/auth/register" 
            element={
              <PublicRoute>
                <RegisterForm />
              </PublicRoute>
            } 
          />
          <Route 
            path="/auth/reset-password" 
            element={
              <PublicRoute>
                <ResetPasswordForm />
              </PublicRoute>
            } 
          />
          
          {/* Email verification - requires authentication but not email verification */}
          <Route 
            path="/auth/verify-email" 
            element={
              <ProtectedRoute requireEmailVerification={false}>
                <EmailVerification />
              </ProtectedRoute>
            } 
          />
          
          {/* Protected routes - require authentication and email verification */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App