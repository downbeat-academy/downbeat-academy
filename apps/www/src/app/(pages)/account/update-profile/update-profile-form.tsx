'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	updateProfileSchema,
	TUpdateProfileSchema,
} from '@lib/types/profile/update-profile-schema'
import { updateProfile } from '@actions/profile/update-profile'
import { Button, ButtonWrapper } from '@components/button'
import {
	Form,
	FormField,
	Label,
	Input,
	ValidationMessage,
} from '@components/form'
import { useToast } from '@components/toast'
import { DialogClose } from '@components/dialog'

interface UpdateProfileFormProps {
	isReadOnly: boolean
	name?: string
	email?: string
}

const UpdateProfileForm = ({
	isReadOnly,
	name,
	email,
}: UpdateProfileFormProps) => {
	const router = useRouter()
	const { toast } = useToast()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<TUpdateProfileSchema>({
		resolver: zodResolver(updateProfileSchema),
		defaultValues: {
			name: name || '',
		},
	})

	const onSubmit = async (formData: TUpdateProfileSchema) => {
		try {
			const formDataObject = {
				name: formData.name || '',
			}
			await updateProfile(formDataObject)
			toast({
				title: 'Profile updated',
				variant: 'success',
			})
			router.refresh()
		} catch (e) {
			console.error('Failed to update profile:', e)
			toast({
				title: 'Failed to update profile',
				variant: 'error',
			})
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
		<Form onSubmit={handleSubmit(onSubmit)} maxWidth="400px">
			<FormField>
				<Label htmlFor="name">Name</Label>
				<Input
					type="text"
					id="name"
					name="name"
					register={register}
					isInvalid={!!errors.name}
					placeholder={name}
					{...readOnlyProps(name)}
				/>
				{errors.name && (
					<ValidationMessage type="error">{`${errors.name.message}`}</ValidationMessage>
				)}
			</FormField>
			<FormField>
				<Label htmlFor="email">Email</Label>
				<Input
					type="email"
					id="email"
					name="email"
					isInvalid={false}
					placeholder={email}
					disabled={true}
				/>
			</FormField>
			{!isReadOnly && (
				<ButtonWrapper>
					<Button
						type="submit"
						variant="primary"
						text={isSubmitting ? 'Updating profile…' : 'Update profile'}
						disabled={isSubmitting}
					/>
					<DialogClose asChild>
						<Button type="submit" variant="secondary" text="Cancel" />
					</DialogClose>
				</ButtonWrapper>
			)}
		</Form>
	)
}

export { UpdateProfileForm }
