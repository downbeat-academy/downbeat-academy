'use client'

import Error from 'next/error'
import posthog from 'posthog-js'
import { useEffect } from 'react'

export default function GlobalError({ error }) {
	useEffect(() => {
		// A no-op when PostHog has not initialised (local, preview).
		posthog.captureException(error)
	}, [error])

	return (
		<html>
			<body>
				<Error />
			</body>
		</html>
	)
}
