import { defineConfig } from 'cypress'

export default defineConfig({
	e2e: {
		baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3000',
		viewportWidth: 1280,
		viewportHeight: 720,
		video: process.env.CI ? true : false,
		screenshotOnRunFailure: true,
		videosFolder: 'cypress/videos',
		screenshotsFolder: 'cypress/screenshots',
		videoCompression: 32,
		defaultCommandTimeout: 10000,
		requestTimeout: 10000,
		responseTimeout: 10000,
		pageLoadTimeout: 30000,
		taskTimeout: 60000,
		watchForFileChanges: false,
		chromeWebSecurity: process.env.CI ? false : true,
		retries: {
			runMode: 2,
			openMode: 0,
		},
		env: {
			// Test database configuration
			TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || process.env.DATABASE_URL,
			// Better Auth configuration for tests
			BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
			NEXT_PUBLIC_PROJECT_URL: process.env.NEXT_PUBLIC_PROJECT_URL || 'http://localhost:3000',
			// Test user credentials
			TEST_STUDENT_EMAIL: 'test-student@example.com',
			TEST_STUDENT_PASSWORD: 'TestPassword123!',
			TEST_EDUCATOR_EMAIL: 'test-educator@example.com',
			TEST_EDUCATOR_PASSWORD: 'TestPassword123!',
			TEST_ADMIN_EMAIL: 'test-admin@example.com',
			TEST_ADMIN_PASSWORD: 'TestPassword123!',
			TEST_SUPER_ADMIN_EMAIL: 'test-superadmin@example.com',
			TEST_SUPER_ADMIN_PASSWORD: 'TestPassword123!',
			// CI/CD flags
			CI: process.env.CI || false,
			GITHUB_ACTIONS: process.env.GITHUB_ACTIONS || false,
		},
		setupNodeEvents(on, config) {
			// CI/CD optimizations
			if (config.env.CI) {
				// Increase timeouts for CI environment
				config.defaultCommandTimeout = 15000
				config.requestTimeout = 15000
				config.responseTimeout = 15000
				config.pageLoadTimeout = 45000
				
				// Enable video recording in CI
				config.video = true
				config.videoCompression = 32
			}

			// Task for database seeding
			on('task', {
				async 'db:seed'() {
					const { seedTestUsers } = await import('./cypress/support/db-seed')
					return await seedTestUsers()
				},
				async 'db:cleanup'() {
					const { cleanupTestUsers } = await import('./cypress/support/db-seed')
					return await cleanupTestUsers()
				},
				log(message) {
					console.log(message)
					return null
				},
			})

			// Browser launch options for CI/CD
			on('before:browser:launch', (browser, launchOptions) => {
				if (browser.name === 'chrome' && config.env.CI) {
					launchOptions.args.push('--disable-dev-shm-usage')
					launchOptions.args.push('--no-sandbox')
					launchOptions.args.push('--disable-gpu')
					launchOptions.args.push('--disable-web-security')
					launchOptions.args.push('--disable-features=VizDisplayCompositor')
				}
				return launchOptions
			})

			// Test result reporting
			on('after:run', (results) => {
				if (config.env.CI) {
					console.log('Test Results Summary:')
					console.log(`Total Tests: ${results.totalTests}`)
					console.log(`Passed: ${results.totalPassed}`)
					console.log(`Failed: ${results.totalFailed}`)
					console.log(`Skipped: ${results.totalSkipped}`)
					console.log(`Duration: ${results.totalDuration}ms`)
				}
			})

			// Fail fast in CI if too many tests fail
			on('after:spec', (spec, results) => {
				if (config.env.CI && results.stats.failures > 5) {
					console.log('Too many failures, stopping test run')
					process.exit(1)
				}
			})
			
			return config
		},
		// Test file patterns
		specPattern: [
			'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
		],
		excludeSpecPattern: [
			'cypress/e2e/examples/*',
			'**/node_modules/**',
		],
	},

	component: {
		devServer: {
			framework: 'next',
			bundler: 'webpack',
		},
		specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
	},
})
