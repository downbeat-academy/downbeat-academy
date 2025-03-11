import { drizzle } from 'drizzle-orm/node-postgres'
import { test } from '@/lib/db/schema'

async function getNeonData() {
  const db = drizzle(process.env.DATABASE_URL)
  const response = await db.select().from(test)
  return response
}

export default async function DrizzleTest() {
  const data = await getNeonData()
  return (
    <div>
      <p>Testing Drizzle!</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}