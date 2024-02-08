import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { firstName, lastName, email, audienceId } = await request.json();

  try {
    const createContact = await resend.contacts.create({
      email: email,
      audienceId: audienceId || process.env.RESEND_DEFAULT_AUDIENCE_ID,
      firstName: firstName,
      lastName: lastName,
      unsubscribed: false,
    })

    return NextResponse.json(createContact)
  } catch (error) {
    return NextResponse.json({ error })
  }
}