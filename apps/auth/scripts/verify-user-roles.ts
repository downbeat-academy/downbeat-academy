/**
 * Verify and optionally backfill user roles in the auth database.
 *
 * Usage:
 *   npx tsx scripts/verify-user-roles.ts          # Report only
 *   npx tsx scripts/verify-user-roles.ts --fix     # Backfill null roles to 'student'
 */
import { drizzle } from 'drizzle-orm/node-postgres'
import { sql, eq, isNull, count } from 'drizzle-orm'
import { pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core'
import { Pool } from 'pg'
import { config } from 'dotenv'

// Load env vars
config({ path: '.env.local' })
config({ path: '.env' })

// Inline schema reference to avoid path alias issues in standalone scripts
const user = pgTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('email_verified').notNull(),
	image: text('image'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
	role: text('role'),
	banned: boolean('banned'),
	banReason: text('ban_reason'),
	banExpires: timestamp('ban_expires'),
})

const FIX_FLAG = process.argv.includes('--fix')
const DEFAULT_ROLE = 'student'

async function main() {
	const databaseUrl = process.env.DATABASE_URL_AUTH || process.env.DATABASE_URL
	if (!databaseUrl) {
		console.error('No database URL found. Set DATABASE_URL_AUTH or DATABASE_URL.')
		process.exit(1)
	}

	const pool = new Pool({ connectionString: databaseUrl })
	const db = drizzle(pool)

	try {
		// Total user count
		const [{ total }] = await db
			.select({ total: count() })
			.from(user)
		console.log(`\nTotal users: ${total}`)

		// Count by role (including null)
		const roleCounts = await db
			.select({
				role: user.role,
				count: count(),
			})
			.from(user)
			.groupBy(user.role)
			.orderBy(user.role)

		console.log('\nUsers by role:')
		for (const row of roleCounts) {
			console.log(`  ${row.role ?? '(null)'}: ${row.count}`)
		}

		// Find users with null roles
		const nullRoleUsers = await db
			.select({ id: user.id, email: user.email, name: user.name, createdAt: user.createdAt })
			.from(user)
			.where(isNull(user.role))

		if (nullRoleUsers.length === 0) {
			console.log('\nAll users have roles assigned.')
		} else {
			console.log(`\n${nullRoleUsers.length} user(s) with null role:`)
			for (const u of nullRoleUsers) {
				console.log(`  ${u.email} (${u.name}) — created ${u.createdAt.toISOString()}`)
			}

			if (FIX_FLAG) {
				console.log(`\nBackfilling ${nullRoleUsers.length} user(s) to role '${DEFAULT_ROLE}'...`)
				const result = await db
					.update(user)
					.set({ role: DEFAULT_ROLE, updatedAt: new Date() })
					.where(isNull(user.role))

				console.log('Backfill complete.')

				// Verify
				const [{ remaining }] = await db
					.select({ remaining: count() })
					.from(user)
					.where(isNull(user.role))
				console.log(`Users with null role after backfill: ${remaining}`)
			} else {
				console.log('\nRun with --fix to backfill null roles to "student".')
			}
		}
	} finally {
		await pool.end()
	}
}

main().catch((err) => {
	console.error('Script failed:', err)
	process.exit(1)
})
