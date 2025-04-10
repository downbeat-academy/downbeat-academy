import {
	pgTable,
	text,
	varchar,
	timestamp,
	jsonb,
	serial,
	boolean,
	integer,
} from 'drizzle-orm/pg-core'
import { SocialLink } from './fields/social-links'
import { cmsDb } from '../../drizzle'

export const contributors = pgTable('people', {
	id: serial('id').primaryKey(),
	name: varchar('name').notNull(),
	metadataTitle: varchar('metadata_title').notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true })
		.notNull()
		.defaultNow(),
	createdAt: timestamp('created_at', { withTimezone: true })
		.notNull()
		.defaultNow(),
	slug: varchar('slug').notNull(),
	metadataDescription: varchar('metadata_description').notNull(),
	metadataOgImageId: integer('metadata_og_image_id'),
	metadataNoindex: boolean('metadata_noindex'),
	metadataNofollow: boolean('metadata_nofollow'),
	imageId: integer('image_id'),
	avatarId: integer('avatar_id'),
})
