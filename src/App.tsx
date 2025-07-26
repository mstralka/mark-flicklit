import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { LoginForm } from './components/auth/LoginForm'
import { RegisterForm } from './components/auth/RegisterForm'
import { ResetPasswordForm } from './components/auth/ResetPasswordForm'
import { EmailVerification } from './components/auth/EmailVerification'
import type { LoginInput, RegisterInput, ResetPasswordInput } from './lib/validations/auth'

function App() {
  // Mock authentication handlers - you'll implement these with your backend
  const handleLogin = async (data: LoginInput) => {
    console.log('Login:', data)
    // TODO: Implement login logic
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
  }

  const handleRegister = async (data: RegisterInput) => {
    console.log('Register:', data)
    // TODO: Implement registration logic
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
  }

  const handleResetPassword = async (data: ResetPasswordInput) => {
    console.log('Reset password:', data)
    // TODO: Implement password reset logic
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
  }

  const handleResendEmail = async () => {
    console.log('Resend email verification')
    // TODO: Implement resend email logic
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
          <Route 
            path="/auth/login" 
            element={<LoginForm onSubmit={handleLogin} />} 
          />
          <Route 
            path="/auth/register" 
            element={<RegisterForm onSubmit={handleRegister} />} 
          />
          <Route 
            path="/auth/reset-password" 
            element={<ResetPasswordForm onSubmit={handleResetPassword} />} 
          />
          <Route 
            path="/auth/verify-email" 
            element={
              <EmailVerification 
                email="user@example.com" 
                onResendEmail={handleResendEmail}
              />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Welcome to FlickLit! 📚
                  </h1>
                  <p className="text-lg text-gray-600">
                    Your personalized book recommendation experience
                  </p>
                </div>
              </div>
            } 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App