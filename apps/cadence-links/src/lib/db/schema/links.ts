import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const links = pgTable('links', {
	id: uuid('id').primaryKey().defaultRandom(),
	originalUrl: text('original_url').notNull(),
	shortCode: text('short_code').notNull().unique(),
	domain: text('domain').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
})

export type Link = typeof links.$inferSelect
export type NewLink = typeof links.$inferInsert
