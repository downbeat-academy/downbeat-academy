/**
 * Admin Dashboard Access Control Tests
 *
 * Tests that the admin dashboard enforces role-based access control.
 * Unauthenticated and unauthorized users should be redirected.
 */
describe('Admin Dashboard Access Control', () => {
	beforeEach(() => {
		cy.clearAllData()
	})

	describe('Unauthenticated Access', () => {
		it('should redirect unauthenticated users from /admin to sign-in', () => {
			cy.visit('/admin', { failOnStatusCode: false })
			cy.url().should('include', '/sign-in')
		})

		it('should redirect unauthenticated users from /admin/users to sign-in', () => {
			cy.visit('/admin/users', { failOnStatusCode: false })
			cy.url().should('include', '/sign-in')
		})

		it('should redirect unauthenticated users from /admin/sessions to sign-in', () => {
			cy.visit('/admin/sessions', { failOnStatusCode: false })
			cy.url().should('include', '/sign-in')
		})

		it('should redirect unauthenticated users from user detail page to sign-in', () => {
			cy.visit('/admin/users/some-user-id', { failOnStatusCode: false })
			cy.url().should('include', '/sign-in')
		})

		it('should include callbackURL when redirecting to sign-in', () => {
			cy.visit('/admin', { failOnStatusCode: false })
			cy.url().should('include', 'callbackURL=')
		})
	})

	describe('Admin Route Structure', () => {
		it('should have /admin as a valid route', () => {
			// Verify the route exists by checking it redirects (not 404)
			cy.visit('/admin', { failOnStatusCode: false })
			// Should redirect to sign-in, not show a 404
			cy.url().should('include', '/sign-in')
			cy.get('body').should('not.contain', '404')
		})

		it('should have /admin/users as a valid route', () => {
			cy.visit('/admin/users', { failOnStatusCode: false })
			cy.url().should('include', '/sign-in')
			cy.get('body').should('not.contain', '404')
		})

		it('should have /admin/sessions as a valid route', () => {
			cy.visit('/admin/sessions', { failOnStatusCode: false })
			cy.url().should('include', '/sign-in')
			cy.get('body').should('not.contain', '404')
		})
	})
})
