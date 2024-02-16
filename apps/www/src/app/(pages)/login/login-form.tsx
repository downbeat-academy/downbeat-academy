'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, Label, Input, ValidationMessage } from '@components/form'
import { Button, ButtonWrapper } from '@components/button'
import { login } from '@actions/auth/login'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
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

  const onSubmit = handleSubmit(formData => {
    // @ts-ignore
    login(formData)
  });

  return (
    <Form onSubmit={onSubmit}>
      <FormField>
        <Label htmlFor="email">Email</Label>
        <Input
          type='email'
          id='email'
          name='email'
          register={register}
        />
        {errors.email &&
          <ValidationMessage type='error'>{`${errors.email.message}`}</ValidationMessage>
        }
      </FormField>
      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input
          type='password'
          id='password'
          name='password'
          register={register}
        />
        {errors.password &&
          <ValidationMessage type='error'>{`${errors.password.message}`}</ValidationMessage>
        }
      </FormField>
      <ButtonWrapper>
        <Button
          type='submit'
          variant='primary'
          text={isSubmitting ? 'Logging you in…' : 'Login'}
        />
      </ButtonWrapper>
    </Form>
  )
}