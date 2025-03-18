'use client'

import { signUp } from "@/actions/auth/users"
import { Button } from "@components/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpFormSchema, type TSignUpFormSchema } from "@/lib/types/auth/sign-up-form-schema"
import {
  Form,
  FormField,
  Input,
  Label,
  ValidationMessage
} from "@/components/form"

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TSignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema)
  })

  const onSubmit = async (data: TSignUpFormSchema) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('password', data.password)
    await signUp(formData)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          {...register('name')}
          placeholder="Enter your full name"
          isInvalid={!!errors.name}
        />
        {errors.name && (
          <ValidationMessage type="error">{errors.name.message}</ValidationMessage>
        )}
      </FormField>
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
          placeholder="Choose a password"
          isInvalid={!!errors.password}
        />
        {errors.password && (
          <ValidationMessage type="error">{errors.password.message}</ValidationMessage>
        )}
      </FormField>
      <FormField>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          type="password"
          id="confirmPassword"
          {...register('confirmPassword')}
          placeholder="Confirm your password"
          isInvalid={!!errors.confirmPassword}
        />
        {errors.confirmPassword && (
          <ValidationMessage type="error">{errors.confirmPassword.message}</ValidationMessage>
        )}
      </FormField>
      <Button
        type="submit"
        text={isSubmitting ? "Creating account..." : "Sign Up"}
        variant="primary"
        disabled={isSubmitting}
      />
    </Form>
  )
}