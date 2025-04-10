'use server'

import { cmsDb } from '@/lib/db/drizzle'
import { contributors } from '@/lib/db/schema/content'

export async function getContributorsData() {
	try {
		const contributorsData = await cmsDb.select().from(contributors)
		return contributorsData
	} catch (error) {
		console.error('Failed to fetch contributors data:', error)
		return []
	}
}
