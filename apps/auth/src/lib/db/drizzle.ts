import { drizzle } from 'drizzle-orm/node-postgres'

export const authDb = drizzle(process.env.DATABASE_URL_AUTH!)
