import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as linksSchema from './schema/links'

// Auth database connection (shared with auth service for session validation)
export const authDb = drizzle(process.env.DATABASE_URL_AUTH!)

// Links database connection pool singleton
const globalForDb = globalThis as unknown as {
	pool: Pool | undefined
}

const pool =
	globalForDb.pool ??
	new Pool({
		connectionString: process.env.DATABASE_PUBLIC_URL,
	})

if (process.env.NODE_ENV !== 'production') {
	globalForDb.pool = pool
}

export const db = drizzle(pool, { schema: linksSchema })
