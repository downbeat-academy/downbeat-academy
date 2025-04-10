import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: '.env.local' })

export default defineConfig({
	out: './drizzle',
	dialect: 'postgresql',
	schema: './src/lib/db/schema/auth.ts',
	dbCredentials: {
		url: process.env.DATABASE_URL_AUTH!,
	},
})
