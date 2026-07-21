import 'server-only'
import { cache } from 'react'
import { count, desc, eq, gt, sql } from 'drizzle-orm'
import { authDb } from '@/lib/db/drizzle'
import { session, user } from '@/lib/db/schema/auth'
import type { RecentSession } from '../types'

export const activeSessionCount = cache(async (): Promise<number> => {
	const [row] = await authDb
		.select({ value: count() })
		.from(session)
		.where(gt(session.expiresAt, sql`now()`))
	return row?.value ?? 0
})

export const recentSessions = cache(async (limit = 10): Promise<RecentSession[]> => {
	const rows = await authDb
		.select({
			id: session.id,
			userId: session.userId,
			userName: user.name,
			userEmail: user.email,
			ipAddress: session.ipAddress,
			userAgent: session.userAgent,
			createdAt: session.createdAt,
		})
		.from(session)
		.leftJoin(user, eq(session.userId, user.id))
		.orderBy(desc(session.createdAt))
		.limit(limit)
	return rows
})
