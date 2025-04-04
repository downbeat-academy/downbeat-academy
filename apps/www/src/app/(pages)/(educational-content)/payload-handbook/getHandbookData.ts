'use server'
import { cmsDb } from '@/lib/db/drizzle'
import { handbooks } from '@/lib/db/schema/content'

export async function getHandbookData() {
	try {
		// During build time in production, return empty data
		if (
			process.env.VERCEL_ENV === 'production' &&
			process.env.NEXT_PHASE === 'build'
		) {
			return []
		}

		const handbookData = await cmsDb.select().from(handbooks)
		return handbookData
	} catch (error) {
		console.error('Failed to fetch handbook data:', error)
		return []
	}
}
