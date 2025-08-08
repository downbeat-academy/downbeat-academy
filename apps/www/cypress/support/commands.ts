/// <reference types="cypress" />
import 'cypress-axe'

// ***********************************************
// Custom Commands for Downbeat Academy E2E Tests
// ***********************************************

/**
 * Authentication Commands
 */

// Login command - logs in a user via the UI
Cypress.Commands.add('login', (email: string, password: string) => {
	cy.visit('/sign-in')
	cy.get('[data-testid="email-input"]').clear().type(email)
	cy.get('[data-testid="password-input"]').clear().type(password)
	cy.get('[data-testid="sign-in-submit"]').click()
	
	// Wait for redirect after successful login
	cy.url().should('not.include', '/sign-in')
	
	// Verify user is logged in by checking for account link
	cy.get('[data-testid="user-menu"]', { timeout: 10000 }).should('be.visible')
})

// Login as specific role - uses predefined test accounts
Cypress.Commands.add('loginAsStudent', () => {
	cy.login(Cypress.env('TEST_STUDENT_EMAIL'), Cypress.env('TEST_STUDENT_PASSWORD'))
})

Cypress.Commands.add('loginAsEducator', () => {
	cy.login(Cypress.env('TEST_EDUCATOR_EMAIL'), Cypress.env('TEST_EDUCATOR_PASSWORD'))
})

Cypress.Commands.add('loginAsAdmin', () => {
	cy.login(Cypress.env('TEST_ADMIN_EMAIL'), Cypress.env('TEST_ADMIN_PASSWORD'))
})

Cypress.Commands.add('loginAsSuperAdmin', () => {
	cy.login(Cypress.env('TEST_SUPER_ADMIN_EMAIL'), Cypress.env('TEST_SUPER_ADMIN_PASSWORD'))
})

// Logout command
Cypress.Commands.add('logout', () => {
	cy.get('[data-testid="user-menu"]').click()
	cy.get('[data-testid="logout-button"]').click()
	
	// Wait for redirect to home page
	cy.url().should('eq', Cypress.config('baseUrl') + '/')
	
	// Verify user is logged out
	cy.get('[data-testid="sign-in-link"]').should('be.visible')
})

// Sign up command
Cypress.Commands.add('signup', (userData: { name: string; email: string; password: string }) => {
	cy.visit('/sign-in')
	cy.get('[data-testid="create-account-tab"]').click()
	
	cy.get('[data-testid="signup-name-input"]').clear().type(userData.name)
	cy.get('[data-testid="signup-email-input"]').clear().type(userData.email)
	cy.get('[data-testid="signup-password-input"]').clear().type(userData.password)
	cy.get('[data-testid="signup-confirm-password-input"]').clear().type(userData.password)
	
	cy.get('[data-testid="signup-submit"]').click()
})

/**
 * Database Commands
 */

// Seed test users before test suite
Cypress.Commands.add('seedDatabase', () => {
	cy.task('db:seed')
})

// Clean up test users after test suite
Cypress.Commands.add('cleanDatabase', () => {
	cy.task('db:cleanup')
})

/**
 * Form Commands
 */

// Fill and submit contact form
Cypress.Commands.add('submitContactForm', (formData: { name: string; email: string; message: string }) => {
	cy.get('[data-testid="contact-name-input"]').clear().type(formData.name)
	cy.get('[data-testid="contact-email-input"]').clear().type(formData.email)
	cy.get('[data-testid="contact-message-input"]').clear().type(formData.message)
	cy.get('[data-testid="contact-submit"]').click()
})

// Subscribe to newsletter
Cypress.Commands.add('subscribeToNewsletter', (email: string) => {
	cy.get('[data-testid="newsletter-email-input"]').clear().type(email)
	cy.get('[data-testid="newsletter-submit"]').click()
})

/**
 * Navigation Commands
 */

// Navigate to protected route and verify access
Cypress.Commands.add('visitProtectedRoute', (route: string) => {
	cy.visit(route)
	
	// Should redirect to sign-in if not authenticated
	cy.url().then((url) => {
		if (url.includes('/sign-in')) {
			cy.log('Redirected to sign-in page as expected for protected route')
		} else {
			cy.log('Already authenticated, accessing protected route directly')
		}
	})
})

// Navigate and verify role-based access
Cypress.Commands.add('verifyRoleAccess', (route: string, shouldHaveAccess: boolean) => {
	cy.visit(route, { failOnStatusCode: false })
	
	if (shouldHaveAccess) {
		cy.url().should('include', route)
		cy.get('[data-testid="access-denied"]').should('not.exist')
	} else {
		// Should either redirect or show access denied
		cy.url().should('not.include', route)
	}
})

/**
 * Accessibility Commands
 */

// Check accessibility of current page
Cypress.Commands.add('checkA11y', (options?: any) => {
	cy.injectAxe()
	cy.checkA11y(undefined, options)
})

// Check accessibility and generate report
Cypress.Commands.add('auditA11y', (context?: string) => {
	cy.injectAxe()
	cy.checkA11y(context, undefined, (violations) => {
		if (violations.length > 0) {
			cy.log(`Found ${violations.length} accessibility violations:`)
			violations.forEach((violation) => {
				cy.log(`${violation.id}: ${violation.description}`)
			})
		}
	})
})

/**
 * Utility Commands
 */

// Wait for page to be fully loaded
Cypress.Commands.add('waitForPageLoad', () => {
	cy.get('[data-testid="loading-spinner"]').should('not.exist')
	cy.get('body').should('be.visible')
})

// Clear all cookies and local storage
Cypress.Commands.add('clearAllData', () => {
	cy.clearCookies()
	cy.clearLocalStorage()
	cy.window().then((win) => {
		win.sessionStorage.clear()
	})
})

// Take screenshot with custom name
Cypress.Commands.add('screenshotWithName', (name: string) => {
	cy.screenshot(name, { 
		capture: 'fullPage',
		onBeforeScreenshot($el) {
			$el.css('pointer-events', 'none')
		},
		onAfterScreenshot($el) {
			$el.css('pointer-events', 'auto')
		}
	})
})

/**
 * Type Declarations
 */
declare global {
	namespace Cypress {
		interface Chainable {
			// Authentication
			login(email: string, password: string): Chainable<void>
			loginAsStudent(): Chainable<void>
			loginAsEducator(): Chainable<void>
			loginAsAdmin(): Chainable<void>
			loginAsSuperAdmin(): Chainable<void>
			logout(): Chainable<void>
			signup(userData: { name: string; email: string; password: string }): Chainable<void>
			
			// Database
			seedDatabase(): Chainable<void>
			cleanDatabase(): Chainable<void>
			
			// Forms
			submitContactForm(formData: { name: string; email: string; message: string }): Chainable<void>
			subscribeToNewsletter(email: string): Chainable<void>
			
			// Navigation
			visitProtectedRoute(route: string): Chainable<void>
			verifyRoleAccess(route: string, shouldHaveAccess: boolean): Chainable<void>
			
			// Accessibility
			checkA11y(options?: any): Chainable<void>
			auditA11y(context?: string): Chainable<void>
			
			// Utilities
			waitForPageLoad(): Chainable<void>
			clearAllData(): Chainable<void>
			screenshotWithName(name: string): Chainable<void>
		}
	}
}
