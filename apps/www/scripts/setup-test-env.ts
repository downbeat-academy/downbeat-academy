#!/usr/bin/env tsx
/**
 * Test Environment Setup Script
 * 
 * This script sets up the test environment for CI/CD by:
 * 1. Ensuring database connection
 * 2. Running database migrations/schema push
 * 3. Seeding test users
 * 
 * Usage: pnpm test:setup
 */

import { execSync } from 'child_process'
import { config } from 'dotenv'
import path from 'path'

// Load environment variables
config({ path: '.env.local' })

const DATABASE_URL = process.env.TEST_DATABASE_URL || process.env.DATABASE_URL_AUTH || process.env.DATABASE_URL

async function setupTestEnvironment() {
	console.log('🚀 Setting up test environment...')
	
	// Validate required environment variables
	if (!DATABASE_URL) {
		console.error('❌ No database URL found. Please set TEST_DATABASE_URL, DATABASE_URL_AUTH, or DATABASE_URL')
		process.exit(1)
	}
	
	console.log('🔗 Database URL:', DATABASE_URL.replace(/\/\/.*:.*@/, '//***:***@')) // Hide credentials in log
	
	try {
		// Step 1: Push database schema
		console.log('📋 Pushing database schema...')
		execSync('pnpm db:push', { 
			stdio: 'inherit', 
			env: { 
				...process.env, 
				DATABASE_URL: DATABASE_URL,
				DATABASE_URL_AUTH: DATABASE_URL 
			} 
		})
		console.log('✅ Database schema ready')
		
		// Step 2: Seed test users
		console.log('🌱 Seeding test users...')
		execSync('pnpm db:seed:test', { 
			stdio: 'inherit',
			env: { 
				...process.env, 
				DATABASE_URL: DATABASE_URL,
				DATABASE_URL_AUTH: DATABASE_URL,
				TEST_DATABASE_URL: DATABASE_URL
			} 
		})
		console.log('✅ Test users seeded')
		
		console.log('🎉 Test environment setup completed successfully!')
		
	} catch (error) {
		console.error('❌ Test environment setup failed:', error)
		process.exit(1)
	}
}

// Run if called directly
if (require.main === module) {
	setupTestEnvironment()
}

export { setupTestEnvironment }