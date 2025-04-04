'use server'
import { cmsDb } from '@/lib/db/drizzle'
import { handbooks } from '@/lib/db/schema/content'

export async function getHandbookData() {
	const handbookData = await cmsDb.select().from(handbooks)
	return handbookData
}
