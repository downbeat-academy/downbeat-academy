'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * Deletes the contact from the Resend account. Contacts are global since Resend
 * replaced Audiences with Segments, so this removes them from every segment.
 */
export async function deleteContact({ email }: { email: string }) {
	try {
		// Resend reports API failures in `error` rather than throwing.
		const { data, error } = await resend.contacts.remove({ email: email })
		if (error) throw error

		console.log(data)
	} catch (error) {
		console.error('deleteContact: Resend contacts.remove failed', error)
		throw new Error('Failed to delete contact')
	}
}
