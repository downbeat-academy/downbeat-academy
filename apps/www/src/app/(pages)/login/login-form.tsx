'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, Label, Input, ValidationMessage } from '@components/form'
import { Button, ButtonWrapper } from '@components/button'
import { login } from '@actions/auth/login'

/**
 * Schema for login form validation.
 */
export const loginSchema = z.object({
  email: z.string().email().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <Form>
      <FormField>
        <Label htmlFor="email">Email</Label>
        <Input
          type='email'
          id='email'
          name='email'
          register={register}
        />
        <ValidationMessage type='error'>{`${errors.email.message}`}</ValidationMessage>
      </FormField>
      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input
          type='password'
          id='password'
          name='password'
          register={register}
        />
        <ValidationMessage type='error'>{`${errors.password.message}`}</ValidationMessage>
      </FormField>
      <ButtonWrapper>
        <Button formAction={login} variant='primary' text='Log in' />
      </ButtonWrapper>
    </Form>
  )
}