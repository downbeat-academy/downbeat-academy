'use client'

import { useForm } from 'react-hook-form'
import classnames from 'classnames'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from "@components/toast"
import {
  Form,
  Input,
  ValidationMessage,
  Label,
  FormField,
} from '@components/form'
import { Button } from '@components/button'
import { Text } from '@components/text'
import { getSanityUrl } from '@utils/getSanityUrl'
import { sendFileDownload } from '@actions/email/file-download'
import { createContact } from '@actions/email/create-contact'
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

  const classes = classnames([
    s['file_download--root']
  ])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TFileDownloadSchema>({
    resolver: zodResolver(fileDownloadSchema)
  })

  const onSubmit = async (formData: TFileDownloadSchema) => {
    try {
      const fileDownloadObject = {
        email: formData.email || '',
        file: fileUrl,
        title: title,
      }

      const createContactObject = {
        email: formData.email || '',
        firstName: '',
        lastName: '',
      }
      // Send the email
      await sendFileDownload(fileDownloadObject)
      // Subscribe the user to the mailing list
      await createContact(createContactObject)
      toast({
        title: 'File sent!',
        description: "Check your inbox for the file you requested!",
        variant: 'success',
      })
      reset()
    } catch (e) {
      throw new Error('Failed to send email')
    }
  }

  return (
    <section className={classes}>
      <Text size='h5' tag='h5' type='expressive-headline'>Get &apos;em in your inbox</Text>
      <Text size='body-base' tag='p' type='expressive-body'>{description}</Text>
      <Text size='body-base' tag='p' type='expressive-body'><strong>Title: </strong>{title}</Text>
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
          text={isSubmitting ? 'Landing in your inbox...' : 'Show me the files!'}
          disabled={isSubmitting}
        />
      </Form>
    </section>
  )
}

export { FileDownload }