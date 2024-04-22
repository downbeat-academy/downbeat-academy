'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	updatePasswordSchema,
	TUpdatePasswordSchema,
} from '@lib/types/auth/update-password-schema'
import { updatePassword } from '@actions/auth/update-password'
import { logout } from '@actions/auth/logout'
import {
	Form,
	FormField,
	Label,
	Input,
	ValidationMessage,
} from '@components/form'
import { Button, ButtonWrapper } from '@components/button'
import { useToast } from '@components/toast'
import { DialogClose } from '@components/dialog'

const UpdatePasswordForm = () => {
	const { toast } = useToast()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<TUpdatePasswordSchema>({
		resolver: zodResolver(updatePasswordSchema),
	})

	const onSubmit = async (formData: TUpdatePasswordSchema) => {
		try {
			const formDataObject = {
				newPassword: formData.newPassword || '',
			}
			await updatePassword(formDataObject)
			toast({
				title: 'Password updated',
				description: 'Login with your new password.',
				variant: 'success',
			})
			await logout()
		} catch (e) {
			console.log(e)
			toast({
				title: 'Failed to update password',
				variant: 'error',
			})
			throw new Error('Failed to update password')
		}
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormField>
				<Label htmlFor="newPassword">New password</Label>
				<Input
					type="password"
					id="newPassword"
					name="newPassword"
					register={register}
					isInvalid={!!errors.newPassword}
				/>
				{errors.newPassword && (
					<ValidationMessage type="error">{`${errors.newPassword.message}`}</ValidationMessage>
				)}
			</FormField>
			<FormField>
				<Label htmlFor="confirmNewPassword">Confirm new password</Label>
				<Input
					type="password"
					id="confirmNewPassword"
					name="confirmNewPassword"
					register={register}
					isInvalid={!!errors.confirmNewPassword}
				/>
				{errors.confirmNewPassword && (
					<ValidationMessage type="error">{`${errors.confirmNewPassword.message}`}</ValidationMessage>
				)}
			</FormField>
			<ButtonWrapper>
				<Button
					type="submit"
					variant="primary"
					disabled={isSubmitting}
					text={isSubmitting ? 'Updating...' : 'Update Password'}
				/>
				<DialogClose asChild>
					<Button variant="secondary" text="Cancel" />
				</DialogClose>
			</ButtonWrapper>
		</Form>
	)
}

export { UpdatePasswordForm }
