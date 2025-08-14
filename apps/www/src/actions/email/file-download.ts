'use server'

import { Resend } from 'resend'
import FileDownload from '../../../../../packages/email/emails/file-download'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendFileDownload({ 
	email, 
	file, 
	title 
}: { 
	email: string
	file: string
	title: string 
}) {
	try {
		const { data } = await resend.emails.send({
			from: 'Downbeat Academy <hello@email.downbeatacademy.com>',
			to: email,
			subject: '🎼 Your download from Downbeat Academy is here!',
			react: FileDownload({ file: file, title: title }),
			replyTo: 'jory@downbeatacademy.com',
		})

		console.log(data)
	} catch (error) {
		throw new Error('Failed to send email')
	}
}
