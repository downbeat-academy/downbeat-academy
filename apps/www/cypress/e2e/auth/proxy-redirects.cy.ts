/**
 * Tests for Next.js 16 proxy authentication redirects.
 *
 * These tests verify that the proxy.ts configuration correctly:
 * 1. Redirects unauthenticated users from protected routes to /sign-in
 * 2. Redirects authenticated users from auth routes to /account
 * 3. Preserves callbackUrl for post-login redirect
 *
 * @see proxy.ts for route configuration
 */
describe('Proxy Authentication Redirects', () => {
	beforeEach(() => {
		cy.clearAllData()
	})

	describe('Protected Routes - Unauthenticated Users', () => {
		const protectedRoutes = ['/account']

		protectedRoutes.forEach((route) => {
			it(`should redirect unauthenticated users from ${route} to /sign-in`, () => {
				cy.visit(route, { failOnStatusCode: false })

				cy.url().should('include', '/sign-in')
			})

			it(`should include callbackUrl when redirecting from ${route}`, () => {
				cy.visit(route, { failOnStatusCode: false })

				cy.url().should('include', '/sign-in')
				cy.url().should('include', `callbackUrl=${encodeURIComponent(route)}`)
			})
		})

		it('should redirect from nested protected routes', () => {
			cy.visit('/account/profile', { failOnStatusCode: false })
			cy.url().should('include', '/sign-in')

			cy.visit('/account/settings', { failOnStatusCode: false })
			cy.url().should('include', '/sign-in')
		})
	})

	describe('Auth Routes - Authenticated Users', () => {
		const authRoutes = ['/sign-in', '/forgot-password', '/update-password']

		beforeEach(() => {
			cy.loginAsStudent()
		})

		authRoutes.forEach((route) => {
			it(`should redirect authenticated users from ${route} to /account`, () => {
				cy.visit(route, { failOnStatusCode: false })

				cy.url().should('include', '/account')
			})
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

	describe('API Routes - Excluded from Proxy', () => {
		it('should not intercept /api/auth routes', () => {
			// The proxy matcher excludes api/auth routes
			// This test verifies auth endpoints are accessible
			cy.request({
				url: '/api/auth/session',
				failOnStatusCode: false,
			}).then((response) => {
				// Should get a response (not blocked by proxy)
				expect(response.status).to.be.oneOf([200, 401])
			})
		})
	})

	describe('Proxy Error Handling', () => {
		it('should not cause 500 errors on protected routes', () => {
			// This test catches MIDDLEWARE_INVOCATION_FAILED errors
			cy.request({
				url: '/account',
				failOnStatusCode: false,
				followRedirect: false,
			}).then((response) => {
				// Should redirect (302/307) not error (500)
				expect(response.status).to.be.oneOf([302, 307])
				expect(response.status).to.not.equal(500)
			})
		})

		it('should not cause 500 errors on auth routes', () => {
			cy.request({
				url: '/sign-in',
				failOnStatusCode: false,
			}).then((response) => {
				// Should succeed (200) or redirect (302), not error (500)
				expect(response.status).to.be.oneOf([200, 302, 307])
				expect(response.status).to.not.equal(500)
			})
		})
	})
})
