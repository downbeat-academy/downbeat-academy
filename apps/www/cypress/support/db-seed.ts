import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { user, account, session } from '../../src/lib/db/schema/auth'
import { eq } from 'drizzle-orm'
import { hash } from 'bcryptjs'
import { nanoid } from 'nanoid'

// Test user data
const TEST_USERS = [
	{
		id: 'test-student-id',
		name: 'Test Student',
		email: 'test-student@example.com',
		password: 'TestPassword123!',
		role: 'student',
		emailVerified: true,
	},
	{
		id: 'test-educator-id',
		name: 'Test Educator',
		email: 'test-educator@example.com',
		password: 'TestPassword123!',
		role: 'educator',
		emailVerified: true,
	},
	{
		id: 'test-admin-id',
		name: 'Test Admin',
		email: 'test-admin@example.com',
		password: 'TestPassword123!',
		role: 'admin',
		emailVerified: true,
	},
	{
		id: 'test-superadmin-id',
		name: 'Test Super Admin',
		email: 'test-superadmin@example.com',
		password: 'TestPassword123!',
		role: 'superAdmin',
		emailVerified: true,
	},
	{
		id: 'test-unverified-id',
		name: 'Test Unverified User',
		email: 'test-unverified@example.com',
		password: 'TestPassword123!',
		role: 'student',
		emailVerified: false,
	},
]

let dbPool: Pool | null = null
let db: ReturnType<typeof drizzle> | null = null

async function getDbConnection() {
	if (!dbPool || !db) {
		const databaseUrl = process.env.TEST_DATABASE_URL || process.env.DATABASE_URL_AUTH || process.env.DATABASE_URL
		if (!databaseUrl) {
			throw new Error('No database URL found for testing')
		}
		
		dbPool = new Pool({
			connectionString: databaseUrl,
		})
		
		// Test connection
		try {
			await dbPool.query('SELECT 1')
		} catch (error) {
			console.error('Failed to connect to test database:', error)
			throw error
		}
		
		db = drizzle(dbPool)
	}
	return { dbPool, db }
}

export async function seedTestUsers(): Promise<boolean> {
	try {
		const { db } = await getDbConnection()
		
		console.log('Starting test user seeding...')
		
		// First, cleanup any existing test users
		await cleanupTestUsers()
		
		// Create test users
		for (const userData of TEST_USERS) {
			const hashedPassword = await hash(userData.password, 12)
			
			// Insert user
			await db.insert(user).values({
				id: userData.id,
				name: userData.name,
				email: userData.email,
				emailVerified: userData.emailVerified,
				role: userData.role,
				image: null,
				createdAt: new Date(),
				updatedAt: new Date(),
				banned: false,
				banReason: null,
				banExpires: null,
			})
			
			// Insert account for email/password authentication
			await db.insert(account).values({
				id: `${userData.id}-account`,
				accountId: userData.id,
				providerId: 'credential',
				userId: userData.id,
				password: hashedPassword,
				accessToken: null,
				refreshToken: null,
				idToken: null,
				accessTokenExpiresAt: null,
				refreshTokenExpiresAt: null,
				scope: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			})
			
			console.log(`Created test user: ${userData.name} (${userData.email}) with role: ${userData.role}`)
		}
		
		console.log('Test user seeding completed successfully')
		return true
	} catch (error) {
		console.error('Error seeding test users:', error)
		throw error
	}
}

export async function cleanupTestUsers(): Promise<boolean> {
	try {
		const { db } = await getDbConnection()
		
		console.log('Starting test user cleanup...')
		
		const testEmails = TEST_USERS.map(u => u.email)
		const testIds = TEST_USERS.map(u => u.id)
		
		// Delete sessions first (due to foreign key constraints)
		for (const userId of testIds) {
			await db.delete(session).where(eq(session.userId, userId))
		}
		
		// Delete accounts
		for (const userId of testIds) {
			await db.delete(account).where(eq(account.userId, userId))
		}
		
		// Delete users
		for (const email of testEmails) {
			await db.delete(user).where(eq(user.email, email))
		}
		
		console.log('Test user cleanup completed successfully')
		return true
	} catch (error) {
		console.error('Error cleaning up test users:', error)
		throw error
	}
}

export async function createTestSession(userId: string): Promise<string> {
	try {
		const { db } = await getDbConnection()
		
		const sessionId = nanoid()
		const token = nanoid(32)
		const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
		
		await db.insert(session).values({
			id: sessionId,
			token,
			userId,
			expiresAt,
			createdAt: new Date(),
			updatedAt: new Date(),
			ipAddress: '127.0.0.1',
			userAgent: 'Cypress Test Agent',
			impersonatedBy: null,
			activeOrganizationId: null,
		})
		
		return token
	} catch (error) {
		console.error('Error creating test session:', error)
		throw error
	}
}

export async function getTestUserByEmail(email: string) {
	const { db } = await getDbConnection()
	
	const users = await db.select().from(user).where(eq(user.email, email))
	return users[0] || null
}

// Close database connection when done
export async function closeDbConnection() {
	if (dbPool) {
		await dbPool.end()
		dbPool = null
		db = null
	}
}

// Export test user data for use in tests
export { TEST_USERS }