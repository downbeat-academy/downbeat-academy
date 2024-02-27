'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateEmailSchema, TUpdateEmailSchema } from '@lib/types/auth/update-email-schema'
import { updateEmail } from '@actions/auth/update-email'
import {
  Form,
  FormField,
  Label,
  Input,
  ValidationMessage,
} from '@components/form'
import { Button, ButtonWrapper } from '@components/button'
import { Text } from '@components/text'
import { useToast } from '@components/toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@components/dialog'
import s from './account-item.module.scss'

const UpdateEmailForm = ({ email }: { email: string }) => {
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TUpdateEmailSchema>({
    resolver: zodResolver(updateEmailSchema),
  })

  const onSubmit = async (formData: TUpdateEmailSchema) => {
    try {
      const formDataObject = {
        email: formData.email || '',
      }
      await updateEmail(formDataObject)
      toast({
        title: 'Confirm new email',
        description: 'Check your inbox and confirm your updated email.',
        variant: 'success',
      })
    } catch (e) {
      console.log(e)
      toast({
        title: 'Failed to update email',
        variant: 'error',
      })
      throw new Error('Failed to update email')
    }
  }

  return (
    <article className={s['account-item']}>
      <Text tag='p' size='body-base' collapse>Email address: <strong>{email}</strong></Text>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant='secondary'
            size='small'
            text='Update email'
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update email</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Update your email address.
          </DialogDescription>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormField>
              <Label htmlFor='email'>Email</Label>
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
            <ButtonWrapper>
              <Button
                type='submit'
                variant='primary'
                text={isSubmitting ? 'Updating email…' : 'Update email'}
                disabled={isSubmitting}
              />
              <DialogClose asChild>
                <Button
                  type='button'
                  variant='secondary'
                  text='Cancel'
                />
              </DialogClose>
            </ButtonWrapper>
          </Form>
        </DialogContent>
      </Dialog >
    </article>
  )
}

export { UpdateEmailForm }