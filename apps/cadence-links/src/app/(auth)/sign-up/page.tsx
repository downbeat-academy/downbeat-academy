'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Form, Field, Input, Label, ValidationMessage, Text, Flex } from 'cadence-core'
import { signUp } from '@/lib/auth/auth-client'
import styles from './sign-up.module.css'

const signUpSchema = z
	.object({
		name: z.string().min(1, 'Name is required'),
		email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
		password: z.string().min(8, 'Password must be at least 8 characters'),
		confirmPassword: z.string().min(1, 'Please confirm your password'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})

type SignUpFormData = z.infer<typeof signUpSchema>

export default function SignUpPage() {
	const router = useRouter()
	const [submitError, setSubmitError] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignUpFormData>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	})

	const onSubmit = async (data: SignUpFormData) => {
		setSubmitError(null)
		try {
			const result = await signUp.email({
				name: data.name,
				email: data.email,
				password: data.password,
			})

			if (result.error) {
				// Handle email not allowed error
				if (result.error.message?.includes('not allowed')) {
					setSubmitError('This email is not allowed. Contact an administrator for access.')
				} else {
					setSubmitError(result.error.message || 'Failed to create account')
				}
				return
			}

			router.push('/dashboard')
		} catch (error) {
			console.error('Sign up error:', error)
			setSubmitError('An unexpected error occurred. Please try again.')
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<Flex direction="column" gap="large">
					<div className={styles.header}>
						<Text size="h3" tag="h1">
							Create Account
						</Text>
						<Text size="body-base" tag="p" color="faint">
							Sign up to access the dashboard
						</Text>
					</div>

					<Form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
						{submitError && (
							<ValidationMessage className={styles.submitError}>
								{submitError}
							</ValidationMessage>
						)}

						<Flex direction="column" gap="medium">
							<Field>
								<Label htmlFor="name">Name</Label>
								<Input
									id="name"
									type="text"
									placeholder="Your name"
									autoComplete="name"
									{...register('name')}
								/>
								{errors.name && (
									<ValidationMessage>{errors.name.message}</ValidationMessage>
								)}
							</Field>

							<Field>
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="you@example.com"
									autoComplete="email"
									{...register('email')}
								/>
								{errors.email && (
									<ValidationMessage>{errors.email.message}</ValidationMessage>
								)}
							</Field>

							<Field>
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									type="password"
									placeholder="At least 8 characters"
									autoComplete="new-password"
									{...register('password')}
								/>
								{errors.password && (
									<ValidationMessage>{errors.password.message}</ValidationMessage>
								)}
							</Field>

							<Field>
								<Label htmlFor="confirmPassword">Confirm Password</Label>
								<Input
									id="confirmPassword"
									type="password"
									placeholder="Confirm your password"
									autoComplete="new-password"
									{...register('confirmPassword')}
								/>
								{errors.confirmPassword && (
									<ValidationMessage>{errors.confirmPassword.message}</ValidationMessage>
								)}
							</Field>

							<Button
								type="submit"
								disabled={isSubmitting}
								text={isSubmitting ? 'Creating account...' : 'Create Account'}
							/>
						</Flex>
					</Form>

					<Text size="body-small" tag="p" color="faint" className={styles.footer}>
						Already have an account?{' '}
						<Link href="/sign-in" className={styles.link}>
							Sign in
						</Link>
					</Text>
				</Flex>
			</div>
		</div>
	)
}
