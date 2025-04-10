import { neon } from '@neondatabase/serverless'
// import { drizzle } from 'drizzle-orm/neon-http'
import { drizzle } from 'drizzle-orm/neon-http'

export const createDbClient = (connectionString: string | undefined) => {
	if (!connectionString) {
		throw new Error('Database connection string is not defined')
	}
	const connection = drizzle(connectionString)
	return connection
}

// export function createDbClient(connectionString: string | undefined) {
// 	if (!connectionString) {
// 		throw new Error('Database connection string is not defined')
// 	}
// 	const sql = neon(connectionString)
// 	return drizzle(sql)
// }

// // Lazy initialization of database clients
// let authDbInstance: ReturnType<typeof drizzle> | null = null
// let cmsDbInstance: ReturnType<typeof drizzle> | null = null

// export function getAuthDb() {
// 	if (!authDbInstance) {
// 		authDbInstance = createDbClient(process.env.DATABASE_URL_AUTH)
// 	}
// 	return authDbInstance
// }

// export function getCmsDb() {
// 	if (!cmsDbInstance) {
// 		cmsDbInstance = createDbClient(process.env.DATABASE_URL_CMS)
// 	}
// 	return cmsDbInstance
// }

export const authDb = createDbClient(process.env.DATABASE_URL_AUTH)
export const cmsDb = createDbClient(process.env.DATABASE_URL_CMS)
