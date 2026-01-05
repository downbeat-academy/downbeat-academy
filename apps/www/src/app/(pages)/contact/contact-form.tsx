'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	contactFormSchema,
	type TContactFormSchema,
} from '@lib/types/contact-form-schema'
import {
	Form,
	Field,
	Input,
	Textarea,
	ValidationMessage,
	Label,
} from 'cadence-core'
import { Button } from '@components/ui/button'
import { useToast } from '@components/toast'
import { sendEmail } from '@actions/email/send-email'
import s from './contact-form.module.css'

export function ContactForm() {
	const { toast } = useToast()

	// Use react-hook-form to handle the form
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<TContactFormSchema>({
		resolver: zodResolver(contactFormSchema),
	})

	const onSubmit = async (formData: TContactFormSchema) => {
		try {
			const contactFormObject = {
				name: formData.name || '',
				email: formData.email || '',
				message: formData.message || '',
			}
			await sendEmail(contactFormObject)
			toast({
				title: 'Message sent!',
				description: "Thank you for the note, we'll be in touch soon!",
				variant: 'success',
			})
			reset()
		} catch (e) {
			throw new Error('Failed to send email')
		}
	}

	return (
		<section className={s['contact-form']}>
			<Form name="contact-form" onSubmit={handleSubmit(onSubmit)}>
				<Field>
					<Label htmlFor="name">Name</Label>
					<Input
						register={register}
						type="text"
						name="name"
						data-testid="contact-name-input"
						placeholder="Name"
					/>
					{errors.name && (
						<ValidationMessage type="error">
							{`${errors.name.message}`}
						</ValidationMessage>
					)}
				</Field>
				<Field>
					<Label htmlFor="email">Email</Label>
					<Input
						register={register}
						type="email"
						name="email"
						data-testid="contact-email-input"
						placeholder="Email"
					/>
					{errors.email && (
						<ValidationMessage type="error">
							{`${errors.email.message}`}
						</ValidationMessage>
					)}
				</Field>
				<Field>
					<Label htmlFor="message">Message</Label>
					<Textarea register={register} name="message" data-testid="contact-message-input" placeholder="Message" />
					{errors.message && (
						<ValidationMessage type="error">
							{`${errors.message.message}`}
						</ValidationMessage>
					)}
				</Field>
				<Button
					type="submit"
					data-testid="contact-submit"
					disabled={isSubmitting}
				>
					{isSubmitting ? 'Sending...' : 'Send message'}
				</Button>
			</Form>
		</section>
	)
}
