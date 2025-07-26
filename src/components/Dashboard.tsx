import React from 'react'
import { useAuthStore } from '../store/authStore'
import { Button } from './ui/Button'

export function Dashboard() {
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to FlickLit! 📚
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your personalized book recommendation experience
        </p>
        
        {user && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Hello, {user.firstName} {user.lastName}!
            </h2>
            <p className="text-gray-600 mb-4">
              Email: {user.email}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Email verified: {user.emailVerified ? '✅ Yes' : '❌ No'}
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Total interactions: {user.totalLikes + user.totalDislikes} 
              ({user.totalLikes} likes, {user.totalDislikes} dislikes)
            </p>
            
            <Button
              onClick={handleLogout}
              variant="outline"
              className="mr-4"
            >
              Sign Out
            </Button>
          </div>
        )}
        
        <div className="text-gray-500">
          <p>Book recommendation system coming soon...</p>
        </div>
      </div>
    </div>
  )
}