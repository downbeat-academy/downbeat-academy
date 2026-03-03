import { Metadata } from "next"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@lib/auth/auth"
import NextLink from 'next/link'
import { Text, Link } from 'cadence-core'
import { ForgotPasswordForm } from "./forgot-password-form"
import s from './forgot-password.module.css'

export const metadata: Metadata = {
  title: 'Reset Password 🎵 Downbeat Academy',
  description: 'Reset your Downbeat Academy password.'
}

export default async function ForgotPassword() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (session) {
    redirect('/account')
  }

  return (
    <section className={s['forgot-password--wrapper']}>
      <div className={s['forgot-password--wrapper-inner']}>
        <Text type="expressive-headline" size="h4" tag="h1" color="brand" collapse>
          Reset your password
        </Text>
        <Text type="productive-body" size="body-base" color="primary">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </Text>
        <ForgotPasswordForm />
      </div>
      <Link as={NextLink} href="/sign-in">Back to sign in</Link>
    </section>
  )
} 