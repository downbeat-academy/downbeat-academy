import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend'
import FileDownload from '../../../../../../../packages/email/emails/file-download'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  const { email, file, title } = await request.json()

  try {
    const data = await resend.emails.send({
      from: 'Downbeat Academy <hello@email.downbeatacademy.com>',
      to: email,
      subject: '🎼 Your download from Downbeat Academy is here!',
      react: FileDownload({ file: file, title: title }),
      reply_to: 'jory@downbeatacademy.com'
    })

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error })
  }
}

