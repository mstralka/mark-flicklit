import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeSlashIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { changePasswordSchema, type ChangePasswordInput } from '../../lib/validations/auth'
import { useAuthStore } from '../../store/authStore'

export function ChangePasswordForm() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [success, setSuccess] = useState(false)
  const { changePassword, isLoading, error, clearError } = useAuthStore()
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
  })

  // Clear error when component mounts
  useEffect(() => {
    clearError()
  }, [clearError])

  const handleChangePassword = async (data: ChangePasswordInput) => {
    try {
      await changePassword(data.currentPassword, data.newPassword)
      setSuccess(true)
      reset() // Clear form on success
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch {
      // Error is handled by the store
    }
  }

  return (
    <div className="max-w-md w-full space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Change password</h3>
        <p className="mt-1 text-sm text-gray-600">
          Update your password to keep your account secure
        </p>
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

      {success && (
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                Password changed successfully!
              </h3>
            </div>
          </div>
        </div>
      )}
      
      <form className="space-y-4" onSubmit={handleSubmit(handleChangePassword)}>
        <div className="relative">
          <Input
            {...register('currentPassword')}
            type={showCurrentPassword ? 'text' : 'password'}
            label="Current password"
            placeholder="Enter your current password"
            error={errors.currentPassword?.message}
            autoComplete="current-password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center mt-6"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            {showCurrentPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>

        <div className="relative">
          <Input
            {...register('newPassword')}
            type={showNewPassword ? 'text' : 'password'}
            label="New password"
            placeholder="Enter your new password"
            error={errors.newPassword?.message}
            autoComplete="new-password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center mt-6"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>

        <div className="relative">
          <Input
            {...register('confirmPassword')}
            type={showConfirmPassword ? 'text' : 'password'}
            label="Confirm new password"
            placeholder="Confirm your new password"
            error={errors.confirmPassword?.message}
            autoComplete="new-password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center mt-6"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full"
            loading={isLoading}
            disabled={success}
          >
            Change password
          </Button>
        </div>
      </form>

      <div className="text-xs text-gray-500">
        <p>Password requirements:</p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>At least 8 characters long</li>
          <li>Contains at least one uppercase letter</li>
          <li>Contains at least one number</li>
        </ul>
      </div>
    </div>
  )
}