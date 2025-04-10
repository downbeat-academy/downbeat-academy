'use server'
import { cmsDb } from '@/lib/db/drizzle'
import { handbooks } from '@/lib/db/schema/content'

export async function getHandbookData() {
	try {
		const handbookData = await cmsDb.select().from(handbooks)
		return handbookData
	} catch (error) {
		console.error('Failed to fetch handbook data:', error)
		return []
	}
}
