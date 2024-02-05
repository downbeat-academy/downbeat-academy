import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend'
import ContactFormEmail from '../../../../../../packages/email/emails/contact-form'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json()

  try {
    const data = await resend.emails.send({
      from: 'Downbeat Academy <hello@email.downbeatacademy.com>',
      to: 'jory@downbeatacademy.com',
      subject: `${name} sent you a message from the Downbeat Academy contact form`,
      // html: message,
      react: ContactFormEmail({ name: name, email: email, message: message }),
      reply_to: email
    })

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error })
  }
}