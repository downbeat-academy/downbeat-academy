'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, type TContactFormSchema } from '@lib/types/contact-form-schema'
import {
  Form,
  FormField,
  Input,
  Textarea,
  ValidationMessage,
  Label,
} from '@components/form'
import { Button } from '@components/button'

export function ContactForm() {

  // Use react-hook-form to handle the form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TContactFormSchema>({
    resolver: zodResolver(contactFormSchema)
  })

  // Handle form submission and send an email with the Resend API route
  const onSubmit = async (formData: TContactFormSchema) => {

    await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),

    }).then(() => {
      console.log('Email sent successfully');
    });

    reset();
  }

  return (
    <Form
      name='contact-form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormField>
        <Label htmlFor='name'>Name</Label>
        <Input
          register={register}
          type='text'
          name='name'
          placeholder='Name'
        />
        {
          errors.name &&
          <ValidationMessage type='error'>
            {`${errors.name.message}`}
          </ValidationMessage>
        }
      </FormField>
      <FormField>
        <Label htmlFor='email'>Email</Label>
        <Input
          register={register}
          type='email'
          name='email'
          placeholder='Email'
        />
        {errors.email &&
          <ValidationMessage type='error'>
            {`${errors.email.message}`}
          </ValidationMessage>
        }
      </FormField>
      <FormField>
        <Label htmlFor='message'>Message</Label>
        <Textarea
          register={register}
          name='message'
          placeholder='Message'
        />
        {errors.message &&
          <ValidationMessage type='error'>
            {`${errors.message.message}`}
          </ValidationMessage>
        }
      </FormField>
      <Button
        type='submit'
        text={isSubmitting ? 'Sending...' : 'Send message'}
        disabled={isSubmitting}
      />
    </Form>
  )
}