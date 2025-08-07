'use client'

import { signUp } from "@/actions/auth"
import { Button } from "@components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpFormSchema, type TSignUpFormSchema } from "@/lib/types/auth/sign-up-form-schema"
import { useToast } from "@/components/toast"
import { createContact } from "@/actions/email/create-contact"
import {
  Form,
  Field,
  Input,
  Label,
  ValidationMessage,
  HelperText
} from "cadence-core"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

const checkPasswordRequirements = (password: string) => {
  if (!password) return false
  
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(password)
  const hasMinLength = password.length >= 8

  return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && hasMinLength
}

export const SignUpForm = () => {
  const { toast } = useToast()
  const router = useRouter()
  const [passwordMeetsRequirements, setPasswordMeetsRequirements] = useState(false)
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<TSignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema)
  })

  // Watch password field to check requirements
  const password = watch("password")
  useEffect(() => {
    setPasswordMeetsRequirements(checkPasswordRequirements(password || ''))
  }, [password])

  const onSubmit = async (data: TSignUpFormSchema) => {
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('password', data.password)
      const result = await signUp(formData)
      
      if (result.success) {
        try {
          await createContact({ 
            email: data.email,
            firstName: data.name.split(' ')[0],
            lastName: data.name.split(' ').slice(1).join(' ')
          })
          console.log('Successfully added contact to Resend:', data.email)
        } catch (error) {
          console.error('Failed to add contact to Resend:', error)
        }

        reset()
        toast({
          title: "Account created",
          description: `We've sent a verification link to ${result.email}. Please check your inbox and click the link to verify your account.`,
          variant: "success"
        })
      }
    } catch (error: any) {
      if (error.message === 'A user with this email already exists') {
        toast({
          title: "Account already exists",
          description: "Please sign in with your existing account or use a different email address.",
          variant: "error"
        })
      } else {
        toast({
          title: "Error creating account",
          description: "Please try again later.",
          variant: "error"
        })
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Field>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          data-testid="signup-name-input"
          {...register('name')}
          placeholder="John Coltrane"
          isInvalid={!!errors.name}
        />
        {errors.name && (
          <ValidationMessage type="error">{errors.name.message}</ValidationMessage>
        )}
      </Field>
      <Field>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          data-testid="signup-email-input"
          {...register('email')}
          placeholder="john@bluenote.com"
          isInvalid={!!errors.email}
        />
        {errors.email && (
          <ValidationMessage type="error">{errors.email.message}</ValidationMessage>
        )}
      </Field>
      <Field>
        <Label htmlFor="password">Password</Label>
        <HelperText>
          Password must be at least 8 characters and include uppercase & lowercase letters, numbers, and special characters.
        </HelperText>
        <Input
          type="password"
          id="password"
          data-testid="signup-password-input"
          {...register('password')}
          placeholder="Choose a password"
          isInvalid={!!errors.password}
        />
        {errors.password && (
          <ValidationMessage type="error">{errors.password.message}</ValidationMessage>
        )}
        {!errors.password && passwordMeetsRequirements && (
          <ValidationMessage type="success">Password meets all requirements</ValidationMessage>
        )}
      </Field>
      <Field>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          type="password"
          id="confirmPassword"
          data-testid="signup-confirm-password-input"
          {...register('confirmPassword')}
          placeholder="Confirm your password"
          isInvalid={!!errors.confirmPassword}
        />
        {errors.confirmPassword && (
          <ValidationMessage type="error">{errors.confirmPassword.message}</ValidationMessage>
        )}
      </Field>
      <Button
        type="submit"
        data-testid="signup-submit"
        text={isSubmitting ? "Creating account..." : "Sign Up"}
        variant="primary"
        disabled={isSubmitting}
      />
    </Form>
  )
}