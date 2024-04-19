'use client'

import { useForm } from 'react-hook-form'
import { useQueryState } from 'nuqs'
import { Form, FormField, Input, Label, ValidationMessage } from '@components/form'
import { Button } from '@components/button'
import { useToast } from "@components/toast"
import { deleteContact } from '@actions/email/delete-contact'

export function UnsubscribeForm() {
  const [email, setEmail] = useQueryState('email')
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    defaultValues: {
      email: email || ''
    }
  });

  const onSubmit = async (formData: any) => {
    try {
      await deleteContact({ email: formData.email, audienceId: process.env.RESEND_DEFAULT_AUDIENCE_ID });
      toast({
        title: 'Unsubscribed',
        description: "You have been unsubscribed from our newsletter.",
        variant: 'success',
      })
      reset();
    } catch (e) {
      console.log(e);
      throw new Error('Failed to unsubscribe');
    }
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
          onChange={e => setEmail(e.target.value)}
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
        text={isSubmitting ? 'See you later 👋' : 'Unsubscribe'}
      />
    </Form>
  )
}

