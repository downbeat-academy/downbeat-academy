'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Form, Field, Input, Label, ValidationMessage, Text, Flex } from 'cadence-core'
import { signIn } from '@/lib/auth/auth-client'
import styles from './sign-in.module.css'

const signInSchema = z.object({
	email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
	password: z.string().min(1, 'Password is required'),
})

type SignInFormData = z.infer<typeof signInSchema>

export default function SignInPage() {
	const router = useRouter()
	const [submitError, setSubmitError] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignInFormData>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (data: SignInFormData) => {
		setSubmitError(null)
		try {
			const result = await signIn.email({
				email: data.email,
				password: data.password,
			})

			if (result.error) {
				setSubmitError(result.error.message || 'Invalid email or password')
				return
			}

			router.push('/dashboard')
		} catch (error) {
			console.error('Sign in error:', error)
			setSubmitError('An unexpected error occurred. Please try again.')
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<Flex direction="column" gap="large">
					<div className={styles.header}>
						<Text size="h3" tag="h1">
							Sign In
						</Text>
						<Text size="body-base" tag="p" color="faint">
							Enter your credentials to access the dashboard
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
									placeholder="Enter your password"
									autoComplete="current-password"
									{...register('password')}
								/>
								{errors.password && (
									<ValidationMessage>{errors.password.message}</ValidationMessage>
								)}
							</Field>

							<Button
								type="submit"
								disabled={isSubmitting}
								text={isSubmitting ? 'Signing in...' : 'Sign In'}
							/>
						</Flex>
					</Form>

					<Text size="body-small" tag="p" color="faint" className={styles.footer}>
						Don&apos;t have an account?{' '}
						<Link href="/sign-up" className={styles.link}>
							Sign up
						</Link>
					</Text>
				</Flex>
			</div>
		</div>
	)
}
