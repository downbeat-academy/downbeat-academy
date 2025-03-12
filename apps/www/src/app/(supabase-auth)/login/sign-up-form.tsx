'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	signUpSchema,
	type TSignUpFormSchema,
} from '@lib/types/auth/sign-up-form-schema'
import {
	Form,
	FormField,
	Label,
	Input,
	ValidationMessage,
} from '@components/form'
import { Button, ButtonWrapper } from '@components/button'
import { useToast } from '@components/toast'
import { signup } from '@actions/supabase-auth/sign-up'
import { createContact } from '@actions/email/create-contact'

export function SignUpForm() {
	const { toast } = useToast()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<TSignUpFormSchema>({
		resolver: zodResolver(signUpSchema),
	})

	const onSubmit = async (formData: TSignUpFormSchema) => {
		try {
			// Create/define what the data should look like
			const formDataObject = {
				email: formData.email || '',
				password: formData.password || '',
				confirmPassword: formData.confirmPassword || '',
			}

			const createContactObject = {
				email: formData.email || '',
				firstName: '',
				lastName: '',
			}

			// Call the signup function and pass the data
			await signup(formDataObject)
			// Create a contact from the signup
			// Display a toast to the user when the data has been passed to the form
			toast({
				title: 'Account created!',
				description: 'Confirm your email to activate your account.',
				variant: 'success',
				duration: 5000,
				direction: 'from-bottom',
			})
			await createContact(createContactObject)

			// Reset the form
			reset()
		} catch (e) {
			console.log(e)
			throw new Error('Failed to sign up')
		}
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormField>
				<Label htmlFor="email">Email</Label>
				<Input
					type="email"
					id="email"
					name="email"
					register={register}
					isInvalid={!!errors.email}
				/>
				{errors.email && (
					<ValidationMessage type="error">{`${errors.email.message}`}</ValidationMessage>
				)}
			</FormField>
			<FormField>
				<Label htmlFor="password">Password</Label>
				<Input
					type="password"
					id="password"
					name="password"
					register={register}
					isInvalid={!!errors.password}
				/>
				{errors.password && (
					<ValidationMessage type="error">{`${errors.password.message}`}</ValidationMessage>
				)}
			</FormField>
			<FormField>
				<Label htmlFor="confirmPassword">Confirm password</Label>
				<Input
					type="password"
					id="confirmPassword"
					name="confirmPassword"
					register={register}
					isInvalid={!!errors.confirmPassword}
				/>
				{errors.confirmPassword && (
					<ValidationMessage type="error">{`${errors.confirmPassword.message}`}</ValidationMessage>
				)}
			</FormField>
			<ButtonWrapper>
				<Button
					type="submit"
					variant="primary"
					text={isSubmitting ? '🤘 Signing you up…' : 'Sign up'}
					disabled={isSubmitting}
				/>
			</ButtonWrapper>
		</Form>
	)
}
