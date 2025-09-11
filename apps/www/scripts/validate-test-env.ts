#!/usr/bin/env tsx
/**
 * Test Environment Variable Validation Script
 * 
 * This script validates that all required environment variables are properly
 * configured for Cypress E2E tests to run successfully. It ensures consistency
 * between local and CI environments.
 * 
 * Usage: tsx scripts/validate-test-env.ts
 */

import { config } from 'dotenv'
import { readFileSync } from 'fs'
import path from 'path'
import { Pool } from 'pg'

// Load environment variables
config({ path: '.env.local' })

// Check if this is a smoke test (public routes only) vs full E2E test
const isSmokeTesting = process.env.CYPRESS_SPEC?.includes('public-routes') || 
	process.argv.includes('--smoke-test') ||
	process.env.SMOKE_TEST === 'true'

interface EnvRequirement {
	name: string
	required: boolean
	description: string
	example?: string
	validator?: (value: string) => boolean | string
	alternatives?: string[]
}

// Define all required environment variables for Cypress tests
const ENV_REQUIREMENTS: EnvRequirement[] = [
	// Database Configuration
	{
		name: 'DATABASE_URL',
		required: true,
		description: 'Primary database connection string',
		example: 'postgresql://user:password@host:5432/db',
		validator: (value) => {
			if (!value.startsWith('postgresql://') && !value.startsWith('postgres://')) {
				return 'Must be a valid PostgreSQL connection string'
			}
			return true
		},
		alternatives: ['DATABASE_URL_AUTH', 'TEST_DATABASE_URL']
	},
	{
		name: 'TEST_DATABASE_URL',
		required: false,
		description: 'Dedicated test database connection string (recommended for CI)',
		example: 'postgresql://test_user:test_password@localhost:5432/test_db',
		validator: (value) => {
			if (!value.startsWith('postgresql://') && !value.startsWith('postgres://')) {
				return 'Must be a valid PostgreSQL connection string'
			}
			return true
		}
	},
	{
		name: 'DATABASE_URL_AUTH',
		required: false,
		description: 'Auth-specific database connection string',
		example: 'postgresql://user:password@host:5432/db',
		validator: (value) => {
			if (!value.startsWith('postgresql://') && !value.startsWith('postgres://')) {
				return 'Must be a valid PostgreSQL connection string'
			}
			return true
		}
	},

	// Authentication Configuration
	{
		name: 'BETTER_AUTH_SECRET',
		required: true,
		description: 'Secret key for Better Auth authentication',
		example: 'DVb0BpI4NJk9uQfpaTgX1IRBF6VPEg0b',
		validator: (value) => {
			if (value.length < 32) {
				return 'Must be at least 32 characters long for security'
			}
			return true
		}
	},
	{
		name: 'BETTER_AUTH_URL',
		required: false,
		description: 'Better Auth base URL (only for production)',
		example: 'https://your-app.com',
		validator: (value) => {
			try {
				new URL(value)
				return true
			} catch {
				return 'Must be a valid URL'
			}
		}
	},

	// Public URL Configuration
	{
		name: 'NEXT_PUBLIC_PROJECT_URL',
		required: !isSmokeTesting, // Only required for full E2E tests, not smoke tests
		description: 'Public URL for the application',
		example: 'http://localhost:3000',
		validator: (value) => {
			try {
				new URL(value)
				return true
			} catch {
				return 'Must be a valid URL'
			}
		}
	},
	{
		name: 'CYPRESS_BASE_URL',
		required: false,
		description: 'Base URL for Cypress tests (defaults to NEXT_PUBLIC_PROJECT_URL)',
		example: 'http://localhost:3000',
		validator: (value) => {
			try {
				new URL(value)
				return true
			} catch {
				return 'Must be a valid URL'
			}
		}
	},

	// External Service Configuration (Optional for basic tests)
	{
		name: 'RESEND_API_KEY',
		required: false,
		description: 'Resend API key for email functionality',
		example: 're_7C3g4wZP_Fk8Jh866jTKNQDE2wB4u2ptH',
		validator: (value) => {
			if (!value.startsWith('re_')) {
				return 'Must be a valid Resend API key (starts with re_)'
			}
			return true
		}
	},
	{
		name: 'NEXT_PUBLIC_SANITY_PROJECT_ID',
		required: false,
		description: 'Sanity CMS project ID',
		example: 'v5w3t766'
	},
	{
		name: 'NEXT_PUBLIC_SANITY_DATASET',
		required: false,
		description: 'Sanity CMS dataset name',
		example: 'production'
	},
	{
		name: 'NEXT_PUBLIC_SANITY_API_VERSION',
		required: false,
		description: 'Sanity CMS API version',
		example: '2023-06-21'
	},
	{
		name: 'SANITY_API_TOKEN',
		required: false,
		description: 'Sanity CMS API token for read/write operations'
	},

	// CI/CD Environment Detection
	{
		name: 'CI',
		required: false,
		description: 'CI environment flag (set automatically in CI)',
		example: 'true'
	},
	{
		name: 'GITHUB_ACTIONS',
		required: false,
		description: 'GitHub Actions environment flag (set automatically)',
		example: 'true'
	}
]

