'use client'

import Link from 'next/link'
import { Text, Flex, LogoSymbol, Button } from 'cadence-core'
import { authClient } from '@/lib/auth/auth-client'
import styles from './app-header.module.css'

export function AppHeader() {
	const handleSignOut = async () => {
		// Clear local session
		await authClient.signOut()
		// Redirect to auth service end-session to clear the auth session too,
		// then redirect back to the sign-in page
		const authServiceUrl = process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'http://localhost:3002'
		const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'
		window.location.href = `${authServiceUrl}/sign-out?redirect_uri=${encodeURIComponent(appUrl)}`
	}

	return (
		<header className={styles.header}>
			<Link href="/dashboard" className={styles.logoLink}>
				<Flex
					direction='row'
					alignItems='center'
					gap="small"
				>
					<LogoSymbol width={32} />
					<Text
						type='expressive-headline'
						size='h6'
						tag='span'
						collapse
					>
						Cadence Links
					</Text>
				</Flex>
			</Link>
			<Button
				variant="secondary"
				size="small"
				onClick={handleSignOut}
			>
				Sign Out
			</Button>
		</header>
	)
}
