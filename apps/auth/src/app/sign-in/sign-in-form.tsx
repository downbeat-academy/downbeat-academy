'use client'

import { signIn } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useToast, ToastAction } from "@/components/toast"
import {
  Form,
  Field,
  Input,
  Label,
  ValidationMessage,
} from "cadence-core"
import { useRouter } from "next/navigation"
import { Link } from '@/components/link'

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

type TSignInSchema = z.infer<typeof signInSchema>

interface SignInFormProps {
  redirectUri?: string
}

export const SignInForm = ({ redirectUri }: SignInFormProps) => {
  const { toast } = useToast()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = async (data: TSignInSchema) => {
    try {
      const formData = new FormData()
      formData.append('email', data.email)
      formData.append('password', data.password)
      if (redirectUri) {
        formData.append('redirectUri', redirectUri)
      }
      await signIn(formData)
    } catch (error: any) {
      if (error.message === 'Invalid email or password') {
        toast({
          title: "Sign in failed",
          description: "Please check your email and password and try again.",
          variant: "error"
        })
      } else if (error.message === 'This email is not registered. Please create an account first.') {
        toast({
          title: "Account not found",
          description: "This email is not registered. Would you like to create an account?",
          variant: "error",
          action: (
            <ToastAction
              onClick={() => router.push('/sign-in?tab=signup')}
              altText="Create an account"
            >
              Sign up
            </ToastAction>
          )
        })
      } else if (error.message === 'Please verify your email address.') {
        toast({
          title: "Email not verified",
          description: "Please verify your email address.",
          variant: "error"
        })
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Field>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          data-testid="email-input"
          {...register('email')}
          placeholder="john@coltrane.com"
          isInvalid={!!errors.email}
        />
        {errors.email && (
          <ValidationMessage type="error">{errors.email.message}</ValidationMessage>
        )}
      </Field>
      <Field>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          data-testid="password-input"
          {...register('password')}
          placeholder="Enter your password"
          isInvalid={!!errors.password}
        />
        {errors.password && (
          <ValidationMessage type="error">{errors.password.message}</ValidationMessage>
        )}
      </Field>
      <Button
        type="submit"
        data-testid="sign-in-submit"
        variant="primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>
      <Link href="/forgot-password">
        Forgot your password?
      </Link>
    </Form>
  )
}
