'use server'

import { cmsDb } from '@/lib/db/drizzle'
import {
	people,
	peopleSocialLinks,
	peopleInstruments,
} from '@/lib/db/schema/content/contributors'
import { instrument } from '@/lib/db/schema/content/instrument'
import { media } from '@/lib/db/schema/content/media'
import { eq, inArray } from 'drizzle-orm'
import { getBlobImageUrl } from '@/lib/utils/getBlobImageUrl'

export async function getContributorsData() {
	try {
		const peopleData = await cmsDb.select().from(people).orderBy(people.id)

		const socialLinks = await cmsDb
			.select()
			.from(peopleSocialLinks)
			.orderBy(peopleSocialLinks.parentId, peopleSocialLinks.order)

		// Fetch instruments for each person
		const instrumentsData = await cmsDb
			.select({
				personId: peopleInstruments.parentId,
				instrument: instrument,
			})
			.from(peopleInstruments)
			.leftJoin(instrument, eq(peopleInstruments.instrumentId, instrument.id))
			.orderBy(peopleInstruments.parentId)

		// Get image IDs to fetch
		const imageIds = peopleData
			.filter(
				(person) => person.imageId !== null && person.imageId !== undefined
			)
			.map((person) => person.imageId!)

		// Get avatar IDs to fetch
		const avatarIds = peopleData
			.filter(
				(person) => person.avatarId !== null && person.avatarId !== undefined
			)
			.map((person) => person.avatarId!)

		// Combined unique media IDs to fetch
		const mediaIds = [...new Set([...imageIds, ...avatarIds])]

		// Fetch all media in one query
		const mediaData =
			mediaIds.length > 0
				? await cmsDb.select().from(media).where(inArray(media.id, mediaIds))
				: []

		// Process media data to include full URLs
		const processedMediaData = mediaData.map((mediaItem) => ({
			...mediaItem,
			url: getBlobImageUrl(mediaItem.url),
			// If thumbnailURL exists in your schema and is not commented out
			// thumbnailURL: getBlobImageUrl(mediaItem.thumbnailURL),
		}))

		const contributorsWithData = peopleData.map((person) => ({
			...person,
			socialLinks: socialLinks.filter((link) => link.parentId === person.id),
			image: person.imageId
				? processedMediaData.find((img) => img.id === person.imageId) || null
				: null,
			avatar: person.avatarId
				? processedMediaData.find((img) => img.id === person.avatarId) || null
				: null,
			instruments: instrumentsData
				.filter((rel) => rel.personId === person.id)
				.map((rel) => rel.instrument),
		}))

		return contributorsWithData
	} catch (error) {
		console.error('Failed to fetch contributors data:', error)
		return []
	}
}
