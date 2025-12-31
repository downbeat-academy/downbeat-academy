'use client'

import { Text, Flex } from 'cadence-core'
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
				align="center"
				justify="center"
				className={styles.empty}
			>
				<Text variant="body-large" color="secondary">
					No links yet
				</Text>
				<Text variant="body-medium" color="tertiary">
					Create your first shortened URL above
				</Text>
			</Flex>
		)
	}

	return (
		<div className={styles.wrapper}>
			<table className={styles.table}>
				<thead>
					<tr className={styles.headerRow}>
						<th className={styles.headerCell}>Short URL</th>
						<th className={styles.headerCell}>Original URL</th>
						<th className={styles.headerCell}>Created</th>
						<th className={styles.headerCell}>Actions</th>
					</tr>
				</thead>
				<tbody>
					{links.map((link) => (
						<LinkRow key={link.id} link={link} onDelete={onDelete} />
					))}
				</tbody>
			</table>
		</div>
	)
}