// Predefined test user credentials (from Cypress config)
const TEST_USER_CREDENTIALS = [
	'TEST_STUDENT_EMAIL',
	'TEST_STUDENT_PASSWORD',
	'TEST_EDUCATOR_EMAIL', 
	'TEST_EDUCATOR_PASSWORD',
	'TEST_ADMIN_EMAIL',
	'TEST_ADMIN_PASSWORD',
	'TEST_SUPER_ADMIN_EMAIL',
	'TEST_SUPER_ADMIN_PASSWORD'
]

interface ValidationResult {
	valid: boolean
	errors: string[]
	warnings: string[]
	recommendations: string[]
	summary: {
		total: number
		required: number
		present: number
		missing: number
		invalid: number
	}
}

async function validateEnvironmentVariables(): Promise<ValidationResult> {
	const result: ValidationResult = {
		valid: true,
		errors: [],
		warnings: [],
		recommendations: [],
		summary: {
			total: ENV_REQUIREMENTS.length,
			required: ENV_REQUIREMENTS.filter(req => req.required).length,
			present: 0,
			missing: 0,
			invalid: 0
		}
	}

	console.log('🔍 Validating environment variables for Cypress tests...')
	if (isSmokeTesting) {
		console.log('🔥 Running in SMOKE TEST MODE - reduced requirements for public routes')
	}
	console.log()

	// Check each environment requirement
	for (const requirement of ENV_REQUIREMENTS) {
		const value = process.env[requirement.name]
		const hasValue = value !== undefined && value !== ''

		if (hasValue) {
			result.summary.present++
			
			// Validate the value if a validator is provided
			if (requirement.validator) {
				const validationResult = requirement.validator(value!)
				if (validationResult !== true) {
					result.errors.push(`${requirement.name}: ${validationResult}`)
					result.summary.invalid++
					result.valid = false
				} else {
					console.log(`✅ ${requirement.name}: Valid`)
				}
			} else {
				console.log(`✅ ${requirement.name}: Present`)
			}
		} else {
			// Check if alternatives are available
			const hasAlternative = requirement.alternatives?.some(alt => 
				process.env[alt] !== undefined && process.env[alt] !== ''
			)

			if (requirement.required && !hasAlternative) {
				result.errors.push(`${requirement.name}: Required but not set`)
				result.summary.missing++
				result.valid = false
				console.log(`❌ ${requirement.name}: Missing (required)`)
			} else if (hasAlternative) {
				const availableAlts = requirement.alternatives!.filter(alt => 
					process.env[alt] !== undefined && process.env[alt] !== ''
				)
				result.warnings.push(`${requirement.name}: Not set, but alternative available: ${availableAlts.join(', ')}`)
				console.log(`⚠️  ${requirement.name}: Alternative found (${availableAlts.join(', ')})`)
			} else {
				result.warnings.push(`${requirement.name}: Optional but not set`)
				console.log(`ℹ️  ${requirement.name}: Optional (not set)`)
			}
		}
	}

	// Check test user credentials (defined in Cypress config, not env vars)
	console.log('\n🎭 Checking test user credential configuration...')
	const missingCredentials = TEST_USER_CREDENTIALS.filter(cred => !process.env[cred])
	if (missingCredentials.length === 0) {
		console.log('✅ All test user credentials are configured in Cypress config')
	} else {
		result.warnings.push('Some test user credentials are missing from environment')
		console.log('ℹ️  Test user credentials are defined in Cypress config (not environment variables)')
	}

	return result
}

async function testDatabaseConnection(): Promise<{ success: boolean; error?: string }> {
	const databaseUrl = process.env.TEST_DATABASE_URL || process.env.DATABASE_URL_AUTH || process.env.DATABASE_URL
	
	if (!databaseUrl) {
		return { success: false, error: 'No database URL configured' }
	}

	console.log('\n🔌 Testing database connection...')
	console.log(`Database URL: ${databaseUrl.replace(/\/\/.*:.*@/, '//***:***@')}`)

	const pool = new Pool({ connectionString: databaseUrl })
	
	try {
		await pool.query('SELECT 1')
		await pool.end()
		console.log('✅ Database connection successful')
		return { success: true }
	} catch (error) {
		await pool.end()
		const errorMessage = error instanceof Error ? error.message : 'Unknown error'
		console.log(`❌ Database connection failed: ${errorMessage}`)
		return { success: false, error: errorMessage }
	}
}

