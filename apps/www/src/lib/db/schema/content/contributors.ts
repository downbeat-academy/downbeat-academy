import {
	pgTable,
	varchar,
	serial,
	boolean,
	integer,
	pgEnum,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { socialPlatforms } from './fields/social-links'

export const socialPlatformEnum = pgEnum(
	'enum_people_social_links_platform',
	socialPlatforms
)

export const people = pgTable('people', {
	id: serial('id').primaryKey(),
	name: varchar('name').notNull(),
	slug: varchar('slug').notNull(),
	metadataTitle: varchar('metadata_title').notNull(),
	metadataDescription: varchar('metadata_description').notNull(),
	metadataNoindex: boolean('metadata_noindex'),
	metadataNofollow: boolean('metadata_nofollow'),
})

export const peopleSocialLinks = pgTable('people_social_links', {
	id: varchar('id').primaryKey(),
	parentId: integer('_parent_id')
		.notNull()
		.references(() => people.id),
	order: integer('_order').notNull(),
	platform: varchar('social_link_platform').notNull(),
	url: varchar('social_link_url').notNull(),
})

export const peopleRelations = relations(people, ({ many }) => ({
	socialLinks: many(peopleSocialLinks),
}))

export const peopleSocialLinksRelations = relations(
	peopleSocialLinks,
	({ one }) => ({
		person: one(people, {
			fields: [peopleSocialLinks.parentId],
			references: [people.id],
		}),
	})
)
