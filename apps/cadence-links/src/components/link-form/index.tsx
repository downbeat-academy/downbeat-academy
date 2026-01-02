'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
	Button,
	Form,
	Field,
	Input,
	Label,
	ValidationMessage,
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
} from 'cadence-core'
import { AVAILABLE_DOMAINS, DEFAULT_DOMAIN } from '@lib/constants/domains'
import type { CreateLinkResponse, ErrorResponse } from '@/types/link'
import styles from './link-form.module.css'

const linkFormSchema = z.object({
	url: z.string().min(1, 'URL is required').url('Please enter a valid URL'),
	domain: z.enum(AVAILABLE_DOMAINS as unknown as [string, ...string[]]),
})

type LinkFormData = z.infer<typeof linkFormSchema>

interface LinkFormProps {
	onSuccess: (response: CreateLinkResponse) => void
}

export function LinkForm({ onSuccess }: LinkFormProps) {
	const [submitError, setSubmitError] = useState<string | null>(null)
	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors, isSubmitting },
	} = useForm<LinkFormData>({
		resolver: zodResolver(linkFormSchema),
		defaultValues: {
			url: '',
			domain: DEFAULT_DOMAIN,
		},
	})

	const onSubmit = async (data: LinkFormData) => {
		setSubmitError(null)
		try {
			const response = await fetch('/api/links', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})

			const result = (await response.json()) as CreateLinkResponse | ErrorResponse

			if (!result.success) {
				setSubmitError(result.error)
				return
			}

			reset()
			onSuccess(result)
		} catch (error) {
			console.error('Failed to create link:', error)
			setSubmitError('An unexpected error occurred. Please try again.')
		}
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			{submitError && (
				<ValidationMessage className={styles.submitError}>
					{submitError}
				</ValidationMessage>
			)}
			<div className={styles.fields}>
				<Field className={styles.urlField}>
					<Label htmlFor="url">URL to shorten</Label>
					<Input
						id="url"
						type="url"
						placeholder="https://example.com/long-url"
						{...register('url')}
					/>
					{errors.url && (
						<ValidationMessage>{errors.url.message}</ValidationMessage>
					)}
				</Field>

				<Field className={styles.domainField}>
					<Label htmlFor="domain">Short domain</Label>
					<Controller
						name="domain"
						control={control}
						render={({ field }) => (
							<Select
								value={field.value}
								onValueChange={field.onChange}
							>
								<SelectTrigger
									id="domain"
									placeholder="Select domain"
									isInvalid={!!errors.domain}
								/>
								<SelectContent>
									{AVAILABLE_DOMAINS.map((domain) => (
										<SelectItem key={domain} value={domain}>
											{domain.replace('https://', '')}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
					/>
					{errors.domain && (
						<ValidationMessage>{errors.domain.message}</ValidationMessage>
					)}
				</Field>

				<div className={styles.buttonWrapper}>
					<Button type="submit" disabled={isSubmitting} text={isSubmitting ? `Creating...` : 'Shorten URL'} />
				</div>
			</div>
		</Form>
	)
}
