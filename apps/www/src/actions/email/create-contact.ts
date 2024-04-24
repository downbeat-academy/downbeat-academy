'use server'

import { Resend } from 'resend'

export type ContactFormData = {
	firstName: string
	lastName: string
	email: string
	audienceId?: string
}

export async function createContact({
	firstName,
	lastName,
	email,
	audienceId,
}: ContactFormData) {
	const resend = new Resend(process.env.RESEND_API_KEY)

	try {
		const { data } = await resend.contacts.create({
			email: email,
			audienceId: audienceId || process.env.RESEND_DEFAULT_AUDIENCE_ID,
			firstName: firstName,
			lastName: lastName,
			unsubscribed: false,
		})

		console.log(data)
	} catch (error) {
		throw new Error('Failed to create contact')
	}
}
