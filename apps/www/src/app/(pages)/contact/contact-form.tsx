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
import { useToast } from "@components/toast"
import { sendEmail } from '@actions/email/send-email'
import s from './contact-form.module.scss'

export function ContactForm() {
  const { toast } = useToast()

  // Use react-hook-form to handle the form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TContactFormSchema>({
    resolver: zodResolver(contactFormSchema)
  })

  const onSubmit = async (formData: TContactFormSchema) => {
    try {
      const contactFormObject = {
        name: formData.name || '',
        email: formData.email || '',
        message: formData.message || '',
      }
      await sendEmail(contactFormObject)
      toast({
        title: 'Message sent!',
        description: "Thank you for the note, we'll be in touch soon!",
        variant: 'success',
      })
      reset()
    } catch (e) {
      throw new Error('Failed to send email')
    }
  }

  return (
    <section className={s['contact-form']}>
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
    </section>
  )
}