'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@components/button'
import { Form, FormField, Input, Label, ValidationMessage } from '@components/form'
import { useToast } from '@components/toast'
import { useRouter } from 'next/navigation'
import { resetPasswordAction } from '@/actions/auth/reset-password'

const passwordSchema = z.object({
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

type PasswordFormData = z.infer<typeof passwordSchema>

interface UpdatePasswordFormProps {
  token: string
}

export function UpdatePasswordForm({ token }: UpdatePasswordFormProps) {
  const { toast } = useToast()
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema)
  })

  const onSubmit = async (data: PasswordFormData) => {
    try {
      const result = await resetPasswordAction({
        token,
        newPassword: data.newPassword
      })

      if (result.error) {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'error'
        })
        return
      }

      toast({
        title: 'Password reset successful',
        description: 'Your password has been reset. You can now sign in with your new password.',
        variant: 'success'
      })
      router.push('/sign-in')
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to reset password. Please try again.',
        variant: 'error'
      })
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField>
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
      <Button
        type="submit"
        text={isSubmitting ? "Resetting..." : "Reset Password"}
        variant="primary"
        disabled={isSubmitting}
      />
    </Form>
  )
} 