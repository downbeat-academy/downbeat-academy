'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, ButtonWrapper } from '@components/button'
import {
  Form,
  FormField,
  Label,
  Input,
  ValidationMessage,
  HelperText
} from '@components/form'
import { useToast } from '@components/toast'
import { DialogClose } from '@components/dialog'
import { useState, useEffect } from 'react'
import { updatePasswordAction } from '@/actions/auth'

const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/,
      'Password must contain at least one special character'
    ),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type TUpdatePasswordSchema = z.infer<typeof updatePasswordSchema>

const checkPasswordRequirements = (password: string) => {
  if (!password) return false
  
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(password)
  const hasMinLength = password.length >= 8

  return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && hasMinLength
}

export const UpdatePasswordForm = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [passwordMeetsRequirements, setPasswordMeetsRequirements] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TUpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
  })

  // Watch password field to check requirements
  const password = watch("newPassword")
  useEffect(() => {
    setPasswordMeetsRequirements(checkPasswordRequirements(password || ''))
  }, [password])

  const onSubmit = async (formData: TUpdatePasswordSchema) => {
    try {
      const result = await updatePasswordAction(formData.currentPassword, formData.newPassword)
      
      if (result.success) {
        toast({
          title: 'Password updated',
          description: 'Your password has been successfully updated.',
          variant: 'success',
        })
        router.refresh()
      } else {
        toast({
          title: 'Failed to update password',
          description: result.error || 'Please try again.',
          variant: 'error',
        })
      }
    } catch (e) {
      console.error(e)
      toast({
        title: 'Failed to update password',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'error',
      })
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} maxWidth="400px">
      <FormField>
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
      </FormField>
      <FormField>
        <Label htmlFor="newPassword">New Password</Label>
        <HelperText>
          Password must be at least 8 characters and include uppercase & lowercase letters, numbers, and special characters.
        </HelperText>
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
        {!errors.newPassword && passwordMeetsRequirements && (
          <ValidationMessage type="success">Password meets all requirements</ValidationMessage>
        )}
      </FormField>
      <FormField>
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
      </FormField>
      <ButtonWrapper>
        <Button
          type="submit"
          variant="primary"
          text={isSubmitting ? 'Updating password…' : 'Update password'}
          disabled={isSubmitting}
        />
        <DialogClose asChild>
          <Button type="button" variant="secondary" text="Cancel" />
        </DialogClose>
      </ButtonWrapper>
    </Form>
  )
} 