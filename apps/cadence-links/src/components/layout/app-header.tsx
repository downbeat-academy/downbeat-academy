'use client'

import Link from 'next/link'
import { Text, Flex, LogoSymbol, Button } from 'cadence-core'
import { authClient } from '@/lib/auth/auth-client'
import styles from './app-header.module.css'

export function AppHeader() {
	const handleSignOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					window.location.href = '/sign-in'
				},
			},
		})
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
