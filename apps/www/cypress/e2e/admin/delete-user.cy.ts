/**
 * Deleting a user from the www admin dashboard (DBA-416).
 *
 * Deletion is superAdmin-only, and each test deletes a throwaway user rather
 * than a seeded one, so other specs keep their logins.
 */
describe('Admin: delete user', () => {
	let disposable: { id: string; email: string } | undefined

	beforeEach(() => {
		cy.seedDatabase()
		cy.clearAllData()
		cy.task<{ id: string; email: string }>('db:createDisposableUser').then((created) => {
			disposable = created
		})
	})

	afterEach(() => {
		// Guarded: if creation failed in beforeEach, this must not mask that error.
		if (disposable) cy.task('db:deleteUser', disposable.id)
		disposable = undefined
		cy.cleanDatabase()
	})

	function openActionsFor(email: string) {
		cy.visit(`/admin/users?q=${encodeURIComponent(email)}`)
		cy.contains('tr', email).within(() => {
			cy.contains('button', 'Actions').click()
		})
	}

	it('hides the delete action from a plain admin', () => {
		cy.loginAsAdmin()
		openActionsFor(disposable!.email)

		cy.get('[role="menu"]').should('contain', 'Copy user ID')
		cy.get('[role="menu"]').should('not.contain', 'Delete user')
	})

	it('lets a superAdmin delete a user after typing their email', () => {
		cy.loginAsSuperAdmin()
		openActionsFor(disposable!.email)
		cy.contains('[role="menuitem"]', 'Delete user').click()

		cy.get('dialog[open]').within(() => {
			cy.contains('button', 'Delete user').should('be.disabled')
			cy.get('input[name="confirmEmail"]').type('wrong@example.com')
			cy.contains('button', 'Delete user').should('be.disabled')
			cy.get('input[name="confirmEmail"]').clear().type(disposable!.email)
			cy.contains('button', 'Delete user').should('be.enabled').click()
		})

		cy.get('dialog[open]').should('not.exist')
		cy.contains('User deleted').should('be.visible')
		cy.contains('tr', disposable!.email).should('not.exist')
	})
})
