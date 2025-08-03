'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	fileDownloadSchema,
	type TFileDownloadSchema,
} from '@lib/types/file-download-schema'
import { sendFileDownload } from '@actions/email/file-download'
import { createContact } from '@actions/email/create-contact'
import {
	Form,
	Input,
	ValidationMessage,
	Label,
	Field,
} from 'cadence-core'
import { Button } from '@components/ui/button'
import { useToast } from '@components/toast'

const FileDownloadForm = ({ fileUrl, title }) => {
	const { toast } = useToast()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<TFileDownloadSchema>({
		resolver: zodResolver(fileDownloadSchema),
	})

	const onSubmit = async (formData: TFileDownloadSchema) => {
		try {
			const fileDownloadObject = {
				email: formData.email || '',
				file: fileUrl,
				title: title,
			}

			const createContactObject = {
				email: formData.email || '',
				firstName: '',
				lastName: '',
			}
			// Send the email
			await sendFileDownload(fileDownloadObject)
			// Subscribe the user to the mailing list
			await createContact(createContactObject)
			toast({
				title: 'File sent!',
				description: 'Check your inbox for the file you requested!',
				variant: 'success',
			})
			reset()
		} catch (e) {
			throw new Error('Failed to send email')
		}
	}

	return (
		<Form name="file-download-form" onSubmit={handleSubmit(onSubmit)}>
			<Field>
				<Label htmlFor="email">Email</Label>
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
			</Field>
			<Button
				type="submit"
				text={isSubmitting ? 'Landing in your inbox...' : 'Show me the files!'}
				disabled={isSubmitting}
			/>
		</Form>
	)
}

export { FileDownloadForm }
