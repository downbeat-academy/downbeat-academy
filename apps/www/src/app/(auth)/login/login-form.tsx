'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	loginSchema,
	type TLoginFormSchema,
} from '@lib/types/auth/login-form-schema'
import {
	Form,
	FormField,
	Label,
	Input,
	ValidationMessage,
} from '@components/form'
import { Button, ButtonWrapper } from '@components/button'
import { login } from '@actions/auth/login'
import { useToast } from '@components/toast'

export function LoginForm() {
	const { toast } = useToast()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<TLoginFormSchema>({
		resolver: zodResolver(loginSchema),
	})

	const onSubmit = async (formData: TLoginFormSchema) => {
		try {
			const formDataObject = {
				email: formData.email || '',
				password: formData.password || '',
			}
			await login(formDataObject)
		} catch (e) {
			console.log(e)
			toast({
				title: 'Login failed',
				variant: 'error',
			})
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
			<ButtonWrapper>
				<Button
					type="submit"
					variant="primary"
					text={isSubmitting ? '🎵 Logging you in…' : 'Login'}
					disabled={isSubmitting}
				/>
			</ButtonWrapper>
		</Form>
	)
}
