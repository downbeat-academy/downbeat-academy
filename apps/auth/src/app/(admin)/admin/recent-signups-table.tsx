'use client'

import {
	DataTable,
	Badge,
	Link,
	createTextColumn,
	createCustomColumn,
} from 'cadence-core'

interface SignupRow {
	id: string
	name: string
	email: string
	role: string | null
	createdAt: string
}

const roleBadgeType: Record<string, 'neutral' | 'info' | 'success' | 'highlight' | 'warning' | 'error'> = {
	student: 'neutral',
	educator: 'info',
	admin: 'warning',
	superAdmin: 'error',
}

const columns = [
	createCustomColumn<SignupRow, string>('name', 'Name', (value, row) => (
		<Link href={`/admin/users/${row.id}`} type="secondary">
			{value}
		</Link>
	)),
	createTextColumn<SignupRow>('email', 'Email'),
	createCustomColumn<SignupRow, string | null>('role', 'Role', (value) => (
		<Badge
			type={roleBadgeType[value ?? ''] ?? 'neutral'}
			style="light"
			size="small"
			text={value ?? 'unset'}
		/>
	)),
	createTextColumn<SignupRow>('createdAt', 'Joined', { alignment: 'end' }),
]

interface RecentSignupsTableProps {
	signups: SignupRow[]
}

export function RecentSignupsTable({ signups }: RecentSignupsTableProps) {
	return (
		<DataTable
			data={signups}
			columns={columns}
			contained
			isStriped
			emptyState={{
				title: 'No signups yet',
				description: 'No users have signed up.',
			}}
		/>
	)
}
