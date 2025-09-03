/**
 * Cypress Environment Validator Plugin
 * 
 * This plugin validates environment variables before Cypress tests run,
 * providing clear error messages if configuration is missing or invalid.
 */

import { Pool } from 'pg'

interface EnvValidationConfig {
	required: string[]
	optional: string[]
	alternatives: Record<string, string[]>
	validators: Record<string, (value: string) => boolean | string>
}

const ENV_CONFIG: EnvValidationConfig = {
	required: [
		'BETTER_AUTH_SECRET',
		'NEXT_PUBLIC_PROJECT_URL'
	],
	optional: [
		'BETTER_AUTH_URL',
		'CYPRESS_BASE_URL',
		'RESEND_API_KEY',
		'NEXT_PUBLIC_SANITY_PROJECT_ID',
		'NEXT_PUBLIC_SANITY_DATASET',
		'NEXT_PUBLIC_SANITY_API_VERSION',
		'SANITY_API_TOKEN',
		'CI',
		'GITHUB_ACTIONS'
	],
	alternatives: {
		'DATABASE_URL': ['DATABASE_URL_AUTH', 'TEST_DATABASE_URL'],
		'TEST_DATABASE_URL': ['DATABASE_URL', 'DATABASE_URL_AUTH'],
		'DATABASE_URL_AUTH': ['DATABASE_URL', 'TEST_DATABASE_URL']
	},
	validators: {
		'DATABASE_URL': (value) => {
			if (!value.startsWith('postgresql://') && !value.startsWith('postgres://')) {
				return 'Must be a valid PostgreSQL connection string'
			}
			return true
		},
		'TEST_DATABASE_URL': (value) => {
			if (!value.startsWith('postgresql://') && !value.startsWith('postgres://')) {
				return 'Must be a valid PostgreSQL connection string'
			}
			return true
		},
		'DATABASE_URL_AUTH': (value) => {
			if (!value.startsWith('postgresql://') && !value.startsWith('postgres://')) {
				return 'Must be a valid PostgreSQL connection string'
			}
			return true
		},
		'BETTER_AUTH_SECRET': (value) => {
			if (value.length < 32) {
				return 'Must be at least 32 characters long for security'
			}
			return true
		},
		'BETTER_AUTH_URL': (value) => {
			try {
				new URL(value)
				return true
			} catch {
				return 'Must be a valid URL'
			}
		},
		'NEXT_PUBLIC_PROJECT_URL': (value) => {
			try {
				new URL(value)
				return true
			} catch {
				return 'Must be a valid URL'
			}
		},
		'CYPRESS_BASE_URL': (value) => {
			try {
				new URL(value)
				return true
			} catch {
				return 'Must be a valid URL'
			}
		},
		'RESEND_API_KEY': (value) => {
			if (!value.startsWith('re_')) {
				return 'Must be a valid Resend API key (starts with re_)'
			}
			return true
		}
	}
}

export class CypressEnvValidator {
	private errors: string[] = []
	private warnings: string[] = []

	async validateEnvironment(config: any): Promise<{ valid: boolean; errors: string[]; warnings: string[] }> {
		this.errors = []
		this.warnings = []

		console.log('🔍 Validating Cypress environment configuration...')

		// Check required environment variables
		await this.checkRequired(config)
		
		// Check database connection
		await this.checkDatabaseConnection(config)
		
		// Check optional variables with validation
		this.checkOptional(config)
		
		// Check test user configuration
		this.checkTestUserConfig(config)

		const valid = this.errors.length === 0

		if (valid) {
			console.log('✅ Environment validation passed')
		} else {
			console.log('❌ Environment validation failed')
			this.errors.forEach(error => console.log(`   Error: ${error}`))
		}

		if (this.warnings.length > 0) {
			console.log('⚠️  Warnings:')
			this.warnings.forEach(warning => console.log(`   Warning: ${warning}`))
		}

		return {
			valid,
			errors: this.errors,
			warnings: this.warnings
		}
	}

