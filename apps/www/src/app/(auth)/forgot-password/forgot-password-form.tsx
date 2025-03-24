'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useToast } from "@components/toast"
import { Button } from "@components/button"
import {
  Form,
  FormField,
  Input,
  Label,
  ValidationMessage
} from "@/components/form"
import { forgotPasswordAction } from "@/actions/auth"

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>

export function ForgotPasswordForm() {
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema)
  })

  const onSubmit = async (data: ForgotPasswordSchema) => {
    try {
      const result = await forgotPasswordAction(data.email)
      
      if (result.success) {
        toast({
          title: "Check your email",
          description: "We've sent you a link to reset your password.",
          variant: "success"
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Something went wrong. Please try again.",
          variant: "error"
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "error"
      })
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
          placeholder="john@coltrane.com"
          isInvalid={!!errors.email}
        />
        {errors.email && (
          <ValidationMessage type="error">{errors.email.message}</ValidationMessage>
        )}
      </FormField>
      <Button
        type="submit"
        text={isSubmitting ? "Sending reset link..." : "Send reset link"}
        variant="primary"
        disabled={isSubmitting}
      />
    </Form>
  )
} 