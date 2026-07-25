import 'server-only'
import { cache } from 'react'
import { and, asc, count, desc, eq, gte, ilike, or, sql, type SQL } from 'drizzle-orm'
import { authDb } from '@/lib/db/drizzle'
import { user, session } from '@/lib/db/schema/auth'
import type { MetricPoint, RecentUser, UserRow } from '../types'
import { unstable_cache } from 'next/cache'
import type { Role } from '@/lib/auth/permissions'

export type ListUsersOptions = {
	page?: number
	pageSize?: number
	sort?: 'createdAt' | 'name' | 'email' | 'role'
	order?: 'asc' | 'desc'
	q?: string
	role?: Role | 'all'
	banned?: boolean
	verified?: boolean
}

export type ListUsersResult = {
	rows: UserRow[]
	total: number
	page: number
	pageSize: number
	pageCount: number
}


export type DashboardStats = {
	totalUsers: number
	newUsersRecent: number
	newUsersExtended: number
	activeSessions: number
}

/**
 * The overview cards need four independent scalars. Issued as separate queries they
 * cost four pool connections per render — and because the page fans them out through
 * `Promise.all`, four *concurrent* ones, which forces the pool to open new physical
 * connections. As scalar subqueries they cost a single round trip.
 *
 * `count(*)` is bigint, which node-postgres hands back as a string, so the `::int`
 * casts are load-bearing: without them the metric cards render `"12"` and the delta
 * arithmetic on the overview page concatenates instead of adding.
 */
export const dashboardStats = cache(
	async (recentDays: number, extendedDays: number): Promise<DashboardStats> => {
		const result = await authDb.execute<{
			total_users: number
			new_users_recent: number
			new_users_extended: number
			active_sessions: number
		}>(sql`
			select
				(select count(*)::int from ${user}) as total_users,
				(select count(*)::int from ${user}
					where ${user.createdAt} >= now() - (${recentDays}::int * interval '1 day')
				) as new_users_recent,
				(select count(*)::int from ${user}
					where ${user.createdAt} >= now() - (${extendedDays}::int * interval '1 day')
				) as new_users_extended,
				(select count(*)::int from ${session}
					where ${session.expiresAt} > now()
				) as active_sessions
		`)

		const row = result.rows[0]
		return {
			totalUsers: row?.total_users ?? 0,
			newUsersRecent: row?.new_users_recent ?? 0,
			newUsersExtended: row?.new_users_extended ?? 0,
			activeSessions: row?.active_sessions ?? 0,
		}
	}
)

export const countByRole = cache(async (): Promise<Record<string, number>> => {
	const rows = await authDb
		.select({ role: user.role, value: count() })
		.from(user)
		.groupBy(user.role)
	return Object.fromEntries(rows.map((r) => [r.role ?? 'unknown', r.value]))
})

export const countBanned = cache(async (): Promise<number> => {
	const [row] = await authDb
		.select({ value: count() })
		.from(user)
		.where(eq(user.banned, true))
	return row?.value ?? 0
})

export const countUnverified = cache(async (): Promise<number> => {
	const [row] = await authDb
		.select({ value: count() })
		.from(user)
		.where(eq(user.emailVerified, false))
	return row?.value ?? 0
})

const SORT_COLUMNS = {
	createdAt: user.createdAt,
	name: user.name,
	email: user.email,
	role: user.role,
} as const

export async function listUsers(options: ListUsersOptions = {}): Promise<ListUsersResult> {
	const page = Math.max(1, Math.floor(options.page ?? 1))
	const pageSize = Math.min(100, Math.max(5, Math.floor(options.pageSize ?? 20)))
	const sortKey = options.sort ?? 'createdAt'
	const order = options.order ?? 'desc'
	const sortColumn = SORT_COLUMNS[sortKey]
	const orderBy = order === 'asc' ? asc(sortColumn) : desc(sortColumn)

	const filters: SQL[] = []
	if (options.q && options.q.trim()) {
		const like = `%${options.q.trim()}%`
		const searchClause = or(ilike(user.name, like), ilike(user.email, like))
		if (searchClause) filters.push(searchClause)
	}
	if (options.role && options.role !== 'all') {
		filters.push(eq(user.role, options.role))
	}
	if (typeof options.banned === 'boolean') {
		filters.push(eq(user.banned, options.banned))
	}
	if (typeof options.verified === 'boolean') {
		filters.push(eq(user.emailVerified, options.verified))
	}
	const where = filters.length > 0 ? and(...filters) : undefined

	const [totalRow] = await authDb
		.select({ value: count() })
		.from(user)
		.where(where)
	const total = totalRow?.value ?? 0

	const lastSessionAt = sql<Date | null>`(SELECT MAX(${session.createdAt}) FROM ${session} WHERE ${session.userId} = ${user.id})`

	const rows = await authDb
		.select({
			id: user.id,
			name: user.name,
			email: user.email,
			emailVerified: user.emailVerified,
			role: user.role,
			banned: user.banned,
			image: user.image,
			createdAt: user.createdAt,
			lastSessionAt,
		})
		.from(user)
		.where(where)
		.orderBy(orderBy)
		.limit(pageSize)
		.offset((page - 1) * pageSize)

	return {
		rows,
		total,
		page,
		pageSize,
		pageCount: Math.max(1, Math.ceil(total / pageSize)),
	}
}

async function fetchUsersOverTime(days: number): Promise<MetricPoint[]> {
	const rows = await authDb
		.select({
			bucket: sql<string>`to_char(date_trunc('day', ${user.createdAt}), 'YYYY-MM-DD')`,
			value: count(),
		})
		.from(user)
		.where(gte(user.createdAt, sql`now() - (${days}::int * interval '1 day')`))
		.groupBy(sql`date_trunc('day', ${user.createdAt})`)
		.orderBy(sql`date_trunc('day', ${user.createdAt})`)

	// Bucket rows may skip days with no signups; densify to a full daily series.
	const byDate = new Map(rows.map((r) => [r.bucket, r.value]))
	const [{ value: totalBefore }] = await authDb
		.select({ value: count() })
		.from(user)
		.where(sql`${user.createdAt} < now() - (${days}::int * interval '1 day')`)

	const points: MetricPoint[] = []
	let cumulative = totalBefore ?? 0
	const now = new Date()
	for (let i = days - 1; i >= 0; i--) {
		const d = new Date(now)
		d.setDate(d.getDate() - i)
		const key = d.toISOString().slice(0, 10)
		const newUsers = byDate.get(key) ?? 0
		cumulative += newUsers
		points.push({ date: key, newUsers, cumulative })
	}
	return points
}

// Versioned key — see the note on `cachedFetch` in ./subscribers. `MetricPoint` is
// JSON-native today, so a stale entry is harmless, but bump `v1` if its shape changes.
export const usersOverTime = cache(
	unstable_cache(fetchUsersOverTime, ['admin', 'users-over-time', 'v1'], {
		tags: ['admin:users'],
		revalidate: 60,
	})
)

export const recentUsers = cache(async (limit = 10): Promise<RecentUser[]> => {
	const rows = await authDb
		.select({
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
			createdAt: user.createdAt,
		})
		.from(user)
		.orderBy(desc(user.createdAt))
		.limit(limit)
	return rows
})
