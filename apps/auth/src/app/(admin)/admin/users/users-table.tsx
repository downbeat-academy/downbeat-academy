'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
	DataTable,
	Badge,
	createTextColumn,
	createCustomColumn,
	createActionsColumn,
	type PaginationState,
	type SortingState,
} from 'cadence-core'
import { authClient } from '@/lib/auth/auth-client'
import type { Role } from 'auth-permissions'

interface UserRow {
	id: string
	name: string
	email: string
	role: string | null
	banned: boolean | null
	emailVerified: boolean
	createdAt: string
}

const roleBadgeType: Record<string, 'neutral' | 'info' | 'success' | 'highlight' | 'warning' | 'error'> = {
	student: 'neutral',
	educator: 'info',
	admin: 'warning',
	superAdmin: 'error',
}

const columns = [
	createTextColumn<UserRow>('name', 'Name'),
	createTextColumn<UserRow>('email', 'Email'),
	createCustomColumn<UserRow, string | null>('role', 'Role', (value) => (
		<Badge
			type={roleBadgeType[value ?? ''] ?? 'neutral'}
			style="light"
			size="small"
			text={value ?? 'unset'}
		/>
	)),
	createCustomColumn<UserRow, boolean | null>('banned', 'Status', (value) => (
		<Badge
			type={value ? 'error' : 'success'}
			style="light"
			size="small"
			text={value ? 'Banned' : 'Active'}
		/>
	)),
	createCustomColumn<UserRow, boolean>('emailVerified', 'Email Verified', (value) => (
		<Badge
			type={value ? 'success' : 'warning'}
			style="outlined"
			size="small"
			text={value ? 'Verified' : 'Unverified'}
		/>
	)),
	createTextColumn<UserRow>('createdAt', 'Joined', { alignment: 'end' }),
]

const PAGE_SIZE = 20

export function UsersTable() {
	const router = useRouter()
	const [users, setUsers] = useState<UserRow[]>([])
	const [total, setTotal] = useState(0)
	const [loading, setLoading] = useState(true)
	const [searchValue, setSearchValue] = useState('')
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: PAGE_SIZE,
	})
	const [sorting, setSorting] = useState<SortingState>([
		{ id: 'createdAt', desc: true },
	])

	const fetchUsers = useCallback(async () => {
		setLoading(true)
		try {
			const response = await authClient.admin.listUsers({
				query: {
					limit: pagination.pageSize,
					offset: pagination.pageIndex * pagination.pageSize,
					...(searchValue ? {
						searchValue,
						searchField: 'email' as const,
						searchOperator: 'contains' as const,
					} : {}),
					...(sorting.length > 0 ? {
						sortBy: sorting[0].id,
						sortDirection: sorting[0].desc ? 'desc' as const : 'asc' as const,
					} : {}),
				},
			})

			if (response.data) {
				const mapped: UserRow[] = response.data.users.map((u: any) => ({
					id: u.id,
					name: u.name,
					email: u.email,
					role: u.role,
					banned: u.banned,
					emailVerified: u.emailVerified,
					createdAt: new Date(u.createdAt).toLocaleDateString(),
				}))
				setUsers(mapped)
				setTotal(response.data.total)
			}
		} catch (err) {
			console.error('Failed to fetch users:', err)
		} finally {
			setLoading(false)
		}
	}, [pagination.pageIndex, pagination.pageSize, searchValue, sorting])

	useEffect(() => {
		fetchUsers()
	}, [fetchUsers])

	return (
		<DataTable
			data={users}
			columns={columns}
			contained
			isStriped
			loading={loading}
			loadingRowCount={PAGE_SIZE}
			caption="Users table"
			onRowClick={(row) => router.push(`/admin/users/${row.id}`)}
			sorting={{
				enabled: true,
				manual: true,
				defaultSorting: sorting,
				onSortingChange: setSorting,
			}}
			pagination={{
				enabled: true,
				manual: true,
				pageSize: pagination.pageSize,
				pageCount: Math.ceil(total / pagination.pageSize),
				pageSizeOptions: [10, 20, 50],
				onPaginationChange: setPagination,
			}}
			filtering={{
				enabled: true,
				manual: true,
				placeholder: 'Search by email...',
				onFilterChange: setSearchValue,
			}}
			emptyState={{
				title: 'No users found',
				description: searchValue
					? `No users matching "${searchValue}"`
					: 'No users in the database yet.',
			}}
		/>
	)
}
