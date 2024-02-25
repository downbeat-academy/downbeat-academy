'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateUserSchema, TUpdateUserSchema } from '@lib/types/auth/update-user-schema'
import { useToast } from '@components/toast'
import { Form, FormField, Label, Input, ValidationMessage } from '@components/form'
import { Button } from '@components/button';
import { updateUser } from "@actions/auth/update-user";

export function UpdateUserForm() {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TUpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
  });

  const onSubmit = async (formData: TUpdateUserSchema) => {
    try {
      const formDataObject = {
        email: formData.email || '',
        password: formData.password || '',
      };
      await updateUser(formDataObject);
      toast({
        title: 'Account details updated',
        variant: 'success',
      })

      reset()
    } catch (e) {
      console.log(e);
      toast({
        title: 'Update user failed',
        variant: 'error',
      })
      throw new Error('Failed to update user');
    }
  }


  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField>
        <Label htmlFor='email'>Email</Label>
        <Input
          type='email'
          id='email'
          name='email'
          register={register}
        />
      </FormField>
      <FormField>
        <Label htmlFor='password'>Password</Label>
        <Input
          type='password'
          id='password'
          name='password'
          register={register}
        />
      </FormField>
      <Button
        variant='primary'
        text={isSubmitting ? 'Updating account details' : 'Save'}
        disabled={isSubmitting}
        type='submit'
      />
    </Form>
  )
}