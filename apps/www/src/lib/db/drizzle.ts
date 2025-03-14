import { drizzle } from 'drizzle-orm/node-postgres'

// Define the database connection to Neon.
const db = drizzle(process.env.DATABASE_URL)

export { db }