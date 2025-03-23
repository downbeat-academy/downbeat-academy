'use client'

import { UpdatePasswordForm } from '@/app/(auth)/update-password/update-password-form'
import { Text } from 'cadence-core'
import { Link } from '@components/link'
import s from './update-password.module.scss'

export default function UpdatePasswordPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const token = searchParams.token as string

  // If there's no token, we'll handle the redirect in the form
  if (!token) {
    return null
  }

  return (
    <section className={s['update-password--wrapper']}>
      <div className={s['update-password--wrapper-inner']}>
        <Text tag="h1" type="expressive-headline" size="h4" color="brand" collapse>
          Reset Your Password
        </Text>
        <Text tag="p" type="productive-body" size="body-base" color="primary">
          Enter your new password below to reset it.
        </Text>
        <UpdatePasswordForm token={token} />
      </div>
      <Link href="/sign-in">Back to sign in</Link>
    </section>
  )
} 