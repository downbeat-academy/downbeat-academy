'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Form,
	FormField,
	Input,
	Label,
	ValidationMessage,
} from '@components/form'
import { Button } from '@components/button'
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
			<Button
				type="submit"
				variant="primary"
				text={isSubmitting ? 'Is signing you up...' : 'Subscribe'}
				disabled={isSubmitting}
			/>
		</Form>
	)
}

export { NewsletterSubscriptionForm }
