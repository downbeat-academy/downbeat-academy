import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as linksSchema from './schema/links'
import * as authSchema from './schema/auth'

// Create a connection pool singleton
const globalForDb = globalThis as unknown as {
	pool: Pool | undefined
}

const pool =
	globalForDb.pool ??
	new Pool({
		connectionString: process.env.DATABASE_URL,
	})

if (process.env.NODE_ENV !== 'production') {
	globalForDb.pool = pool
}

// Combined schema for database operations
const schema = {
	...linksSchema,
	...authSchema,
}

export const db = drizzle(pool, { schema })
