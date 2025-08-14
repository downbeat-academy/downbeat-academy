'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function deleteContact({ 
	email, 
	audienceId 
}: { 
	email: string
	audienceId?: string 
}) {
	// Ensure we have a valid audience ID
	const finalAudienceId = audienceId || process.env.RESEND_DEFAULT_AUDIENCE_ID
	
	if (!finalAudienceId) {
		throw new Error('No audience ID provided and RESEND_DEFAULT_AUDIENCE_ID not configured')
	}

	try {
		const deleteContact = await resend.contacts.remove({
			email: email,
			audienceId: finalAudienceId,
		})

		console.log(deleteContact)
	} catch (error) {
		throw new Error('Failed to delete contact')
	}
}
