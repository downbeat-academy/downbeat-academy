import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  const { email, file } = await request.json()

  try {
    const data = await resend.emails.send({
      from: 'Downbeat Academy <hello@email.downbeatacademy.com>',
      to: email,
      subject: '🎼 Your download from Downbeat Academy is here!',
      html: `Your download is ready! <a href="${file}">Click here to download</a>`
    })

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error })
  }
}