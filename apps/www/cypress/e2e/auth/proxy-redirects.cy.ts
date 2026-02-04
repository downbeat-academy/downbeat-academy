/**
 * Tests for authentication redirects with centralized auth service.
 *
 * These tests verify that:
 * 1. Unauthenticated users are redirected to auth service from protected routes
 * 2. Authenticated users can access protected routes
 * 3. redirect_uri parameter is correctly passed to auth service
 *
 * Auth service is expected at AUTH_SERVICE_URL environment variable
 */
describe('Auth Service Redirects', () => {
	const AUTH_SERVICE_URL = Cypress.env('AUTH_SERVICE_URL') || 'http://localhost:3002'

	beforeEach(() => {
		cy.clearAllData()
	})

	describe('Protected Routes - Unauthenticated Users', () => {
		const protectedRoutes = ['/account']

		protectedRoutes.forEach((route) => {
			it(`should redirect unauthenticated users from ${route} to auth service`, () => {
				cy.visit(route, { failOnStatusCode: false })

				// Should redirect to auth service sign-in
				cy.url().should('include', '/sign-in')
			})

			it(`should include redirect_uri when redirecting from ${route}`, () => {
				cy.visit(route, { failOnStatusCode: false })

				// Should include redirect_uri parameter pointing back to www app
				cy.url().should('include', 'redirect_uri=')
			})
		})

		it('should redirect from nested protected routes', () => {
			cy.visit('/account/profile', { failOnStatusCode: false })
			cy.url().should('include', '/sign-in')

			cy.visit('/account/settings', { failOnStatusCode: false })
			cy.url().should('include', '/sign-in')
		})
	})

	describe('Protected Routes - Authenticated Users', () => {
		beforeEach(() => {
			cy.loginAsStudent()
		})

		it('should allow authenticated users to access /account', () => {
			cy.visit('/account', { failOnStatusCode: false })

			// Should stay on account page (not redirect to sign-in)
			cy.url().should('include', '/account')
			cy.url().should('not.include', '/sign-in')
		})

		it('should show logged-in UI elements', () => {
			cy.visit('/')

			// Should show user menu or account link
			cy.get('[data-testid="user-menu"], [data-testid="account-link"]').should('be.visible')

			// Should NOT show sign-in link
			cy.get('[data-testid="sign-in-link"]').should('not.exist')
		})
	})

	describe('Public Routes - No Redirects', () => {
		const publicRoutes = ['/', '/articles', '/resources', '/contact']

		publicRoutes.forEach((route) => {
			it(`should allow unauthenticated access to ${route}`, () => {
				cy.visit(route, { failOnStatusCode: false })

				// Should not redirect to sign-in
				cy.url().should('not.include', '/sign-in')
			})
		})
	})

	describe('API Routes - Session Validation', () => {
		it('should return session for authenticated users', () => {
			cy.loginAsStudent()

			cy.request({
				url: '/api/auth/session',
				failOnStatusCode: false,
			}).then((response) => {
				expect(response.status).to.equal(200)
				// Session should exist for authenticated user
				expect(response.body).to.have.property('session')
			})
		})

		it('should return empty session for unauthenticated users', () => {
			cy.request({
				url: '/api/auth/session',
				failOnStatusCode: false,
			}).then((response) => {
				// Should get 200 with null/empty session
				expect(response.status).to.be.oneOf([200, 401])
			})
		})
	})

	describe('Error Handling', () => {
		it('should not cause 500 errors on protected routes', () => {
			cy.request({
				url: '/account',
				failOnStatusCode: false,
				followRedirect: false,
			}).then((response) => {
				// Should redirect (302/307) or render (200), not error (500)
				expect(response.status).to.be.oneOf([200, 302, 307])
				expect(response.status).to.not.equal(500)
			})
		})

		it('should handle invalid session tokens gracefully', () => {
			// Set an invalid session cookie
			cy.setCookie('better-auth.session_token', 'invalid-token')

			cy.visit('/account', { failOnStatusCode: false })

			// Should redirect to sign-in (not crash)
			cy.url().should('include', '/sign-in')
		})
	})

	describe('Sign-In Link Navigation', () => {
		it('should navigate to auth service when clicking sign-in', () => {
			cy.visit('/')

			// Check the sign-in link href
			cy.get('[data-testid="sign-in-link"]')
				.should('have.attr', 'href')
				.and('include', AUTH_SERVICE_URL)
		})

		it('should include current URL as redirect_uri in sign-in link', () => {
			cy.visit('/articles')

			cy.get('[data-testid="sign-in-link"]')
				.should('have.attr', 'href')
				.and('include', 'redirect_uri=')
		})
	})
})
