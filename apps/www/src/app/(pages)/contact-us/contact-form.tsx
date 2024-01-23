'use client'

import { useForm } from 'react-hook-form'
import { Button } from '@components/button'

interface ContactFormProps {
  name: string
  email: string
  message: string
}

export function ContactForm() {
  const { 
    register,
    handleSubmit, 
    formState: { isSubmitting, errors },
    reset
  } = useForm<ContactFormProps>()

  async function onSubmit(formData: ContactFormProps) {
    await fetch ('/api/email', {
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
      console.log('Message sent successfully')
    })

    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name='name' type='text' placeholder='Name' {...register('name', { required: true })} />
      <input name='email' type='email' placeholder='Email' {...register('email', { required: true })} />
      <textarea name='message' placeholder='Message' {...register('message', { required: true })} />
      <Button type='submit' text='Send' />
    </form>
  )
}