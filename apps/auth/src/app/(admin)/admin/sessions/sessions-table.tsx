'use client'

import {
	DataTable,
	createTextColumn,
	createCustomColumn,
} from 'cadence-core'

interface SessionRow {
	id: string
	userName: string
	userEmail: string
	ipAddress: string | null
	userAgent: string | null
	createdAt: string
	expiresAt: string
}

const columns = [
	createTextColumn<SessionRow>('userName', 'User'),
	createTextColumn<SessionRow>('userEmail', 'Email'),
	createTextColumn<SessionRow>('ipAddress', 'IP Address'),
	createCustomColumn<SessionRow, string | null>('userAgent', 'User Agent', (value) => {
		if (!value) return '—'
		return value.length > 60 ? value.slice(0, 60) + '...' : value
	}),
	createTextColumn<SessionRow>('createdAt', 'Created'),
	createTextColumn<SessionRow>('expiresAt', 'Expires'),
]

interface SessionsTableProps {
	sessions: SessionRow[]
}

export function SessionsTable({ sessions }: SessionsTableProps) {
	return (
		<DataTable
			data={sessions}
			columns={columns}
			contained
			isStriped
			caption="Active sessions"
			sorting={{ enabled: true }}
			pagination={{
				enabled: true,
				pageSize: 20,
				pageSizeOptions: [10, 20, 50],
			}}
			filtering={{
				enabled: true,
				placeholder: 'Search sessions...',
			}}
			emptyState={{
				title: 'No active sessions',
				description: 'There are no active sessions.',
			}}
		/>
	)
}
