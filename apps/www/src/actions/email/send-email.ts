'use server'

import { Resend } from 'resend'
import ContactFormEmail from '../../../../../packages/email/emails/contact-form'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail({ name, email, message }) {
	try {
		const { data } = await resend.emails.send({
			from: 'Downbeat Academy <hello@email.downbeatacademy.com>',
			to: 'jory@downbeatacademy.com',
			subject: `${name} sent you a message from the Downbeat Academy contact form`,
			react: ContactFormEmail({ name: name, email: email, message: message }),
			replyTo: email,
		})

		console.log(data)
	} catch (error) {
		throw new Error('Failed to send email')
	}
}
