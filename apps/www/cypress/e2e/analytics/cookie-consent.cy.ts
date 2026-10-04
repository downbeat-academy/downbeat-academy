/**
 * The analytics-cookie banner, end to end. The unit tests in
 * src/components/cookie-consent cannot cover this part: jsdom has no Popover
 * API, so whether the banner reaches the top layer, survives Esc, and leaves no
 * PostHog cookie behind before consent is only observable in a browser.
 *
 * The support file accepts cookies before every spec; each test here clears
 * that first.
 */
const banner = () => cy.get('[data-cy="cookie-consent"]')

const posthogCookies = () =>
	cy.getCookies().then((cookies) => cookies.filter((c) => c.name.startsWith('ph_')))

describe('Cookie consent', () => {
	beforeEach(() => {
		cy.clearCookie('dba_analytics_consent')
	})

	it('shows to a new visitor, in the top layer, without blocking the page', () => {
		cy.visit('/')

		banner().should('be.visible').and('match', ':popover-open')
		cy.get('header').should('be.visible')
	})

	it('is not dismissed by Escape', () => {
		cy.visit('/')
		banner().should('be.visible')

		cy.get('body').type('{esc}')

		banner().should('be.visible')
	})

	it('stores no PostHog cookie before the visitor chooses', () => {
		cy.visit('/')
		banner().should('be.visible')

		posthogCookies().should('have.length', 0)
	})

	it('remembers a decline, and still stores no PostHog cookie', () => {
		cy.visit('/')
		banner().contains('button', 'Decline').click()

		banner().should('not.exist')
		cy.getCookie('dba_analytics_consent').should('have.property', 'value', 'denied')
		posthogCookies().should('have.length', 0)

		cy.reload()
		banner().should('not.exist')
	})

	it('remembers an accept', () => {
		cy.visit('/')
		banner().contains('button', 'Accept').click()

		banner().should('not.exist')
		cy.getCookie('dba_analytics_consent').should('have.property', 'value', 'granted')

		cy.reload()
		banner().should('not.exist')
	})

	it('reopens from Cookie settings in the footer', () => {
		cy.setCookie('dba_analytics_consent', 'denied')
		cy.visit('/')
		banner().should('not.exist')

		cy.get('footer').contains('button', 'Cookie settings').click()

		banner()
			.should('be.visible')
			.and('contain.text', 'You currently decline analytics cookies.')
		cy.focused().should('have.attr', 'data-cy', 'cookie-consent')
	})
})
