'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { resetPasswordSchema, TResetPasswordSchema } from "lib/types/auth/reset-password-schema"
import { resetPassword } from "actions/auth/send-password-reset"

import {
  Form,
  Input,
  FormField,
  ValidationMessage,
  Label
} from 'components/form'
import { Button, ButtonWrapper } from 'components/button'
import { useToast } from 'components/toast'

const ResetPasswordForm = () => {
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = async (formData: TResetPasswordSchema) => {
    try {
      const formDataObject = {
        email: formData.email || '',
      }
      await resetPassword(formDataObject)
      toast({
        title: 'Reset password',
        description: 'Check your inbox and reset your password.',
        variant: 'success',
      })
    } catch (e) {
      console.log(e)
      toast({
        title: 'Failed to reset password',
        variant: 'error',
      })
      throw new Error('Failed to reset password')
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          type='email'
          name='email'
          register={register}
        />
        {errors.email && (
          <ValidationMessage type='error'>{errors.email.message}</ValidationMessage>
        )}
      </FormField>
      <ButtonWrapper>
        <Button
          type='submit'
          variant='primary'
          text={isSubmitting ? 'Sending reset email' : 'Reset password'}
          disabled={isSubmitting}
        />
        <Button
          variant='secondary'
          text='Back to home'
          href='/'
        />
      </ButtonWrapper>
    </Form>
  )
}

export { ResetPasswordForm }