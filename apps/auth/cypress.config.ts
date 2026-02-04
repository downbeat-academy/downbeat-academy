import { defineConfig } from 'cypress'

export default defineConfig({
	e2e: {
		baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3002',
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
		watchForFileChanges: false,
		// Allow cross-origin requests for testing redirects
		chromeWebSecurity: false,
		retries: {
			runMode: 2,
			openMode: 0,
		},
		env: {
			// Auth service URL
			AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL || 'http://localhost:3002',
			// www app URL (for redirect tests)
			WWW_URL: process.env.NEXT_PUBLIC_PROJECT_URL || 'http://localhost:3000',
			// Better Auth configuration for tests
			BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
			// Test database
			TEST_DATABASE_URL: process.env.DATABASE_URL_AUTH || process.env.DATABASE_URL,
			// Test user credentials
			TEST_STUDENT_EMAIL: process.env.TEST_STUDENT_EMAIL || 'test-student@example.com',
			TEST_STUDENT_PASSWORD: process.env.TEST_STUDENT_PASSWORD || 'TestPassword123!',
			TEST_EDUCATOR_EMAIL: process.env.TEST_EDUCATOR_EMAIL || 'test-educator@example.com',
			TEST_EDUCATOR_PASSWORD: process.env.TEST_EDUCATOR_PASSWORD || 'TestPassword123!',
			// CI/CD flags
			CI: process.env.CI || false,
		},
		async setupNodeEvents(on, config) {
			// CI/CD optimizations
			if (config.env.CI) {
				config.defaultCommandTimeout = 15000
				config.requestTimeout = 15000
				config.responseTimeout = 15000
				config.pageLoadTimeout = 45000
				config.video = true
			}

			on('task', {
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
					launchOptions.args.push('--window-size=1280,720')
				}
				return launchOptions
			})

			return config
		},
		specPattern: ['cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'],
	},
})
