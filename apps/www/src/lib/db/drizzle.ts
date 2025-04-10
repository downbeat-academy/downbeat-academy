import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

export function createDbClient(connectionString: string) {
	if (!connectionString) {
		throw new Error('Database connection string is not defined')
	}
	const sql = neon(connectionString)
	return drizzle(sql)
}

// Create database clients
export const authDb = createDbClient(process.env.DATABASE_URL_AUTH)
export const cmsDb = createDbClient(process.env.DATABASE_URL_CMS)
