import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

export function createDbClient(connectionString: string | undefined) {
	if (!connectionString) {
		throw new Error('Database connection string is not defined')
	}
	const sql = neon(connectionString)
	return drizzle(sql)
}

// Lazy initialization of database clients
let authDbInstance: ReturnType<typeof drizzle> | null = null
let cmsDbInstance: ReturnType<typeof drizzle> | null = null

export function getAuthDb() {
	if (!authDbInstance) {
		authDbInstance = createDbClient(process.env.DATABASE_URL_AUTH)
	}
	return authDbInstance
}

export function getCmsDb() {
	if (!cmsDbInstance) {
		cmsDbInstance = createDbClient(process.env.DATABASE_URL_CMS)
	}
	return cmsDbInstance
}

// For backward compatibility
export const authDb = getAuthDb()
export const cmsDb = getCmsDb()
