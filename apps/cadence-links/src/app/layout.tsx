import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
	title: 'Cadence Links - URL Shortener',
	description: 'URL shortener service for Downbeat Academy',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	)
}
