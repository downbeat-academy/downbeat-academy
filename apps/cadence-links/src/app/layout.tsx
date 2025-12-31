import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
	title: 'Cadence Links - URL Shortener',
	description: 'URL shortener service for Downbeat Academy',
	icons: {
		icon: [
			{ url: '/favicon/favicon.ico', sizes: 'any' },
			{ url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
		],
		apple: [
			{ url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
		],
	},
	manifest: '/favicon/site.webmanifest',
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
