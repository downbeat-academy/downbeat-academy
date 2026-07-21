import { Flex, Text } from 'cadence-core'
import { listUsers, type ListUsersOptions } from '@/lib/admin/queries/users'
import { requireAdmin } from '@/lib/auth/require-auth'
import { UsersFilterBar } from './_components/users-filter-bar'
import { UsersTable } from './_components/users-table'
import { UsersPagination } from './_components/users-pagination'
import type { Role } from '@/lib/auth/permissions'

type SearchParams = {
	page?: string
	q?: string
	role?: string
	status?: string
	sort?: string
	order?: string
}

const ALLOWED_ROLES: Role[] = ['student', 'educator', 'admin', 'superAdmin']
const ALLOWED_SORTS = ['createdAt', 'name', 'email', 'role'] as const

function parseOptions(sp: SearchParams): ListUsersOptions {
	const page = sp.page ? Math.max(1, parseInt(sp.page, 10) || 1) : 1
	const q = sp.q?.trim() || undefined

	let role: ListUsersOptions['role'] = 'all'
	if (sp.role && (ALLOWED_ROLES as readonly string[]).includes(sp.role)) {
		role = sp.role as Role
	}

	let banned: boolean | undefined
	let verified: boolean | undefined
	switch (sp.status) {
		case 'banned':
			banned = true
			break
		case 'unverified':
			verified = false
			break
		case 'active':
			banned = false
			verified = true
			break
	}

	const sort = ALLOWED_SORTS.includes(sp.sort as any)
		? (sp.sort as ListUsersOptions['sort'])
		: 'createdAt'
	const order = sp.order === 'asc' ? 'asc' : 'desc'

	return { page, pageSize: 20, q, role, banned, verified, sort, order }
}

export default async function AdminUsersPage({
	searchParams,
}: {
	searchParams: Promise<SearchParams>
}) {
	const [sp, session] = await Promise.all([searchParams, requireAdmin('/admin')])
	const options = parseOptions(sp)
	const result = await listUsers(options)

	return (
		<Flex direction="column" gap="x-large">
			<Text type="expressive-headline" size="h2" color="brand" collapse tag="h1">
				Users
			</Text>

			<UsersFilterBar
				initialQuery={sp.q ?? ''}
				initialRole={sp.role ?? 'all'}
				initialStatus={sp.status ?? 'all'}
			/>

			<UsersTable rows={result.rows} currentUserId={session.user.id} />

			<UsersPagination
				page={result.page}
				pageCount={result.pageCount}
				total={result.total}
				pageSize={result.pageSize}
			/>
		</Flex>
	)
}
