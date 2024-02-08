'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from "@components/toast"
import {
  Form,
  Input,
  ValidationMessage,
  Label,
  FormField 
} from '@components/form'
import { Button } from '@components/button'
import { Text } from '@components/text'
import { getSanityUrl } from '@utils/getSanityUrl'
import s from './file-download.module.scss'

import type { FileDownloadProps } from './types'
import { fileDownloadSchema, type TFileDownloadSchema } from '@lib/types/file-download-schema'

const FileDownload = ({
  title,
  description,
  file
}: FileDownloadProps) => {

  const { toast } = useToast()

  const fileUrl = getSanityUrl(file.asset._ref)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TFileDownloadSchema>({
    resolver: zodResolver(fileDownloadSchema)
  })

  const onSubmit = async (formData: TFileDownloadSchema) => {

    await fetch('/api/file-download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        email: formData.email,
        file: fileUrl,
        title: title,
      })
    }).then(() => {
      console.log('Email sent successfully');
      toast({
        title: 'File sent!',
        description: "Check your inbox for the file you requested!",
        variant: 'success',
      })
    })

    await fetch('/api/create-contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        email: formData.email,
      })
    })

    reset();
  };

  return (
    <div>
      <Text size='h5' tag='h5' type='expressive-headline'>{title}</Text>
      <Text size='body-base' tag='p' type='expressive-body'>{description}</Text>
      <Form
        name='file-download-form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormField>
          <Label htmlFor='email'>Email</Label>
          <Input
            register={register}
            type='email'
            name='email'
            placeholder='john@coltrane.com'
          />
          {errors.email &&
            <ValidationMessage type='error'>
              {`${errors.email.message}`}
            </ValidationMessage>
          }
        </FormField>
        <Button
          type='submit'
          text={isSubmitting ? 'Landing in your inbox...' : 'Send me the file!'}
          disabled={isSubmitting}
        />
      </Form>
    </div>
  )
}

export { FileDownload }