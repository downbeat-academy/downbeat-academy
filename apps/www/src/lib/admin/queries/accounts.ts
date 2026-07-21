import 'server-only'
import { cache } from 'react'
import { count, desc } from 'drizzle-orm'
import { authDb } from '@/lib/db/drizzle'
import { account } from '@/lib/db/schema/auth'
import type { ProviderSlice } from '../types'

export const authProviderBreakdown = cache(async (): Promise<ProviderSlice[]> => {
	const rows = await authDb
		.select({ providerId: account.providerId, value: count() })
		.from(account)
		.groupBy(account.providerId)
		.orderBy(desc(count()))
	return rows.map((r) => ({ providerId: r.providerId, count: r.value }))
})
