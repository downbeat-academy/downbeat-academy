/**
 * Authentication Flow Tests for www app
 *
 * With the centralized auth service at auth.downbeatacademy.com,
 * authentication UI has been moved to the auth service.
 * These tests verify:
 * 1. www correctly redirects to auth service for sign-in
 * 2. Session management works after auth service login
 * 3. Protected routes work with cross-domain cookies
 */
describe('Authentication Flow Tests', () => {
	const AUTH_SERVICE_URL = Cypress.env('AUTH_SERVICE_URL') || 'http://localhost:3002'

	before(() => {
		// Ensure test users exist before running any auth tests
		cy.verifyTestUsers()
	})

	beforeEach(() => {
		// Seed database and clear any existing sessions
		cy.seedDatabase()
		cy.clearAllData()
	})

	afterEach(() => {
		// Clean up database after each test
		cy.cleanDatabase()
	})

	describe('Auth Service Redirect', () => {
		it('should redirect sign-in link to auth service', () => {
			cy.visit('/')

			// Find the sign-in link and verify it points to auth service
			cy.get('[data-testid="sign-in-link"]').should('have.attr', 'href').and('include', AUTH_SERVICE_URL)
		})

		it('should redirect to auth service when accessing protected routes unauthenticated', () => {
			cy.visit('/account', { failOnStatusCode: false })

			// Should redirect to auth service sign-in page
			cy.url().should('include', AUTH_SERVICE_URL)
			cy.url().should('include', '/sign-in')
		})

		it('should include redirect_uri when redirecting to auth service', () => {
			cy.visit('/account', { failOnStatusCode: false })

			// Should include redirect_uri parameter pointing back to www
			cy.url().should('include', 'redirect_uri=')
			cy.url().should('include', encodeURIComponent('/account'))
		})
	})

	describe('Session Management', () => {
		it('should maintain session after login via auth service', () => {
			// Login using the custom command (which handles the cross-domain auth)
			cy.loginAsStudent()

			// Verify logged in state
			cy.get('[data-testid="user-menu"], [data-testid="account-link"]').should('be.visible')

			// Reload page
			cy.reload()

			// Should still be logged in
			cy.get('[data-testid="user-menu"], [data-testid="account-link"]').should('be.visible')
		})

		it('should successfully log out user', () => {
			// Log in first
			cy.loginAsStudent()

			// Verify logged in state
			cy.get('[data-testid="user-menu"], [data-testid="account-link"]').should('be.visible')

			// Log out
			cy.logout()

			// Should show sign in link
			cy.get('[data-testid="sign-in-link"]').should('be.visible')
			cy.get('[data-testid="user-menu"]').should('not.exist')
		})

		it('should redirect to sign-in for protected routes when not authenticated', () => {
			// Clear any existing session
			cy.clearAllData()

			// Try to access protected route
			cy.visit('/account', { failOnStatusCode: false })

			// Should redirect to auth service sign-in
			cy.url().should('include', '/sign-in')
		})

		it('should handle expired sessions gracefully', () => {
			cy.loginAsStudent()
			cy.visit('/account')

			// Clear session cookies to simulate expiration
			cy.clearCookies()

			// Try to navigate to another protected route
			cy.visit('/account', { failOnStatusCode: false })

			// Should redirect to auth service sign-in
			cy.url().should('include', '/sign-in')
		})
	})

	describe('Role-based Authentication', () => {
		it('should authenticate users with student role', () => {
			cy.loginAsStudent()

			// Should be able to access account page
			cy.visit('/account')
			cy.url().should('include', '/account')
		})

		it('should authenticate users with educator role', () => {
			cy.loginAsEducator()

			// Should be able to access account page
			cy.visit('/account')
			cy.url().should('include', '/account')
		})

		it('should authenticate users with admin role', () => {
			cy.loginAsAdmin()

			// Should be able to access account page
			cy.visit('/account')
			cy.url().should('include', '/account')
		})

		it('should authenticate users with super admin role', () => {
			cy.loginAsSuperAdmin()

			// Should be able to access account page
			cy.visit('/account')
			cy.url().should('include', '/account')
		})
	})

	describe('Cross-Domain Cookie Authentication', () => {
		it('should receive cookies from auth service', () => {
			cy.loginAsStudent()

			// Verify session cookies exist
			cy.getCookies().then(cookies => {
				// Should have auth-related cookies
				const authCookies = cookies.filter(c =>
					c.name.includes('session') ||
					c.name.includes('better-auth') ||
					c.name.includes('auth')
				)
				expect(authCookies.length).to.be.greaterThan(0)
			})
		})

		it('should persist session across page navigations', () => {
			cy.loginAsStudent()

			// Navigate to different public pages
			cy.visit('/')
			cy.get('[data-testid="user-menu"], [data-testid="account-link"]').should('be.visible')

			cy.visit('/articles')
			cy.get('[data-testid="user-menu"], [data-testid="account-link"]').should('be.visible')

			cy.visit('/account')
			cy.url().should('include', '/account')
			cy.get('[data-testid="user-menu"], [data-testid="account-link"]').should('be.visible')
		})
	})

	describe('Authentication Edge Cases', () => {
		it('should handle network errors gracefully during session check', () => {
			// Intercept and fail the session request
			cy.intercept('GET', '**/api/auth/session', { forceNetworkError: true })

			cy.visit('/', { failOnStatusCode: false })

			// Page should still load (not crash)
			cy.get('body').should('be.visible')
		})

		it('should handle malformed cookies gracefully', () => {
			// Set a malformed cookie
			cy.setCookie('better-auth.session_token', 'invalid-token-format')

			cy.visit('/account', { failOnStatusCode: false })

			// Should redirect to auth service sign-in (invalid session)
			cy.url().should('include', '/sign-in')
		})
	})
})
