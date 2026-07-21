'use client'

import { useMemo } from 'react'
import {
	DataTable,
	Badge,
	createTextColumn,
	createCustomColumn,
	createActionsColumn,
	type ColumnDef,
} from 'cadence-core'
import type { Subscriber } from '@/lib/admin/types'
import { formatRelativeTime } from '@/lib/admin/format'
import { SubscriberActionsMenu } from './subscriber-actions-menu'

type Props = {
	rows: Subscriber[]
}

export function SubscribersTable({ rows }: Props) {
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

	return (
		<DataTable
			data={rows}
			columns={columns}
			isStriped
			sorting={{ enabled: true, defaultSorting: [{ id: 'createdAt', desc: true }] }}
			pagination={{ enabled: true, pageSize: 25, pageSizeOptions: [25, 50, 100] }}
			filtering={{ enabled: true, placeholder: 'Filter by email or name' }}
			emptyState={{
				title: 'No subscribers yet',
				description: 'Contacts added to your Resend audience will appear here.',
			}}
		/>
	)
}
