'use server'

import { cmsDb } from '@/lib/db/drizzle'
import { people, peopleSocialLinks } from '@/lib/db/schema/content/contributors'

export async function getContributorsData() {
	try {
		// const contributorsData = await cmsDb.query.people.findMany({
		// 	with: {
		// 		socialLinks: true,
		// 	},
		// })

		// return contributorsData

		const peopleData = await cmsDb.select().from(people).orderBy(people.id)
		const socialLinks = await cmsDb
			.select()
			.from(peopleSocialLinks)
			.orderBy(peopleSocialLinks.parentId, peopleSocialLinks.order)

		const contributorsWithSocialLinks = peopleData.map((person) => ({
			...person,
			socialLinks: socialLinks.filter((link) => link.parentId === person.id),
		}))

		return contributorsWithSocialLinks
	} catch (error) {
		console.error('Failed to fetch contributors data:', error)
		return []
	}
}
