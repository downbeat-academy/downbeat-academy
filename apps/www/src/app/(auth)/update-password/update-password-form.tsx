'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@components/ui/button'
import { Form, Field, Input, Label, ValidationMessage, useToast } from 'cadence-core'
import { useRouter } from 'next/navigation'
import { resetPasswordAction } from '@/actions/auth/reset-password'

const passwordSchema = z.object({
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
}).superRefine(({ newPassword }, checkPassComplexity) => {
  const containsUppercase = (ch: string) => /[A-Z]/.test(ch)
  const containsLowercase = (ch: string) => /[a-z]/.test(ch)
  const containsSpecialChar = (ch: string) => /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch)
  
  let countOfUpperCase = 0,
    countOfLowerCase = 0,
    countOfNumbers = 0,
    countOfSpecialChar = 0

  for (let i = 0; i < newPassword.length; i++) {
    let ch = newPassword.charAt(i)
    if (!isNaN(+ch)) countOfNumbers++
    else if (containsUppercase(ch)) countOfUpperCase++
    else if (containsLowercase(ch)) countOfLowerCase++
    else if (containsSpecialChar(ch)) countOfSpecialChar++
  }

  if (countOfLowerCase < 1 || countOfUpperCase < 1 || countOfSpecialChar < 1 || countOfNumbers < 1) {
    checkPassComplexity.addIssue({
      code: 'custom',
      message: 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
      path: ['newPassword'],
    })
  }
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
      <Field>
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          type="password"
          id="newPassword"
          data-testid="new-password-input"
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
          data-testid="confirm-new-password-input"
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
        data-testid="reset-password-submit"
        variant="primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Resetting..." : "Reset Password"}
      </Button>
    </Form>
  )
} 