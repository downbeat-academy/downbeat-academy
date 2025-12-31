'use client'

import { Text, Flex, LogoSymbol } from 'cadence-core'
import styles from './app-header.module.css'

export function AppHeader() {
	return (
		<header className={styles.header}>
			<Flex alignItems="center" gap="small">
				<LogoSymbol height={32} />
				<Text size="h6" tag="h1">
					Cadence Links
				</Text>
			</Flex>
		</header>
	)
}