function generateEnvironmentTemplate(): string {
	console.log('\n📄 Generating environment template...')
	
	const template = [
		'# Environment Variables for Cypress E2E Tests',
		'# Copy this to .env.local and fill in the values',
		'',
		'# =============================================================================',
		'# REQUIRED VARIABLES',
		'# =============================================================================',
		'',
		...ENV_REQUIREMENTS.filter(req => req.required).map(req => [
			`# ${req.description}`,
			req.example ? `${req.name}=${req.example}` : `${req.name}=`,
			''
		]).flat(),
		'# =============================================================================',
		'# OPTIONAL VARIABLES',
		'# =============================================================================',
		'',
		...ENV_REQUIREMENTS.filter(req => !req.required).map(req => [
			`# ${req.description}`,
			req.example ? `# ${req.name}=${req.example}` : `# ${req.name}=`,
			''
		]).flat(),
		'# =============================================================================',
		'# CI/CD VARIABLES (set automatically in CI environments)',
		'# =============================================================================',
		'',
		'# CI=true',
		'# GITHUB_ACTIONS=true',
		''
	].join('\n')

	return template
}

function printRecommendations(result: ValidationResult) {
	if (result.recommendations.length > 0) {
		console.log('\n💡 Recommendations:')
		result.recommendations.forEach(rec => console.log(`   • ${rec}`))
	}

	// Add specific recommendations based on environment
	const isCI = process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true'
	const hasTestDb = process.env.TEST_DATABASE_URL !== undefined

	console.log('\n💡 General Recommendations:')
	
	if (!hasTestDb) {
		console.log('   • Consider using a separate TEST_DATABASE_URL for isolation')
	}
	
	if (!isCI && !process.env.CYPRESS_BASE_URL) {
		console.log('   • Set CYPRESS_BASE_URL if different from NEXT_PUBLIC_PROJECT_URL')
	}
	
	console.log('   • Use different database instances for development and testing')
	console.log('   • Keep sensitive values in .env.local (gitignored)')
	console.log('   • Use GitHub Secrets for CI/CD environment variables')
}

async function main() {
	console.log('🚀 Downbeat Academy - Cypress Environment Validation\n')

	try {
		// Validate environment variables
		const validationResult = await validateEnvironmentVariables()
		
		// Test database connection
		const dbResult = await testDatabaseConnection()

		// Print summary
		console.log('\n📊 Validation Summary:')
		console.log(`   Total variables: ${validationResult.summary.total}`)
		console.log(`   Required: ${validationResult.summary.required}`)
		console.log(`   Present: ${validationResult.summary.present}`)
		console.log(`   Missing: ${validationResult.summary.missing}`)
		console.log(`   Invalid: ${validationResult.summary.invalid}`)
		console.log(`   Database connection: ${dbResult.success ? '✅ Success' : '❌ Failed'}`)

		// Print errors and warnings
		if (validationResult.errors.length > 0) {
			console.log('\n❌ Errors:')
			validationResult.errors.forEach(error => console.log(`   • ${error}`))
		}

		if (validationResult.warnings.length > 0) {
			console.log('\n⚠️  Warnings:')
			validationResult.warnings.forEach(warning => console.log(`   • ${warning}`))
		}

		// Print recommendations
		printRecommendations(validationResult)

		// Generate template if needed
		if (!validationResult.valid || validationResult.summary.missing > 0) {
			console.log('\n📄 Environment Template:')
			console.log('   Run this script with --generate-template to create .env.template')
		}

		// Determine final result
		const overallSuccess = validationResult.valid && dbResult.success
		
		console.log(`\n${overallSuccess ? '🎉' : '❌'} Environment validation ${overallSuccess ? 'passed' : 'failed'}`)
		
		if (!overallSuccess) {
			console.log('\nPlease fix the above issues before running Cypress tests.')
			process.exit(1)
		}
		
	} catch (error) {
		console.error('❌ Validation failed with error:', error)
		process.exit(1)
	}
}

// Handle command line arguments
const args = process.argv.slice(2)
if (args.includes('--generate-template')) {
	const template = generateEnvironmentTemplate()
	const fs = require('fs')
	fs.writeFileSync('.env.template', template)
	console.log('✅ Generated .env.template file')
	process.exit(0)
}

// Run validation if called directly
if (require.main === module) {
	main()
}

export { validateEnvironmentVariables, testDatabaseConnection, ENV_REQUIREMENTS }