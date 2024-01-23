import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json()

  try {
    const data = await resend.emails.send({
      from: 'Website contact form <hello@email.downbeatacademy.com>',
      to: 'jory@downbeatacademy.com',
      subject: `${name} sent you a message from your website`,
      html: '<h1>Hello test world</h1>',
      reply_to: email
    })

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error })
  }
}