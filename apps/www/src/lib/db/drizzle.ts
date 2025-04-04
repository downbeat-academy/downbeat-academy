import { drizzle } from 'drizzle-orm/node-postgres'
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-serverless'
import { Pool } from 'pg'
import { neon, neonConfig } from '@neondatabase/serverless'

// Configure neon to use WebSockets for Vercel
neonConfig.webSocketConstructor = require('ws')
neonConfig.useSecureWebSocket = true

const createDbClient = (connectionString: string) => {
	if (process.env.VERCEL_ENV === 'production') {
		// Use neon for production (Vercel) environment
		const sql = neon(connectionString)
		// @ts-ignore - Types are not perfectly aligned between neon-serverless and drizzle
		return drizzleNeon(sql)
	}

	// Use regular pool for development
	const pool = new Pool({ connectionString })
	return drizzle(pool)
}

// Create database clients
export const authDb = createDbClient(process.env.DATABASE_URL!)
export const cmsDb = createDbClient(process.env.DATABASE_URL_CMS!)

// For backward compatibility
export const db = authDb
