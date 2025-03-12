import { db } from '@/lib/db'
import { test } from '@/lib/db/schema'

async function getNeonData() {
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