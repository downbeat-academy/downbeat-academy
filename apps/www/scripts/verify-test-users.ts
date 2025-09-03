#!/usr/bin/env tsx
/**
 * Test User Verification Script
 * 
 * This script verifies that all required test users exist in the database
 * before running E2E tests. If any are missing, it will seed them.
 */

import { config } from 'dotenv'
import path from 'path'
import { getTestUserByEmail, seedTestUsers, TEST_USERS } from '../cypress/support/db-seed'

// Load environment variables
config({ path: '.env.local' })

async function verifyTestUsers(): Promise<boolean> {
	console.log('🔍 Verifying test users exist...')
	
	const missingUsers: string[] = []
	
	for (const testUser of TEST_USERS) {
		try {
			const existingUser = await getTestUserByEmail(testUser.email)
			if (!existingUser) {
				missingUsers.push(testUser.email)
			} else {
				console.log(`✓ Test user found: ${testUser.email} (${testUser.role})`)
			}
		} catch (error) {
			console.error(`❌ Error checking user ${testUser.email}:`, error)
			missingUsers.push(testUser.email)
		}
	}
	
	if (missingUsers.length > 0) {
		console.log(`⚠️  Found ${missingUsers.length} missing test users:`)
		missingUsers.forEach(email => console.log(`  - ${email}`))
		
		console.log('🌱 Re-seeding all test users...')
		await seedTestUsers()
		console.log('✅ Test users have been seeded')
		return true
	} else {
		console.log('✅ All test users are present in the database')
		return true
	}
}

// Run if called directly
if (require.main === module) {
	verifyTestUsers()
		.then(() => {
			console.log('🎉 Test user verification completed successfully!')
			process.exit(0)
		})
		.catch(error => {
			console.error('❌ Test user verification failed:', error)
			process.exit(1)
		})
}

export { verifyTestUsers }