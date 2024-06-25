import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
	const { email, audienceId } = await request.json()

	try {
		const unsubscribeContact = await resend.contacts.create({
			email: email,
			audienceId: audienceId || process.env.RESEND_DEFAULT_AUDIENCE_ID,
			unsubscribed: true,
		})

		return NextResponse.json(unsubscribeContact)
	} catch (error) {
		return NextResponse.json({ error })
	}
}
