import { eq, desc } from 'drizzle-orm'
import { db } from '../drizzle'
import { links, type Link, type NewLink } from '../schema/links'

/**
 * Create a new shortened link
 */
export async function createLink(data: NewLink): Promise<Link> {
	const [link] = await db.insert(links).values(data).returning()
	if (!link) {
		throw new Error('Failed to create link - no data returned from insert')
	}
	return link
}

/**
 * Get all links, ordered by creation date (newest first)
 */
export async function getAllLinks(): Promise<Link[]> {
	return db.select().from(links).orderBy(desc(links.createdAt))
}

/**
 * Get a link by its short code
 */
export async function getLinkByShortCode(
	shortCode: string
): Promise<Link | undefined> {
	const [link] = await db
		.select()
		.from(links)
		.where(eq(links.shortCode, shortCode))
		.limit(1)
	return link
}

/**
 * Delete a link by its ID
 * @returns true if a link was deleted, false if no link found
 */
export async function deleteLink(id: string): Promise<boolean> {
	const result = await db.delete(links).where(eq(links.id, id)).returning({ id: links.id })
	return result.length > 0
}

/**
 * Check if a short code already exists
 */
export async function shortCodeExists(shortCode: string): Promise<boolean> {
	const [link] = await db
		.select({ id: links.id })
		.from(links)
		.where(eq(links.shortCode, shortCode))
		.limit(1)
	return !!link
}
