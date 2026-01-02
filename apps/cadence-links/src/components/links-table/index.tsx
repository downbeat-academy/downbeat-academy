'use client'

import {
	Text,
	Flex,
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
} from 'cadence-core'
import { LinkRow } from './link-row'
import type { Link } from '@/types/link'
import styles from './links-table.module.css'

interface LinksTableProps {
	links: Link[]
	onDelete: (id: string) => void
}

export function LinksTable({ links, onDelete }: LinksTableProps) {
	if (links.length === 0) {
		return (
			<Flex
				direction="column"
				alignItems="center"
				justifyContent="center"
				className={styles.empty}
			>
				<Text size="body-large" tag="p" color="faint">
					No links yet
				</Text>
				<Text size="body-base" tag="p" color="faint">
					Create your first shortened URL above
				</Text>
			</Flex>
		)
	}

	return (
		<Table>
			<TableHeader>
				<TableRow isHeader>
					<TableHead>Short URL</TableHead>
					<TableHead>Original URL</TableHead>
					<TableHead>Created</TableHead>
					<TableHead>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{links.map((link) => (
					<LinkRow key={link.id} link={link} onDelete={onDelete} />
				))}
			</TableBody>
		</Table>
	)
}
