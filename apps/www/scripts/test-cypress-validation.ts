#!/usr/bin/env tsx
/**
 * Test Cypress Environment Validation Integration
 * 
 * This script tests that the Cypress environment validation plugin works correctly
 * by simulating the Cypress configuration loading process.
 */

import { config } from 'dotenv'
import { CypressEnvValidator } from '../cypress/plugins/env-validator'

// Load environment variables
config({ path: '.env.local' })

// Mock Cypress config structure
const mockCypressConfig = {
	env: {
		// Copy relevant environment variables to Cypress env
		TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
		DATABASE_URL_AUTH: process.env.DATABASE_URL_AUTH,
		DATABASE_URL: process.env.DATABASE_URL,
		BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
		BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
		NEXT_PUBLIC_PROJECT_URL: process.env.NEXT_PUBLIC_PROJECT_URL,
		CYPRESS_BASE_URL: process.env.CYPRESS_BASE_URL,
		RESEND_API_KEY: process.env.RESEND_API_KEY,
		NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
		NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
		NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
		SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
		CI: process.env.CI || false,
		GITHUB_ACTIONS: process.env.GITHUB_ACTIONS || false,
		// Test user credentials from Cypress config (hardcoded)
		TEST_STUDENT_EMAIL: 'test-student@example.com',
		TEST_STUDENT_PASSWORD: 'TestPassword123!',
		TEST_EDUCATOR_EMAIL: 'test-educator@example.com',
		TEST_EDUCATOR_PASSWORD: 'TestPassword123!',
		TEST_ADMIN_EMAIL: 'test-admin@example.com',
		TEST_ADMIN_PASSWORD: 'TestPassword123!',
		TEST_SUPER_ADMIN_EMAIL: 'test-superadmin@example.com',
		TEST_SUPER_ADMIN_PASSWORD: 'TestPassword123!'
	}
}

async function testCypressValidation() {
	console.log('🧪 Testing Cypress Environment Validation Plugin\n')
	console.log('================================================\n')

	try {
		const validator = new CypressEnvValidator()
		const result = await validator.validateEnvironment(mockCypressConfig)

		console.log('\n📊 Cypress Plugin Validation Results:')
		console.log(`Valid: ${result.valid ? '✅ Yes' : '❌ No'}`)
		console.log(`Errors: ${result.errors.length}`)
		console.log(`Warnings: ${result.warnings.length}`)

		if (result.errors.length > 0) {
			console.log('\n❌ Errors found:')
			result.errors.forEach((error, index) => {
				console.log(`   ${index + 1}. ${error}`)
			})
		}

		if (result.warnings.length > 0) {
			console.log('\n⚠️  Warnings:')
			result.warnings.forEach((warning, index) => {
				console.log(`   ${index + 1}. ${warning}`)
			})
		}

		console.log('\n🔍 Cypress Config Environment Variables:')
		const envVarCount = Object.keys(mockCypressConfig.env).length
		const definedVars = Object.entries(mockCypressConfig.env)
			.filter(([, value]) => value !== undefined && value !== null && value !== '')
			.length
		
		console.log(`   Total env vars: ${envVarCount}`)
		console.log(`   Defined vars: ${definedVars}`)
		console.log(`   Undefined vars: ${envVarCount - definedVars}`)

		const finalResult = result.valid
		console.log(`\n${finalResult ? '🎉' : '❌'} Cypress validation plugin test ${finalResult ? 'PASSED' : 'FAILED'}`)

		if (finalResult) {
			console.log('✅ The Cypress environment validation plugin is working correctly')
			console.log('✅ Cypress tests should be able to run with current configuration')
		} else {
			console.log('❌ Fix the issues above before running Cypress tests')
		}

		return finalResult

	} catch (error) {
		console.error('\n❌ Cypress validation plugin test failed:', error)
		return false
	}
}

async function main() {
	const success = await testCypressValidation()
	process.exit(success ? 0 : 1)
}

// Run if called directly
if (require.main === module) {
	main()
}