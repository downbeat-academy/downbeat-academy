'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	newsletterSignupSchema,
	type TNewsletterSignupSchema,
} from '@lib/types/newsletter-signup-schema'
import { subscribeToNewsletter } from '@/actions/email/newsletter-subscription'
import {
	Form,
	Input,
	ValidationMessage,
	Label,
	FormField,
} from '@components/form'
import { Button } from '@components/ui/button'
import { useToast } from '@components/toast'

const NewsletterSignupForm = () => {
	const { toast } = useToast()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<TNewsletterSignupSchema>({
		resolver: zodResolver(newsletterSignupSchema),
	})

	const onSubmit = async (formData: TNewsletterSignupSchema) => {
		try {
			const newsletterSignupObject = {
				email: formData.email || '',
				firstName: '',
				lastName: '',
			}
			await subscribeToNewsletter(newsletterSignupObject)
			toast({
				title: 'Subscribed!',
				description: 'Thanks for signing up!',
				variant: 'success',
			})
			reset()
		} catch (error) {
			toast({
				title: 'Error!',
				description: 'Failed to subscribe',
				variant: 'error',
			})
		}
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormField>
				<Label>Email</Label>
				<Input
					register={register}
					type="email"
					name="email"
					placeholder="john@coltrane.com"
				/>
				{errors.email && (
					<ValidationMessage type="error">
						{`${errors.email.message}`}
					</ValidationMessage>
				)}
			</FormField>
			<Button
				type="submit"
				text={isSubmitting ? 'Signing you up...' : 'Subscribe'}
				variant="primary"
				size="medium"
				disabled={isSubmitting}
			/>
		</Form>
	)
}

export { NewsletterSignupForm }
