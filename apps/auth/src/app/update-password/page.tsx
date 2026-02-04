'use client'

import { UpdatePasswordForm } from '@/app/update-password/update-password-form'
import { Text } from 'cadence-core'
import { Link } from '@/components/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import s from './update-password.module.css'

function UpdatePasswordContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  // If there's no token, show error message
  if (!token) {
    return (
      <section className={s['update-password--wrapper']}>
        <div className={s['update-password--wrapper-inner']}>
          <Text tag="h1" type="expressive-headline" size="h4" color="brand" collapse>
            Invalid Reset Link
          </Text>
          <Text tag="p" type="productive-body" size="body-base" color="primary">
            This password reset link is invalid or has expired. Please request a new one.
          </Text>
        </div>
        <Link href="/forgot-password">Request new reset link</Link>
      </section>
    )
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

export default function UpdatePasswordPage() {
  return (
    <Suspense>
      <UpdatePasswordContent />
    </Suspense>
  )
}
