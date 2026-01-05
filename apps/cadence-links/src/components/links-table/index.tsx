'use client'

import { useState, useMemo } from 'react'
import { format } from 'date-fns'
import {
	Text,
	Flex,
	Button,
	DataTable,
	createCustomColumn,
	createDisplayColumn,
	createActionsColumn,
} from 'cadence-core'
import type { Link } from '@/types/link'
import styles from './links-table.module.css'

interface LinksTableProps {
	links: Link[]
	onDelete: (id: string) => void
}

function ShortUrlCell({ link }: { link: Link }) {
	const shortUrl = `${link.domain}/${link.shortCode}`

	return (
		<a href={shortUrl} target="_blank" rel="noopener noreferrer">
			{shortUrl.replace('https://', '')}
		</a>
	)
}

function OriginalUrlCell({ url }: { url: string }) {
	const truncateUrl = (url: string, maxLength = 50) => {
		if (url.length <= maxLength) return url
		return `${url.substring(0, maxLength)}...`
	}

	return (
		<Text size="body-small" color="faint" tag="p" title={url}>
			{truncateUrl(url)}
		</Text>
	)
}

function ActionsCell({ link, onDelete }: { link: Link; onDelete: (id: string) => void }) {
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

	return (
		<Flex gap="small" direction="row" justifyContent="end">
			<Button
				variant="secondary"
				size="small"
				onClick={handleCopy}
			>
				{copied ? 'Copied!' : 'Copy'}
			</Button>
			<Button
				variant="ghost"
				size="small"
				onClick={handleDelete}
				disabled={isDeleting}
			>
				{isDeleting ? 'Deleting...' : 'Delete'}
			</Button>
		</Flex>
	)
}

export function LinksTable({ links, onDelete }: LinksTableProps) {
	const columns = useMemo(
		() => [
			createDisplayColumn<Link>('shortUrl', 'Short URL', (row) => (
				<ShortUrlCell link={row} />
			)),
			createCustomColumn<Link, string>('originalUrl', 'Original URL', (url) => (
				<OriginalUrlCell url={url} />
			)),
			createCustomColumn<Link, Date>('createdAt', 'Created', (date) => (
				<Text size="body-small" tag="p" color="faint">
					{format(new Date(date), 'MMM d, yyyy')}
				</Text>
			)),
			createActionsColumn<Link>('actions', (row) => (
				<ActionsCell link={row} onDelete={onDelete} />
			)),
		],
		[onDelete]
	)

	return (
		<DataTable
			data={links}
			columns={columns}
			isStriped={true}
			contained={true}
			emptyState={{
				title: 'No links yet',
				description: 'Create your first shortened URL above',
			}}
			className={styles.table}
		/>
	)
}
