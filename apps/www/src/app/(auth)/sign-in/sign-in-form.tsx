'use client'

import { signIn } from "@/actions/auth/sign-in"
import { Button } from "@components/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useToast } from "@/components/toast"
import {
  Form,
  FormField,
  Input,
  Label,
  ValidationMessage
} from "@/components/form"
import { useRouter } from "next/navigation"
import { ToastAction } from "@/components/toast"

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

type TSignInSchema = z.infer<typeof signInSchema>

export const SignInForm = () => {
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
              onClick={() => router.push('/sign-up')}
              altText="Create an account"
            >
              Sign up
            </ToastAction>
          )
        })
      } else {
        toast({
          title: "Error signing in",
          description: "Please try again later.",
          variant: "error"
        })
      }
    }
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