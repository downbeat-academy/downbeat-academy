'use client'

import NextLink from 'next/link'
import { Text, Link } from 'cadence-core'

import type { Metadata } from 'next'
import { Button } from '@components/ui/button'

export const metadata: Metadata = {
	title: 'Error | Downbeat Academy',
	description: 'Sorry, we ran into an issue.',
}

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	console.log(error)

	return (
		<>
			<Text type="expressive-headline" size="h1" color="primary" collapse>
				Error
			</Text>
			<Text type="expressive-body" size="body-base" color="primary" collapse>
				Sorry, we ran into an issue 😞. Return to the{' '}
				<Link as={NextLink} href="/">home page?</Link>
			</Text>
			<Button onClick={() => reset()} variant="primary">Reset</Button>
		</>
	)
}
