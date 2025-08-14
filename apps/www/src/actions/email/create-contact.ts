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

	// Ensure we have a valid audience ID
	const finalAudienceId = audienceId || process.env.RESEND_DEFAULT_AUDIENCE_ID
	
	if (!finalAudienceId) {
		throw new Error('No audience ID provided and RESEND_DEFAULT_AUDIENCE_ID not configured')
	}

	try {
		const { data } = await resend.contacts.create({
			email: email,
			audienceId: finalAudienceId,
			firstName: firstName,
			lastName: lastName,
			unsubscribed: false,
		})

		console.log(data)
	} catch (error) {
		throw new Error('Failed to create contact')
	}
}
