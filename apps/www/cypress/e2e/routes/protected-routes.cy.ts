/**
 * Protected Routes and Role-Based Access Control Tests
 *
 * With the centralized auth service, protected routes now redirect
 * to the auth service (auth.downbeatacademy.com) for authentication.
 */
describe('Protected Routes and Role-Based Access Control', () => {
	const AUTH_SERVICE_URL = Cypress.env('AUTH_SERVICE_URL') || 'http://localhost:3002'

	beforeEach(() => {
		cy.seedDatabase()
		cy.clearAllData()
	})

	afterEach(() => {
		cy.cleanDatabase()
	})

	describe('Account Route Protection', () => {
		it('should redirect unauthenticated users to auth service sign-in', () => {
			cy.visit('/account', { failOnStatusCode: false })

			// Should redirect to auth service sign-in page
			cy.url().should('include', '/sign-in')
		})

		it('should include redirect_uri when redirecting to sign-in', () => {
			cy.visit('/account', { failOnStatusCode: false })

			// Should include redirect_uri parameter
			cy.url().should('include', 'redirect_uri=')
		})

		it('should allow authenticated users to access account page', () => {
			cy.loginAsStudent()

			cy.visit('/account')

			// Should load account page successfully
			cy.url().should('include', '/account')
			cy.get('main').should('be.visible')
		})

		it('should show user-specific content on account page', () => {
			cy.loginAsStudent()

			cy.visit('/account')

			// Should show user menu indicating user is logged in
			cy.get('[data-testid="user-menu"], [data-testid="account-link"]').should('be.visible')

			// Should not show sign-in link
			cy.get('[data-testid="sign-in-link"]').should('not.exist')
		})
	})

	describe('Profile Management Routes', () => {
		it('should redirect unauthenticated users from profile pages', () => {
			cy.visit('/account/update-profile', { failOnStatusCode: false })

			cy.url().should('include', '/sign-in')
		})

		it('should redirect unauthenticated users from password pages', () => {
			cy.visit('/account/update-password', { failOnStatusCode: false })

			cy.url().should('include', '/sign-in')
		})
	})

	describe('Role-Based Access Control', () => {
		describe('Student Role Access', () => {
			beforeEach(() => {
				cy.loginAsStudent()
			})

			it('should access basic account features', () => {
				cy.visit('/account')
				cy.url().should('include', '/account')

				// Should see account page content
				cy.get('main').should('be.visible')
			})
		})

		describe('Educator Role Access', () => {
			beforeEach(() => {
				cy.loginAsEducator()
			})

			it('should access basic account features', () => {
				cy.visit('/account')
				cy.url().should('include', '/account')
			})
		})

		describe('Admin Role Access', () => {
			beforeEach(() => {
				cy.loginAsAdmin()
			})

			it('should access basic account features', () => {
				cy.visit('/account')
				cy.url().should('include', '/account')
			})
		})

		describe('Super Admin Role Access', () => {
			beforeEach(() => {
				cy.loginAsSuperAdmin()
			})

			it('should access all basic features', () => {
				cy.visit('/account')
				cy.url().should('include', '/account')
			})
		})
	})

	describe('Cross-Role Route Access', () => {
		it('should maintain role after navigation', () => {
			cy.loginAsAdmin()

			// Navigate to different pages
			cy.visit('/articles')
			cy.visit('/account')

			// Should still have admin access
			cy.get('[data-testid="user-menu"], [data-testid="account-link"]').should('be.visible')
			cy.url().should('include', '/account')
		})

		it('should handle role changes within session', () => {
			cy.loginAsStudent()
			cy.visit('/account')

			// Verify student access
			cy.url().should('include', '/account')

			// Verify the user maintains their role after reload
			cy.reload()
			cy.get('[data-testid="user-menu"], [data-testid="account-link"]').should('be.visible')
		})
	})

	describe('Session Persistence and Route Protection', () => {
		it('should maintain access after page reload', () => {
			cy.loginAsStudent()
			cy.visit('/account')

			// Verify access
			cy.url().should('include', '/account')

			// Reload page
			cy.reload()

			// Should still have access
			cy.url().should('include', '/account')
			cy.get('[data-testid="user-menu"], [data-testid="account-link"]').should('be.visible')
		})

		it('should lose access after logout', () => {
			cy.loginAsStudent()
			cy.visit('/account')

			// Verify access
			cy.url().should('include', '/account')

			// Logout
			cy.logout()

			// Try to access protected route again
			cy.visit('/account', { failOnStatusCode: false })

			// Should redirect to sign-in
			cy.url().should('include', '/sign-in')
		})

		it('should handle expired sessions gracefully', () => {
			cy.loginAsStudent()
			cy.visit('/account')

			// Clear session cookies to simulate expiration
			cy.clearCookies()

			// Try to navigate to another protected route
			cy.visit('/account', { failOnStatusCode: false })

			// Should redirect to sign-in
			cy.url().should('include', '/sign-in')
		})
	})

	describe('Route Authorization Edge Cases', () => {
		it('should handle direct URL access to protected routes', () => {
			// Try accessing various protected routes directly
			const protectedRoutes = ['/account']

			protectedRoutes.forEach(route => {
				cy.clearAllData()
				cy.visit(route, { failOnStatusCode: false })
				cy.url().should('include', '/sign-in')
			})
		})

		it('should redirect to intended route after authentication', () => {
			// Try to access protected route while unauthenticated
			cy.visit('/account', { failOnStatusCode: false })

			// Should redirect to sign-in
			cy.url().should('include', '/sign-in')

			// Verify redirect_uri is present
			cy.url().should('include', 'redirect_uri=')
		})

		it('should handle concurrent route access attempts', () => {
			cy.loginAsStudent()

			// Rapidly navigate between protected routes
			cy.visit('/account')
			cy.visit('/')
			cy.visit('/account')

			// Should handle all navigations properly
			cy.url().should('include', '/account')
			cy.get('[data-testid="user-menu"], [data-testid="account-link"]').should('be.visible')
		})
	})

	describe('Navigation Between Protected Routes', () => {
		beforeEach(() => {
			cy.loginAsStudent()
		})

		it('should allow navigation to account page', () => {
			cy.visit('/account')
			cy.url().should('include', '/account')
		})

		it('should maintain authentication state across protected routes', () => {
			cy.visit('/account')
			cy.url().should('include', '/account')
			cy.get('[data-testid="user-menu"], [data-testid="account-link"]').should('be.visible')

			// Navigate to home and back
			cy.visit('/')
			cy.get('[data-testid="user-menu"], [data-testid="account-link"]').should('be.visible')

			cy.visit('/account')
			cy.url().should('include', '/account')
			cy.get('[data-testid="user-menu"], [data-testid="account-link"]').should('be.visible')
		})
	})
})
