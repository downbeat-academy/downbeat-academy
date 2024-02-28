'use server'

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function subscribeToNewsletter({ email }) {
  try {
    const { data } = await resend.contacts.create({
      email: email,
      unsubscribed: false,
      audienceId: process.env.RESEND_DEFAULT_AUDIENCE_ID
    })

    console.log(data)
  } catch (error) {
    throw new Error('Failed to subscribe to newsletter')
  }
}