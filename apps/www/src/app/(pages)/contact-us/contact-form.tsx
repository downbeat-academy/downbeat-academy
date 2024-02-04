'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  Input,
  Textarea,
  ValidationMessage
} from '@components/form'
import { Button } from '@components/button'

const ContactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email().min(1, 'Email is required'),
  message: z.string().min(1, 'Message is required')
}).refine(data => data.name && data.email && data.message)

type ContactFormSchema = z.infer<typeof ContactFormSchema>

export function ContactForm() {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(ContactFormSchema)
  })

  const onSubmit = async (formData: ContactFormSchema) => {

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
        <Input
          register={register}
          type='email'
          name='email'
          placeholder='Email'
        />
      </FormField>
      <FormField>
        <Textarea
          register={register}
          name='message'
          placeholder='Message'
        />
      </FormField>
      <Button
        type='submit'
        text={isSubmitting ? 'Sending...' : 'Send message'}
        disabled={isSubmitting}
      />
    </Form>
  )
}