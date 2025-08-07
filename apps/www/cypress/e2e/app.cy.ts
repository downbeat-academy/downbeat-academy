import 'cypress-axe'

describe('Navigation', () => {
	it('should navigate to the about page', () => {
		cy.visit('/')
		cy.get('a[href*="/about"]').first().click()
		cy.url().should('include', '/about')
	})

	it('should navigate to the articles page', () => {
		cy.visit('/')
		cy.get('a[href*="/articles"]').first().click()
		cy.url().should('include', '/articles')
	})
})
