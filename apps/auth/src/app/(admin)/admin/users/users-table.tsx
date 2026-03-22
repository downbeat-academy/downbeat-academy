'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
	DataTable,
	Badge,
	Text,
	createTextColumn,
	createCustomColumn,
	createActionsColumn,
	type PaginationState,
	type SortingState,
} from 'cadence-core'
import { authClient } from '@/lib/auth/auth-client'
import type { Role } from 'auth-permissions'
import s from '../../admin.module.css'

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
	createCustomColumn<UserRow, string>('name', 'Name', (value, row) => (
		<Link href={`/admin/users/${row.id}`} className={s['admin-user-link']}>
			{value}
		</Link>
	)),
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
	const [users, setUsers] = useState<UserRow[]>([])
	const [total, setTotal] = useState(0)
	const [loading, setLoading] = useState(true)
	const [searchValue, setSearchValue] = useState('')
	const [hideTestAccounts, setHideTestAccounts] = useState(true)
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
				let mapped: UserRow[] = response.data.users.map((u: any) => ({
					id: u.id,
					name: u.name,
					email: u.email,
					role: u.role,
					banned: u.banned,
					emailVerified: u.emailVerified,
					createdAt: new Date(u.createdAt).toLocaleDateString(),
				}))

				if (hideTestAccounts) {
					mapped = mapped.filter(
						(u) =>
							!u.name?.toLowerCase().includes('test') &&
							!u.email?.toLowerCase().includes('test')
					)
				}

				setUsers(mapped)
				setTotal(hideTestAccounts ? mapped.length : response.data.total)
			}
		} catch (err) {
			console.error('Failed to fetch users:', err)
		} finally {
			setLoading(false)
		}
	}, [pagination.pageIndex, pagination.pageSize, searchValue, sorting, hideTestAccounts])

	useEffect(() => {
		fetchUsers()
	}, [fetchUsers])

	return (
		<div>
			<div className={s['admin-table-toolbar']}>
				<label className={s['admin-checkbox-label']}>
					<input
						type="checkbox"
						checked={hideTestAccounts}
						onChange={(e) => setHideTestAccounts(e.target.checked)}
					/>
					<Text type="productive-body" size="body-small" color="faint">
						Hide test accounts
					</Text>
				</label>
			</div>
			<DataTable
				data={users}
				columns={columns}
				contained
				isStriped
				loading={loading}
				loadingRowCount={PAGE_SIZE}
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
		</div>
	)
}
