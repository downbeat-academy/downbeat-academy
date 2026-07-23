'use client'

import { useMemo, useState } from 'react'
import {
	DataTable,
	Badge,
	Flex,
	SectionContainer,
	createTextColumn,
	createCustomColumn,
	createActionsColumn,
	type ColumnDef,
} from 'cadence-core'
import type { Subscriber } from '@/lib/admin/types'
import { formatRelativeTime } from '@/lib/admin/format'
import { SubscriberActionsMenu } from './subscriber-actions-menu'
import {
	SubscribersFilterBar,
	type AddedFilter,
	type StatusFilter,
} from './subscribers-filter-bar'

type Props = {
	rows: Subscriber[]
}

const ADDED_WINDOW_DAYS: Record<Exclude<AddedFilter, 'all'>, number> = {
	'7d': 7,
	'30d': 30,
}

export function SubscribersTable({ rows }: Props) {
	const [query, setQuery] = useState('')
	const [status, setStatus] = useState<StatusFilter>('all')
	const [added, setAdded] = useState<AddedFilter>('all')
	// Anchored when the filter is chosen rather than read during render, so the
	// filtered set stays stable across re-renders.
	const [cutoff, setCutoff] = useState<number | null>(null)

	function handleAddedChange(value: AddedFilter) {
		setAdded(value)
		setCutoff(
			value === 'all'
				? null
				: Date.now() - ADDED_WINDOW_DAYS[value] * 24 * 60 * 60 * 1000
		)
	}

	const filteredRows = useMemo(() => {
		const term = query.trim().toLowerCase()

		return rows.filter((row) => {
			if (status === 'subscribed' && row.unsubscribed) return false
			if (status === 'unsubscribed' && !row.unsubscribed) return false
			if (cutoff !== null) {
				if (!row.createdAt) return false
				if (new Date(row.createdAt).getTime() < cutoff) return false
			}
			if (term) {
				const haystack = [row.email, row.firstName, row.lastName]
					.filter(Boolean)
					.join(' ')
					.toLowerCase()
				if (!haystack.includes(term)) return false
			}
			return true
		})
	}, [rows, query, status, cutoff])

	const columns = useMemo<ColumnDef<Subscriber, any>[]>(
		() => [
			createTextColumn<Subscriber>('email', 'Email'),
			createTextColumn<Subscriber>('firstName', 'First name'),
			createTextColumn<Subscriber>('lastName', 'Last name'),
			createCustomColumn<Subscriber, boolean>('unsubscribed', 'Status', (value) =>
				value ? (
					<Badge type="neutral" style="light" size="small" text="Unsubscribed" />
				) : (
					<Badge type="success" style="light" size="small" text="Subscribed" />
				)
			),
			createCustomColumn<Subscriber, Date | null>('createdAt', 'Added', (value) =>
				value ? <span>{formatRelativeTime(value)}</span> : <span>—</span>
			),
			createActionsColumn<Subscriber>('actions', (row) => (
				<SubscriberActionsMenu email={row.email} />
			)),
		],
		[]
	)

	const isFiltered = query.trim() !== '' || status !== 'all' || added !== 'all'

	return (
		<Flex direction="column" gap="medium">
			<SubscribersFilterBar
				query={query}
				onQueryChange={setQuery}
				status={status}
				onStatusChange={setStatus}
				added={added}
				onAddedChange={handleAddedChange}
			/>
			<SectionContainer background="primary">
				<DataTable
					data={filteredRows}
					columns={columns}
					sorting={{ enabled: true, defaultSorting: [{ id: 'createdAt', desc: true }] }}
					pagination={{ enabled: true, pageSize: 25, pageSizeOptions: [25, 50, 100] }}
					filtering={false}
					emptyState={{
						title: isFiltered
							? 'No subscribers match these filters'
							: 'No subscribers yet',
						description: isFiltered
							? 'Try clearing the search term or filters.'
							: 'Contacts added to your Resend audience will appear here.',
					}}
				/>
			</SectionContainer>
		</Flex>
	)
}
