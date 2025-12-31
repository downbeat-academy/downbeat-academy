'use client'

import { useState } from 'react'
import { Button, Text, Flex } from 'cadence-core'
import styles from './success-message.module.css'

interface SuccessMessageProps {
	shortUrl: string
	onDismiss: () => void
}

export function SuccessMessage({ shortUrl, onDismiss }: SuccessMessageProps) {
	const [copied, setCopied] = useState(false)

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(shortUrl)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (error) {
			console.error('Failed to copy:', error)
		}
	}

	return (
		<div className={styles.container}>
			<Flex direction="column" gap="small">
				<Text variant="body-medium" color="primary">
					Link created successfully!
				</Text>
				<Flex align="center" gap="medium" className={styles.urlRow}>
					<code className={styles.url}>{shortUrl}</code>
					<Flex gap="small">
						<Button
							variant="secondary"
							size="small"
							onClick={handleCopy}
							text={copied ? 'Copied!' : 'Copy'}
						/>
						<Button
							variant="ghost"
							size="small"
							onClick={onDismiss}
							text="Dismiss"
						/>
					</Flex>
				</Flex>
			</Flex>
		</div>
	)
}
