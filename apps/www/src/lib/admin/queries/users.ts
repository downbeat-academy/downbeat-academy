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


export const countUsers = cache(async (): Promise<number> => {
	const [row] = await authDb.select({ value: count() }).from(user)
	return row?.value ?? 0
})

export const countUsersSince = cache(async (since: Date): Promise<number> => {
	const [row] = await authDb
		.select({ value: count() })
		.from(user)
		.where(gte(user.createdAt, since))
	return row?.value ?? 0
})

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

export const usersOverTime = cache(
	unstable_cache(fetchUsersOverTime, ['admin', 'users-over-time'], {
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
