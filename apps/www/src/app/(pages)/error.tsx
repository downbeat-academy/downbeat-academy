'use client'

import { Text } from '@components/text'
import { Link } from '@components/link'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Error | Downbeat Academy',
  description: 'Sorry, we ran into an issue.',
}

export default function Error() {
  return (
    <>
      <Text
        type='expressive-headline'
        size='h1'
        color='primary'
        collapse
      >Error</Text>
      <Text
        type='expressive-body'
        size='body-base'
        color='primary'
        collapse
      >Sorry, we ran into an issue 😞. Return to the <Link href='/'>home page?</Link></Text>
    </>
  )
}