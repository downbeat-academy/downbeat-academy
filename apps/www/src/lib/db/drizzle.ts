import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

export function createDbClient(connectionString: string) {
	if (!connectionString) {
		throw new Error('DATABASE_URL is not defined')
	}
	const sql = neon(connectionString)
	return drizzle(sql)
}

// Create database clients
export const authDb = createDbClient(process.env.DATABASE_URL)
export const cmsDb = createDbClient(process.env.DATABASE_URL_CMS)

// For backward compatibility
export default authDb
