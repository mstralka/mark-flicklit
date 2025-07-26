import { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute, PublicRoute } from './components/auth/ProtectedRoute'
import { PageLoadingFallback } from './components/ui'
import { useAuthStore } from './store/authStore'

// Lazy load route components for code splitting
const LoginForm = lazy(() => import('./components/auth/LoginForm').then(m => ({ default: m.LoginForm })))
const RegisterForm = lazy(() => import('./components/auth/RegisterForm').then(m => ({ default: m.RegisterForm })))
const ResetPasswordForm = lazy(() => import('./components/auth/ResetPasswordForm').then(m => ({ default: m.ResetPasswordForm })))
const EmailVerification = lazy(() => import('./components/auth/EmailVerification').then(m => ({ default: m.EmailVerification })))
const Dashboard = lazy(() => import('./components/Dashboard').then(m => ({ default: m.Dashboard })))

function App() {
  const { initialize } = useAuthStore()

  useEffect(() => {
    // Initialize authentication state on app load
    initialize()
  }, [initialize])

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Suspense fallback={<PageLoadingFallback />}>
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
        </Suspense>
      </div>
    </Router>
  )
}

export default App