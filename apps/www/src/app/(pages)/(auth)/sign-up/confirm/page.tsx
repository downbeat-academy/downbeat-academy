import { Text } from '@components/text'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Confirm your email | Downbeat Academy',
  description: 'Confirm your email to activate your account on Downbeat Academy.',
}

export default async function AccountPage() {

  return (
    <Text
      tag='p'
      type='expressive-body'
      size='body-base'
      color='primary'
      collapse
    >Check your email to confirm your account.</Text>
  )
}