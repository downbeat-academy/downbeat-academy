import {
	pgTable,
	serial,
	varchar,
	integer,
	text,
	timestamp,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { people } from './contributors'

export const media = pgTable('media', {
	id: serial('id').primaryKey(),
	alt: text('alt').notNull(),
	description: text('description'),
	updatedAt: timestamp('updated_at').notNull(),
	createdAt: timestamp('created_at').notNull(),
	url: text('url'),
	// thumbnailURL: text('thumbnail_url'),
	filename: text('filename'),
	mimeType: text('mime_type'),
	filesize: integer('filesize'),
	width: integer('width'),
	height: integer('height'),
	focalX: integer('focal_x'),
	focalY: integer('focal_y'),
})

export const mediaRelations = relations(media, ({ many }) => ({
	usedAsImage: many(people, { relationName: 'image' }),
	usedAsAvatar: many(people, { relationName: 'avatar' }),
}))
