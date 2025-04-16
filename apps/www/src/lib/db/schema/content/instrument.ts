import { pgTable, serial, varchar } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { peopleInstruments } from './contributors'

export const instrument = pgTable('instruments', {
	id: serial('id').primaryKey(),
	name: varchar('title').notNull(),
})

export const instrumentRelations = relations(instrument, ({ many }) => ({
	people: many(peopleInstruments),
}))
