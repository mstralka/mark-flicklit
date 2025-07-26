import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { changePasswordSchema, type ChangePasswordInput } from '../../lib/validations/auth'

interface ChangePasswordFormProps {
  onSubmit: (data: ChangePasswordInput) => Promise<void>
  loading?: boolean
}

export function ChangePasswordForm({ onSubmit, loading }: ChangePasswordFormProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
  })

  const handleFormSubmit = async (data: ChangePasswordInput) => {
    await onSubmit(data)
    reset() // Clear form on success
  }

  return (
    <div className="max-w-md w-full space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Change password</h3>
        <p className="mt-1 text-sm text-gray-600">
          Update your password to keep your account secure
        </p>
      </div>
      
      <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
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
            loading={loading}
          >
            Update password
          </Button>
        </div>
      </form>
    </div>
  )
}