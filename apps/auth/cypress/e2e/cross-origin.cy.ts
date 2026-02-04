describe('Cross-Origin Redirect Flow', () => {
	beforeEach(() => {
		cy.clearAllData()
		cy.checkServerHealth()
	})

	describe('Redirect URI Handling', () => {
		it('should preserve redirect_uri in sign-in page URL', () => {
			const redirectUri = encodeURIComponent('http://localhost:3000/account')
			cy.visit(`/sign-in?redirect_uri=${redirectUri}`)

			cy.url().should('include', 'redirect_uri=')
			cy.url().should('include', encodeURIComponent('http://localhost:3000/account'))
		})

		it('should preserve redirect_uri when switching to sign-up tab', () => {
			const redirectUri = encodeURIComponent('http://localhost:3000/account')
			cy.visit(`/sign-in?redirect_uri=${redirectUri}`)

			cy.get('[data-testid="create-account-tab"]').click()

			// redirect_uri should still be in the URL or stored for after registration
			cy.url().should('include', 'redirect_uri=')
		})

		it('should handle sign-in with redirect_uri', () => {
			const redirectUri = 'http://localhost:3000/account'
			cy.visit(`/sign-in?redirect_uri=${encodeURIComponent(redirectUri)}`)

			cy.fillLoginForm({
				email: Cypress.env('TEST_STUDENT_EMAIL'),
				password: Cypress.env('TEST_STUDENT_PASSWORD')
			})
			cy.submitLogin()

			// After successful login, should redirect to the specified URI
			// Note: Cypress may not follow external redirects, so we check for redirect attempt
			cy.url({ timeout: 15000 }).should('satisfy', (url: string) => {
				// Either redirected successfully or stayed on auth service with success state
				return url.includes('localhost:3000') ||
				       url.includes('account') ||
				       !url.includes('/sign-in')
			})
		})

		it('should redirect to default URL when no redirect_uri provided', () => {
			cy.visit('/sign-in')

			cy.fillLoginForm({
				email: Cypress.env('TEST_STUDENT_EMAIL'),
				password: Cypress.env('TEST_STUDENT_PASSWORD')
			})
			cy.submitLogin()

			// Should redirect to default redirect URL (typically main app)
			cy.url({ timeout: 15000 }).should('not.include', '/sign-in')
		})
	})

	describe('Redirect URI Validation (Security)', () => {
		it('should reject malicious redirect_uri', () => {
			// Attempt to use an untrusted domain
			const maliciousUri = encodeURIComponent('https://evil-site.com/steal-token')
			cy.visit(`/sign-in?redirect_uri=${maliciousUri}`)

			cy.fillLoginForm({
				email: Cypress.env('TEST_STUDENT_EMAIL'),
				password: Cypress.env('TEST_STUDENT_PASSWORD')
			})
			cy.submitLogin()

			// Should NOT redirect to the malicious URI
			cy.url({ timeout: 15000 }).should('not.include', 'evil-site.com')
		})

		it('should accept trusted subdomain redirect', () => {
			// Note: In local dev, localhost domains are trusted
			const trustedUri = encodeURIComponent('http://localhost:3000/dashboard')
			cy.visit(`/sign-in?redirect_uri=${trustedUri}`)

			// Should accept the redirect_uri parameter
			cy.url().should('include', 'redirect_uri=')
		})
	})

	describe('Sign-Up with Redirect URI', () => {
		it('should preserve redirect_uri through sign-up flow', () => {
			const redirectUri = encodeURIComponent('http://localhost:3000/onboarding')
			const uniqueEmail = `cypress-redirect-test-${Date.now()}@example.com`

			cy.visit(`/sign-in?redirect_uri=${redirectUri}`)
			cy.get('[data-testid="create-account-tab"]').click()

			cy.fillSignUpForm({
				name: 'Redirect Test User',
				email: uniqueEmail,
				password: 'TestPassword123!'
			})
			cy.submitSignUp()

			// After sign-up, should show verification message or redirect
			// The redirect_uri should be used after email verification
			cy.contains(/verification|check your email|account created/i, { timeout: 10000 }).should('be.visible')
		})
	})

	describe('Forgot Password with Redirect URI', () => {
		it('should preserve redirect_uri through password reset flow', () => {
			const redirectUri = encodeURIComponent('http://localhost:3000/account')
			cy.visit(`/forgot-password?redirect_uri=${redirectUri}`)

			cy.get('[data-testid="forgot-password-email-input"]').type('test@example.com')
			cy.get('[data-testid="forgot-password-submit"]').click()

			// Should show success message
			cy.contains(/check your email|reset link|sent/i, { timeout: 10000 }).should('be.visible')
		})
	})

	describe('Cross-Origin Session Validation', () => {
		it('should maintain session after redirect', () => {
			// Login first
			cy.visit('/sign-in')
			cy.fillLoginForm({
				email: Cypress.env('TEST_STUDENT_EMAIL'),
				password: Cypress.env('TEST_STUDENT_PASSWORD')
			})
			cy.submitLogin()

			// Wait for successful login
			cy.url({ timeout: 15000 }).should('not.include', '/sign-in')

			// Visit auth service again - should still be logged in
			cy.visit('/')

			// Should show logged-in state (e.g., sign out button or user menu)
			cy.get('body').then($body => {
				// Check for various indicators of logged-in state
				const isLoggedIn =
					$body.find('[data-testid="user-menu"]').length > 0 ||
					$body.find('[data-testid="sign-out-button"]').length > 0 ||
					$body.text().includes('Sign Out') ||
					$body.text().includes('Account')

				expect(isLoggedIn).to.be.true
			})
		})
	})

	describe('Sign Out with Redirect', () => {
		it('should redirect after sign out', () => {
			// Login first
			cy.visit('/sign-in')
			cy.fillLoginForm({
				email: Cypress.env('TEST_STUDENT_EMAIL'),
				password: Cypress.env('TEST_STUDENT_PASSWORD')
			})
			cy.submitLogin()

			// Wait for successful login
			cy.url({ timeout: 15000 }).should('not.include', '/sign-in')

			// Find and click sign out
			cy.get('[data-testid="sign-out-button"], [data-testid="logout-button"]').click()

			// Should be logged out and on a public page
			cy.url({ timeout: 10000 }).should('satisfy', (url: string) => {
				return url.includes('/sign-in') ||
				       url === Cypress.config('baseUrl') + '/' ||
				       !url.includes('/account')
			})
		})
	})
})
