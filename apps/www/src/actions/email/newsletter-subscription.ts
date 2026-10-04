'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function subscribeToNewsletter({ email }: { email: string }) {
	const segmentId = process.env.RESEND_SEGMENT_ID

	if (!segmentId) {
		throw new Error('RESEND_SEGMENT_ID not configured')
	}

	try {
		// Resend reports API failures in `error` rather than throwing, so it must be
		// checked explicitly — otherwise a failed call reads as a successful subscribe.
		const { data, error } = await resend.contacts.create({
			email: email,
			unsubscribed: false,
			segments: [{ id: segmentId }],
		})
		if (error) throw error

		console.log(data)
	} catch (error) {
		console.error('subscribeToNewsletter: Resend contacts.create failed', error)
		throw new Error('Failed to subscribe to newsletter')
	}
}
