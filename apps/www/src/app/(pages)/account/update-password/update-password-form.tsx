'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@components/ui/button'
import { Form, Field, Input, Label, ValidationMessage } from 'cadence-core'
import { useToast } from '@components/toast'
import { updatePasswordAction } from '@/actions/auth/update-password'
import { useEffect, useState } from 'react'

const updatePasswordSchema = z.object({
  currentPassword: z.string().optional(),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>

export function UpdatePasswordForm() {
  const { toast } = useToast()
  const [hasPassword, setHasPassword] = useState<boolean | null>(null)
  
  useEffect(() => {
    const checkPassword = async () => {
      try {
        const result = await updatePasswordAction({
          newPassword: 'temp-check-only'
        })
        setHasPassword(!result.error || result.error !== 'No password set for this account')
      } catch (error) {
        console.error('Failed to check password status:', error)
      }
    }
    
    checkPassword()
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema)
  })

  const onSubmit = async (data: UpdatePasswordSchema) => {
    try {
      const result = await updatePasswordAction({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      })
      
      if (result.error) {
        toast({
          title: 'Failed to update password',
          description: result.error,
          variant: 'error'
        })
        return
      }

      toast({
        title: 'Password updated',
        description: 'Your password has been successfully updated.',
        variant: 'success'
      })
      reset()
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update password. Please try again.',
        variant: 'error'
      })
    }
  }

  if (hasPassword === null) {
    return null // Loading state
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {hasPassword && (
        <Field>
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input
            type="password"
            id="currentPassword"
            {...register('currentPassword')}
            placeholder="Enter your current password"
            isInvalid={!!errors.currentPassword}
          />
          {errors.currentPassword && (
            <ValidationMessage type="error">{errors.currentPassword.message}</ValidationMessage>
          )}
        </Field>
      )}
      <Field>
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          type="password"
          id="newPassword"
          {...register('newPassword')}
          placeholder="Enter your new password"
          isInvalid={!!errors.newPassword}
        />
        {errors.newPassword && (
          <ValidationMessage type="error">{errors.newPassword.message}</ValidationMessage>
        )}
      </Field>
      <Field>
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <Input
          type="password"
          id="confirmPassword"
          {...register('confirmPassword')}
          placeholder="Confirm your new password"
          isInvalid={!!errors.confirmPassword}
        />
        {errors.confirmPassword && (
          <ValidationMessage type="error">{errors.confirmPassword.message}</ValidationMessage>
        )}
      </Field>
      <Button
        type="submit"
        variant="primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Updating..." : "Update Password"}
      </Button>
    </Form>
  )
} 