'use client'

import { signIn } from "@/actions/auth/users"
import { Button } from "@components/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Form,
  FormField,
  Input,
  Label,
  ValidationMessage
} from "@/components/form"

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

type TSignInSchema = z.infer<typeof signInSchema>

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = async (data: TSignInSchema) => {
    const formData = new FormData()
    formData.append('email', data.email)
    formData.append('password', data.password)
    await signIn(formData)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          {...register('email')}
          placeholder="Enter your email"
          isInvalid={!!errors.email}
        />
        {errors.email && (
          <ValidationMessage type="error">{errors.email.message}</ValidationMessage>
        )}
      </FormField>
      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          {...register('password')}
          placeholder="Enter your password"
          isInvalid={!!errors.password}
        />
        {errors.password && (
          <ValidationMessage type="error">{errors.password.message}</ValidationMessage>
        )}
      </FormField>
      <Button
        type="submit"
        text={isSubmitting ? "Signing in..." : "Sign In"}
        variant="primary"
        disabled={isSubmitting}
      />
    </Form>
  )
}