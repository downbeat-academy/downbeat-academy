'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function subscribeToNewsletter({ email }: { email: string }) {
	const audienceId = process.env.RESEND_DEFAULT_AUDIENCE_ID
	
	if (!audienceId) {
		throw new Error('RESEND_DEFAULT_AUDIENCE_ID not configured')
	}

	try {
		const { data } = await resend.contacts.create({
			email: email,
			unsubscribed: false,
			audienceId: audienceId,
		})

		console.log(data)
	} catch (error) {
		throw new Error('Failed to subscribe to newsletter')
	}
}
