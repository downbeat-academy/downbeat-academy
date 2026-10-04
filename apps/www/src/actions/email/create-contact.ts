'use server'

import { Resend } from 'resend'

export type ContactFormData = {
	firstName: string
	lastName: string
	email: string
	segmentId?: string
}

export async function createContact({
	firstName,
	lastName,
	email,
	segmentId,
}: ContactFormData) {
	const resend = new Resend(process.env.RESEND_API_KEY)

	// Ensure we have a valid segment ID
	const finalSegmentId = segmentId || process.env.RESEND_SEGMENT_ID

	if (!finalSegmentId) {
		throw new Error('No segment ID provided and RESEND_SEGMENT_ID not configured')
	}

	try {
		// Resend reports API failures in `error` rather than throwing.
		const { data, error } = await resend.contacts.create({
			email: email,
			firstName: firstName,
			lastName: lastName,
			unsubscribed: false,
			segments: [{ id: finalSegmentId }],
		})
		if (error) throw error

		console.log(data)
	} catch (error) {
		console.error('createContact: Resend contacts.create failed', error)
		throw new Error('Failed to create contact')
	}
}
