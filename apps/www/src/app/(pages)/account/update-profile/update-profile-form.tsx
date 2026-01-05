'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	updateProfileSchema,
	TUpdateProfileSchema,
} from '@lib/types/profile/update-profile-schema'
import { updateProfile } from '@actions/profile/update-profile'
import { Button, ButtonWrapper } from '@components/ui/button'
import {
	Form,
	Field,
	Label,
	Input,
	ValidationMessage,
} from 'cadence-core'
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

	const readOnlyProps = (value: any) => {
		if (isReadOnly === true) {
			return {
				disabled: true,
				value: value,
			}
		}
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)} maxWidth="400px">
			<Field>
				<Label htmlFor="name">Name</Label>
				<Input
					type="text"
					id="name"
					name="name"
					data-testid="profile-name-input"
					register={register}
					isInvalid={!!errors.name}
					placeholder={name}
					{...readOnlyProps(name)}
				/>
				{errors.name && (
					<ValidationMessage type="error">{`${errors.name.message}`}</ValidationMessage>
				)}
			</Field>
			<Field>
				<Label htmlFor="email">Email</Label>
				<Input
					type="email"
					id="email"
					name="email"
					data-testid="profile-email-input"
					isInvalid={false}
					placeholder={email}
					disabled={true}
				/>
			</Field>
			{!isReadOnly && (
				<ButtonWrapper>
					<Button
						type="submit"
						data-testid="profile-update-submit"
						variant="primary"
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Updating profile…' : 'Update profile'}
					</Button>
					<DialogClose asChild>
						<Button type="submit" variant="secondary">Cancel</Button>
					</DialogClose>
				</ButtonWrapper>
			)}
		</Form>
	)
}

export { UpdateProfileForm }