	private async checkRequired(config: any) {
		for (const envVar of ENV_CONFIG.required) {
			const value = config.env[envVar] || process.env[envVar]
			
			if (!value) {
				// Check if alternatives are available
				const alternatives = ENV_CONFIG.alternatives[envVar]
				const hasAlternative = alternatives?.some(alt => 
					config.env[alt] || process.env[alt]
				)

				if (!hasAlternative) {
					this.errors.push(`Required environment variable '${envVar}' is not set`)
				}
			} else {
				// Validate the value if validator exists
				const validator = ENV_CONFIG.validators[envVar]
				if (validator) {
					const result = validator(value)
					if (result !== true) {
						this.errors.push(`Invalid value for '${envVar}': ${result}`)
					}
				}
			}
		}
	}

	private checkOptional(config: any) {
		for (const envVar of ENV_CONFIG.optional) {
			const value = config.env[envVar] || process.env[envVar]
			
			if (value) {
				// Validate the value if validator exists
				const validator = ENV_CONFIG.validators[envVar]
				if (validator) {
					const result = validator(value)
					if (result !== true) {
						this.errors.push(`Invalid value for optional '${envVar}': ${result}`)
					}
				}
			}
		}
	}

	private async checkDatabaseConnection(config: any) {
		const databaseUrl = config.env.TEST_DATABASE_URL || 
						   config.env.DATABASE_URL_AUTH || 
						   config.env.DATABASE_URL ||
						   process.env.TEST_DATABASE_URL || 
						   process.env.DATABASE_URL_AUTH || 
						   process.env.DATABASE_URL

		if (!databaseUrl) {
			this.errors.push('No database connection URL found. Set DATABASE_URL, DATABASE_URL_AUTH, or TEST_DATABASE_URL')
			return
		}

		// Test database connection
		const pool = new Pool({ connectionString: databaseUrl })
		
		try {
			await pool.query('SELECT 1')
			await pool.end()
			console.log('✅ Database connection verified')
		} catch (error) {
			await pool.end()
			const errorMessage = error instanceof Error ? error.message : 'Unknown error'
			this.errors.push(`Database connection failed: ${errorMessage}`)
		}
	}

	private checkTestUserConfig(config: any) {
		const testUserEnvs = [
			'TEST_STUDENT_EMAIL',
			'TEST_STUDENT_PASSWORD',
			'TEST_EDUCATOR_EMAIL',
			'TEST_EDUCATOR_PASSWORD',
			'TEST_ADMIN_EMAIL',
			'TEST_ADMIN_PASSWORD',
			'TEST_SUPER_ADMIN_EMAIL',
			'TEST_SUPER_ADMIN_PASSWORD'
		]

		const missingTestEnvs = testUserEnvs.filter(env => !config.env[env])
		
		if (missingTestEnvs.length > 0) {
			this.warnings.push(`Some test user credentials are not configured in Cypress env: ${missingTestEnvs.join(', ')}`)
		} else {
			console.log('✅ All test user credentials configured')
		}
	}
}

export async function validateCypressEnvironment(on: any, config: any): Promise<any> {
	const validator = new CypressEnvValidator()
	
	try {
		const result = await validator.validateEnvironment(config)
		
		if (!result.valid) {
			console.error('\n❌ Environment validation failed. Please fix the following issues:')
			result.errors.forEach(error => console.error(`   • ${error}`))
			console.error('\nRefer to the documentation or run `tsx scripts/validate-test-env.ts` for detailed validation.')
			
			// In CI, fail fast
			if (config.env.CI) {
				throw new Error('Environment validation failed in CI. Tests cannot proceed.')
			}
		}

		// Add validation results to config for use in tests
		config.env.ENV_VALIDATION_PASSED = result.valid
		config.env.ENV_VALIDATION_ERRORS = JSON.stringify(result.errors)
		config.env.ENV_VALIDATION_WARNINGS = JSON.stringify(result.warnings)

	} catch (error) {
		console.error('❌ Environment validation error:', error)
		if (config.env.CI) {
			throw error
		}
	}

	return config
}