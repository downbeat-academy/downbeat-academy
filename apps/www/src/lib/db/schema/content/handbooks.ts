import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const handbooks = pgTable('handbooks', {
	id: text('id').primaryKey(),
	title: text('title').notNull(),
	slug: text('slug').unique(),
	// content: text('content'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
})
