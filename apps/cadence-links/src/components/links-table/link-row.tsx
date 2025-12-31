'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Button, Text, Flex } from 'cadence-core'
import type { Link } from '@/types/link'
import styles from './links-table.module.css'

interface LinkRowProps {
	link: Link
	onDelete: (id: string) => void
}

export function LinkRow({ link, onDelete }: LinkRowProps) {
	const [isDeleting, setIsDeleting] = useState(false)
	const [copied, setCopied] = useState(false)

	const shortUrl = `${link.domain}/${link.shortCode}`

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(shortUrl)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (error) {
			console.error('Failed to copy:', error)
		}
	}

	const handleDelete = async () => {
		if (!confirm('Are you sure you want to delete this link?')) {
			return
		}

		setIsDeleting(true)
		try {
			await onDelete(link.id)
		} finally {
			setIsDeleting(false)
		}
	}

	const truncateUrl = (url: string, maxLength = 50) => {
		if (url.length <= maxLength) return url
		return `${url.substring(0, maxLength)}...`
	}

	return (
		<tr className={styles.row}>
			<td className={styles.cell}>
				<a
					href={shortUrl}
					target="_blank"
					rel="noopener noreferrer"
					className={styles.shortUrl}
				>
					{shortUrl.replace('https://', '')}
				</a>
			</td>
			<td className={styles.cell}>
				<Text
					size="body-small"
					color="faint"
					tag='p'
					title={link.originalUrl}
					className={styles.originalUrl}
				>
					{truncateUrl(link.originalUrl)}
				</Text>
			</td>
			<td className={styles.cell}>
				<Text size="body-small" tag='p' color="faint">
					{format(new Date(link.createdAt), 'MMM d, yyyy')}
				</Text>
			</td>
			<td className={styles.cell}>
				<Flex gap="small" direction='row'>
					<Button
						variant="secondary"
						size="small"
						onClick={handleCopy}
						text={copied ? 'Copied!' : 'Copy'}
					/>
					<Button
						variant="ghost"
						size="small"
						onClick={handleDelete}
						disabled={isDeleting}
						text={isDeleting ? 'Deleting...' : 'Delete'}
					/>
				</Flex>
			</td>
		</tr>
	)
}
