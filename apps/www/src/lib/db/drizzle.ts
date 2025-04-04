import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

const authPool = new Pool({
	connectionString: process.env.DATABASE_URL,
})

const cmsPool = new Pool({
	connectionString: process.env.DATABASE_URL_CMS,
})

export const authDb = drizzle(authPool)
export const cmsDb = drizzle(cmsPool)
