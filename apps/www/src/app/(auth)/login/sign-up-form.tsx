'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema, type TSignUpFormSchema } from '@lib/types/auth/sign-up-form-schema'
import { Form, FormField, Label, Input, ValidationMessage } from '@components/form'
import { Button, ButtonWrapper } from '@components/button'
import { useToast } from '@components/toast'
import { signup } from '@actions/auth/sign-up'

export function SignUpForm() {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpFormSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = handleSubmit((formData) => {
    const formDataObject = {
      email: formData.email || '',
      password: formData.password || '',
    };
    signup(formDataObject);

    console.log(errors)

    reset();
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
          isInvalid={!!errors.email}
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
          isInvalid={!!errors.password}
        />
        {errors.password &&
          <ValidationMessage type='error'>{`${errors.password.message}`}</ValidationMessage>
        }
      </FormField>
      {/* <FormField>
        <Label htmlFor="confirm-password">Confirm password</Label>
        <Input
          type='password'
          id='confirm-password'
          name='confirm-password'
          register={register}
          isInvalid={!!errors.confirmPassword}
        />
        {errors.confirmPassword &&
          <ValidationMessage type='error'>{`${errors.confirmPassword.message}`}</ValidationMessage>
        }
      </FormField> */}
      <ButtonWrapper>
        <Button
          type='submit'
          variant='primary'
          text={isSubmitting ? 'Kicking it off…' : 'Sign up'}
          onClick={() => !isSubmitting ? toast({
            title: 'Account created!',
            description: 'Check your email to confirm your account.',
            variant: 'success'
          }) : null}
        />
      </ButtonWrapper>
    </Form>
  )
}