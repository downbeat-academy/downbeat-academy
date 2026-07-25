import 'server-only'
import { cache } from 'react'
import { desc, eq } from 'drizzle-orm'
import { authDb } from '@/lib/db/drizzle'
import { session, user } from '@/lib/db/schema/auth'
import type { RecentSession } from '../types'

// The active-session count lives in `dashboardStats` (./users), folded into the same
// round trip as the user counts so the overview page doesn't spend a connection on it.

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
