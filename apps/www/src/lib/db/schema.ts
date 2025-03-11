import { pgTable, serial, text } from 'drizzle-orm/pg-core'

export const test = pgTable('test', {
  id: serial('id').primaryKey(),
  text: text('text'),
  // Add other columns that exist in your test table
  // For example:
  // name: text('name'),
  // created_at: timestamp('created_at').defaultNow()
}) 