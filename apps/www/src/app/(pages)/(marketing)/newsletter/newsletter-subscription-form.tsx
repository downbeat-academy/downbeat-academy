'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Form,
	Field,
	Input,
	Label,
	ValidationMessage,
} from 'cadence-core'
import { Button } from '@components/ui/button'
import { useToast } from '@components/toast'
import { subscribeToNewsletter } from '@actions/email/newsletter-subscription'
import {
	subscribeToNewsletterSchema,
	TSubscribeToNewsletterSchema,
} from '@lib/types/email/subscribe-to-newsletter-schema'

const NewsletterSubscriptionForm = () => {
	const { toast } = useToast()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<TSubscribeToNewsletterSchema>({
		resolver: zodResolver(subscribeToNewsletterSchema),
	})

	const onSubmit = async (formData: TSubscribeToNewsletterSchema) => {
		try {
			const formDataObject = {
				email: formData.email || '',
			}
			await subscribeToNewsletter(formDataObject)
			toast({
				title: 'Subscribed to newsletter',
				description: 'Check your inbox for a confirmation email.',
				variant: 'success',
			})
		} catch (e) {
			console.log(e)
			toast({
				title: 'Failed to subscribe to newsletter',
				variant: 'error',
			})
			throw new Error('Failed to subscribe to newsletter')
		}
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Field>
				<Label htmlFor="email">Email</Label>
				<Input
					type="email"
					id="email"
					name="email"
					register={register}
					isInvalid={!!errors.email}
					data-testid="newsletter-email-input"
				/>
				{errors.email && (
					<ValidationMessage type="error">{`${errors.email.message}`}</ValidationMessage>
				)}
			</Field>
			<Button
				type="submit"
				variant="primary"
				text={isSubmitting ? 'Is signing you up...' : 'Subscribe'}
				disabled={isSubmitting}
				data-testid="newsletter-submit"
			/>
		</Form>
	)
}

export { NewsletterSubscriptionForm }
