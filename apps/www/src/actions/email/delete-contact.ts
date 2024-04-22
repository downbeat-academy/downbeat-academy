'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function deleteContact({ email, audienceId }) {
	try {
		const deleteContact = await resend.contacts.remove({
			email: email,
			audienceId: audienceId || process.env.RESEND_DEFAULT_AUDIENCE_ID,
		})

		console.log(deleteContact)
	} catch (error) {
		throw new Error('Failed to delete contact')
	}
}
