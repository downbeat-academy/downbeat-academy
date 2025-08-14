'use client'

import { useForm } from 'react-hook-form'
import { useQueryState } from 'nuqs'
import {
	Form,
	Field,
	Input,
	Label,
	ValidationMessage,
} from 'cadence-core'
import { Button } from '@components/ui/button'
import { useToast } from '@components/toast'
import { deleteContact } from '@actions/email/delete-contact'

export function UnsubscribeForm() {
	const [email, setEmail] = useQueryState('email')
	const { toast } = useToast()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm({
		defaultValues: {
			email: email || '',
		},
	})

	const onSubmit = async (formData: any) => {
		try {
			await deleteContact({
				email: formData.email,
				// audienceId is optional - server action will use default
			})
			toast({
				title: 'Unsubscribed',
				description: 'You have been unsubscribed from our newsletter.',
				variant: 'success',
			})
			reset()
		} catch (e) {
			console.log(e)
			throw new Error('Failed to unsubscribe')
		}
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Field>
				<Label htmlFor="email">Email</Label>
				<Input
					type="email"
					register={register}
					name="email"
					placeholder="john@coltrane.com"
					onChange={(e) => setEmail(e.target.value)}
				/>
				{errors.email && (
					<ValidationMessage>{`${errors.email.message}`}</ValidationMessage>
				)}
			</Field>
			<Button
				type="submit"
				disabled={isSubmitting}
				text={isSubmitting ? 'See you later 👋' : 'Unsubscribe'}
			/>
		</Form>
	)
}
