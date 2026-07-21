'use client'

import { Banner, BannerContent, BannerActions, Button, Text } from 'cadence-core'

export default function AdminError({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	return (
		<Banner type="tertiary">
			<BannerContent>
				<Text type="productive-headline" size="h5" collapse>
					Something went wrong loading the admin dashboard
				</Text>
				<Text type="productive-body" size="body-small" color="faint" collapse>
					{error.message}
				</Text>
			</BannerContent>
			<BannerActions>
				<Button onClick={reset}>Try again</Button>
			</BannerActions>
		</Banner>
	)
}
