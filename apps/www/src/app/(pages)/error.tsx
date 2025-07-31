'use client'

import { Text } from 'cadence-core'
import { Link } from '@components/link'

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
				<Link href="/">home page?</Link>
			</Text>
			<Button onClick={() => reset()} text="Reset" variant="primary" />
		</>
	)
}
