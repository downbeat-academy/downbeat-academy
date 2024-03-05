'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateProfileSchema, TUpdateProfileSchema } from '@lib/types/profile/update-profile-schema'
import { updateProfile } from '@actions/profile/update-profile'
import { Button, ButtonWrapper } from '@components/button';
import { Form, FormField, Label, Input, ValidationMessage } from '@components/form'
import { useToast } from '@components/toast'
import { DialogClose } from '@components/dialog'

interface UpdateProfileFormProps {
  isReadOnly: boolean;
  firstName?: any;
  lastName?: any;
}

const UpdateProfileForm = ({
  isReadOnly,
  firstName,
  lastName
}: UpdateProfileFormProps) => {
  const router = useRouter()
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TUpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
  })

  const onSubmit = async (formData: TUpdateProfileSchema) => {
    try {
      const formDataObject = {
        firstName: formData.firstName || '',
        lastName: formData.lastName || '',
      }
      await updateProfile(formDataObject)
      toast({
        title: 'Profile updated',
        variant: 'success',
      })
      router.refresh();
    } catch (e) {
      console.log(e)
      toast({
        title: 'Failed to update profile',
        variant: 'error',
      })
      throw new Error('Failed to update profile')
    }
  }

  const readOnlyProps = (value) => {
    if (isReadOnly === true) {
      return {
        disabled: true,
        value: value,
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField>
        <Label htmlFor='first-name'>First name</Label>
        <Input
          type='text'
          id='firstName'
          name='firstName'
          register={register}
          isInvalid={!!errors.firstName}
          placeholder={firstName}
          {...readOnlyProps(firstName)}
        />
        {errors.firstName &&
          <ValidationMessage type='error'>{`${errors.firstName.message}`}</ValidationMessage>
        }
      </FormField>
      <FormField>
        <Label htmlFor='last-name'>Last name</Label>
        <Input
          type='text'
          id='lastName'
          name='lastName'
          register={register}
          isInvalid={!!errors.lastName}
          placeholder={lastName}
          {...readOnlyProps(lastName)}
        />
        {errors.lastName &&
          <ValidationMessage type='error'>{`${errors.lastName.message}`}</ValidationMessage>
        }
      </FormField>
      {!isReadOnly && (
        <ButtonWrapper>
          <Button
            type='submit'
            variant='primary'
            text={isSubmitting ? 'Updating profile…' : 'Update profile'}
            disabled={isSubmitting}
          />
          <DialogClose asChild>
            <Button
              type='submit'
              variant='secondary'
              text='Cancel'
            />
          </DialogClose>
        </ButtonWrapper>
      )}
    </Form>
  )
}

export { UpdateProfileForm }