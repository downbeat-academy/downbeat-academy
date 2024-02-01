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

  const onSubmit = async (data: ContactFormSchema) => {
    console.log(data)
    reset();
  }

  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <input name='name' type='text' placeholder='Name' {...register('name', { required: true })} />
    //   <input name='email' type='email' placeholder='Email' {...register('email', { required: true })} />
    //   <textarea name='message' placeholder='Message' {...register('message', { required: true })} />
    //   <Button type='submit' text='Send' />
    // </form>
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField>
        <Input 
          {...register('name')}
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
          {...register('email')}
          type='email' 
          name='email' 
          placeholder='Email'
        />
      </FormField>
      <FormField>
        <Textarea 
          {...register('message')}
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