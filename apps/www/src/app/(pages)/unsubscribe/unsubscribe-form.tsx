'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, Input, Label, ValidationMessage }  from '@components/form'
import { Button } from '@components/button'
import { useToast } from "@components/toast"

export function UnsubscribeForm() {
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm();

  const onSubmit = async (formData: any) => {

    await fetch('/api/email/delete-contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
      }),
    }).then(() => {
      console.log('Unsubscribed', formData);
      toast({
        title: 'Unsubscribed',
        description: "You have been unsubscribed from our newsletter.",
        variant: 'success',
      })
      reset();
    });

    reset();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField>
        <Label htmlFor='email'>Email</Label>
        <Input
          type='email'
          register={register}
          name='email'
          placeholder='john@coltrane.com'
        />
        {
          errors.email && (
            <ValidationMessage>
              {`${errors.email.message}`}
            </ValidationMessage>
          )
        }
      </FormField>
      <Button
        type='submit'
        disabled={isSubmitting}
        text={isSubmitting ? 'See you later...' : 'Unsubscribe'}
      />
    </Form>
  )
}

