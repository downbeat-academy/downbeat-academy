/// <reference types="cypress" />

// ***********************************************
// Custom Commands for Auth Service E2E Tests
// ***********************************************

/**
 * Clear all session data
 */
Cypress.Commands.add('clearAllData', () => {
	cy.clearCookies()
	cy.clearLocalStorage()
	cy.window().then((win) => {
		win.sessionStorage.clear()
	})
})

/**
 * Debug logging with timestamp
 */
Cypress.Commands.add('debugLog', (message: string, data?: any) => {
	const timestamp = new Date().toISOString()
	if (data) {
		cy.log(`[${timestamp}] ${message}`, data)
	} else {
		cy.log(`[${timestamp}] ${message}`)
	}
})

/**
 * Check server health
 */
Cypress.Commands.add('checkServerHealth', () => {
	cy.request({
		url: '/sign-in',
		timeout: 10000,
		retryOnStatusCodeFailure: true
	}).then(response => {
		expect(response.status).to.equal(200)
		cy.log('✅ Auth server is healthy')
	})
})

/**
 * Fill sign-in form
 */
Cypress.Commands.add('fillSignInForm', (email: string, password: string) => {
	cy.get('[data-testid="email-input"]').clear().type(email)
	cy.get('[data-testid="password-input"]').clear().type(password)
})

/**
 * Fill login form (alias for fillSignInForm with object parameter)
 */
Cypress.Commands.add('fillLoginForm', (credentials: { email: string; password: string }) => {
	cy.get('[data-testid="email-input"]').clear().type(credentials.email)
	cy.get('[data-testid="password-input"]').clear().type(credentials.password)
})

/**
 * Fill sign-up form
 */
Cypress.Commands.add('fillSignUpForm', (userData: { name: string; email: string; password: string }) => {
	cy.get('[data-testid="signup-name-input"]').clear().type(userData.name)
	cy.get('[data-testid="signup-email-input"]').clear().type(userData.email)
	cy.get('[data-testid="signup-password-input"]').clear().type(userData.password)
	cy.get('[data-testid="signup-confirm-password-input"]').clear().type(userData.password)
})

/**
 * Submit sign-in and wait for redirect
 */
Cypress.Commands.add('submitSignIn', () => {
	cy.get('[data-testid="sign-in-submit"]').click()
})

/**
 * Submit login (alias for submitSignIn)
 */
Cypress.Commands.add('submitLogin', () => {
	cy.get('[data-testid="sign-in-submit"]').click()
})

/**
 * Submit sign-up and wait for result
 */
Cypress.Commands.add('submitSignUp', () => {
	cy.get('[data-testid="signup-submit"]').click()
})

// Type declarations
declare global {
	namespace Cypress {
		interface Chainable {
			clearAllData(): Chainable<void>
			debugLog(message: string, data?: any): Chainable<void>
			checkServerHealth(): Chainable<void>
			fillSignInForm(email: string, password: string): Chainable<void>
			fillLoginForm(credentials: { email: string; password: string }): Chainable<void>
			fillSignUpForm(userData: { name: string; email: string; password: string }): Chainable<void>
			submitSignIn(): Chainable<void>
			submitLogin(): Chainable<void>
			submitSignUp(): Chainable<void>
		}
	}
}

export {}
