import 'cypress-axe'

describe('Navigation', () => {
	it('should navigate to the about page', () => {
		cy.visit('http://localhost:3000/')
		cy.get('a[href*="/about"]').click({ multiple: true })
		cy.url().should('include', '/about')
	})

	it('should navigate to the articles page', () => {
		cy.visit('http://localhost:3000/')
		cy.get('a[href*="/articles"]').click({ multiple: true })
		cy.url().should('include', '/articles')
	})
})
