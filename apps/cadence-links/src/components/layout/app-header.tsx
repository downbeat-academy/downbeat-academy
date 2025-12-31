'use client'

import { useRouter } from 'next/navigation'
import { Text, Flex, LogoSymbol, Button } from 'cadence-core'
import { signOut } from '@/lib/auth/auth-client'
import styles from './app-header.module.css'

export function AppHeader() {
	const router = useRouter()

	const handleSignOut = async () => {
		await signOut()
		router.push('/sign-in')
	}

	return (
		<header className={styles.header}>
			<Flex alignItems="center" gap="small">
				<LogoSymbol height={32} />
				<Text size="h6" tag="h1">
					Cadence Links
				</Text>
			</Flex>
			<Button
				variant="secondary"
				size="small"
				text="Sign Out"
				onClick={handleSignOut}
			/>
		</header>
	)
}
