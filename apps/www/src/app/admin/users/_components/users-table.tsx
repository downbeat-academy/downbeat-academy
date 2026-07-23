'use client'

import { useMemo } from 'react'
import {
	DataTable,
	Badge,
	SectionContainer,
	createTextColumn,
	createCustomColumn,
	createActionsColumn,
	type ColumnDef,
} from 'cadence-core'
import type { UserRow } from '@/lib/admin/types'
import { formatRelativeTime } from '@/lib/admin/format'
import { UserActionsMenu } from './user-actions-menu'

type Props = {
	rows: UserRow[]
	currentUserId: string
}

function roleBadgeType(role: string | null): 'error' | 'info' | 'highlight' | 'neutral' {
	switch (role) {
		case 'superAdmin':
			return 'error'
		case 'admin':
			return 'info'
		case 'educator':
			return 'highlight'
		default:
			return 'neutral'
	}
}

function roleLabel(role: string | null): string {
	switch (role) {
		case 'superAdmin':
			return 'Super Admin'
		case 'admin':
			return 'Admin'
		case 'educator':
			return 'Educator'
		case 'student':
			return 'Student'
		default:
			return role ?? '—'
	}
}

export function UsersTable({ rows, currentUserId }: Props) {
	const columns = useMemo<ColumnDef<UserRow, any>[]>(
		() => [
			createTextColumn<UserRow>('name', 'Name'),
			createTextColumn<UserRow>('email', 'Email'),
			createCustomColumn<UserRow, string | null>('role', 'Role', (value) => (
				<Badge type={roleBadgeType(value)} style="light" size="small" text={roleLabel(value)} />
			)),
			createCustomColumn<UserRow, unknown>('banned', 'Status', (_value, row) => {
				if (row.banned) return <Badge type="error" style="light" size="small" text="Banned" />
				if (!row.emailVerified)
					return <Badge type="warning" style="light" size="small" text="Unverified" />
				return <Badge type="success" style="light" size="small" text="Active" />
			}),
			createCustomColumn<UserRow, Date>('createdAt', 'Joined', (value) => (
				<span>{formatRelativeTime(value)}</span>
			)),
			createCustomColumn<UserRow, Date | null>('lastSessionAt', 'Last session', (value) =>
				value ? <span>{formatRelativeTime(value)}</span> : <span>—</span>
			),
			createActionsColumn<UserRow>('actions', (row) => (
				<UserActionsMenu user={row} isSelf={row.id === currentUserId} />
			)),
		],
		[currentUserId]
	)

	return (
		<SectionContainer background="primary">
			<DataTable
				data={rows}
				columns={columns}
				sorting={false}
				pagination={false}
				filtering={false}
				emptyState={{
					title: 'No users match these filters',
					description: 'Try clearing filters or changing the search term.',
				}}
			/>
		</SectionContainer>
	)
}
