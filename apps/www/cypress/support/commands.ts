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
	cy.debugLog(`🔑 Attempting login with email: ${email}`)
	
	// Check server health before attempting login
	cy.checkServerHealth()
	
	cy.visit('/sign-in')
	
	// Wait for page to load with better error handling
	cy.get('[data-testid="email-input"]', { timeout: 10000 }).should('be.visible')
	cy.get('[data-testid="password-input"]', { timeout: 10000 }).should('be.visible')
	cy.get('[data-testid="sign-in-submit"]', { timeout: 10000 }).should('be.visible')
	
	// Clear and fill in credentials
	cy.get('[data-testid="email-input"]').clear().type(email, { delay: 50 })
	cy.get('[data-testid="password-input"]').clear().type(password, { delay: 50 })
	
	// Ensure form is ready
	cy.get('[data-testid="sign-in-submit"]').should('not.be.disabled')
	
	// Submit the form
	cy.get('[data-testid="sign-in-submit"]').click()
	
	// Handle different possible outcomes with better timeout and error detection
	cy.url({ timeout: 20000 }).then(url => {
		cy.debugLog(`Current URL after login attempt: ${url}`)
		
		if (url.includes('/sign-in')) {
			// Still on sign-in page, check for specific error messages
			cy.get('body').then($body => {
				const bodyText = $body.text()
				cy.debugLog(`Page content after failed login:`, bodyText)
				
				if (bodyText.includes('verify your email') || bodyText.includes('Please verify')) {
					cy.debugLog('❌ User email verification required')
					throw new Error(`Email verification required for user: ${email}`)
				} else if (bodyText.includes('Sign in failed') || bodyText.includes('Invalid') || bodyText.includes('incorrect')) {
					cy.debugLog('❌ Invalid credentials provided')
					throw new Error(`Invalid credentials for user: ${email}`)
				} else if (bodyText.includes('not found') || bodyText.includes('does not exist')) {
					cy.debugLog('❌ User does not exist')
					throw new Error(`User does not exist: ${email}`)
				} else {
					cy.debugLog('❌ Login failed for unknown reason')
					// Take a screenshot for debugging
					cy.screenshotWithName(`failed-login-${email.replace('@', '-at-')}`)
					throw new Error(`Login failed for unknown reason. Check screenshot for details. User: ${email}`)
				}
			})
		} else {
			// Successfully redirected, verify authentication state
			cy.debugLog('✅ Successfully redirected from sign-in page')
			
			// Wait for auth state to propagate
			cy.waitForAuthState()
			
			// Check for authentication indicators with better error messages
			cy.get('body').then($body => {
				// Look for sign-in link (should not exist when logged in)
				if ($body.find('[data-testid="sign-in-link"]').length > 0) {
					cy.debugLog('❌ Sign-in link still visible after login')
					throw new Error('User appears to not be authenticated (sign-in link visible)')
				}
				
				// Look for user menu or account link
				const hasUserMenu = $body.find('[data-testid="user-menu"]').length > 0
				const hasAccountLink = $body.find('[data-testid="account-link"]').length > 0
				
				if (!hasUserMenu && !hasAccountLink) {
					cy.debugLog('❌ No authentication indicators found in header')
					cy.screenshotWithName(`missing-auth-indicators-${email.replace('@', '-at-')}`)
					throw new Error('No user menu or account link found after login')
				}
				
				cy.debugLog(`✅ Login successful for ${email}`)
			})
		}
	})
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
	cy.debugLog('🌱 Seeding test database...')
	cy.task('db:seed').then((result) => {
		if (result) {
			cy.debugLog('✅ Database seeding completed')
		} else {
			cy.debugLog('❌ Database seeding failed')
			throw new Error('Database seeding failed')
		}
	})
})

// Clean up test users after test suite
Cypress.Commands.add('cleanDatabase', () => {
	cy.debugLog('🧹 Cleaning up test database...')
	cy.task('db:cleanup').then((result) => {
		if (result) {
			cy.debugLog('✅ Database cleanup completed')
		} else {
			cy.debugLog('⚠️ Database cleanup had issues but continuing...')
		}
	})
})

// Verify test users exist before test suite
Cypress.Commands.add('verifyTestUsers', () => {
	cy.debugLog('🔍 Verifying test users exist...')
	cy.task('db:verify').then((result) => {
		if (result) {
			cy.debugLog('✅ Test users verified')
		} else {
			cy.debugLog('❌ Test user verification failed')
			throw new Error('Test users are not properly set up')
		}
	})
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
 * Keyboard Navigation Commands
 */

// Tab navigation command
Cypress.Commands.add('tab', { prevSubject: 'optional' }, (subject) => {
	const tabEvent = { keyCode: 9, which: 9, key: 'Tab' }
	
	if (subject) {
		cy.wrap(subject).trigger('keydown', tabEvent)
	} else {
		cy.get('body').trigger('keydown', tabEvent)
	}
	
	return cy.focused()
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

// Check server health before critical operations
Cypress.Commands.add('checkServerHealth', () => {
	cy.request({
		url: '/',
		timeout: 10000,
		retryOnStatusCodeFailure: true
	}).then(response => {
		expect(response.status).to.equal(200)
		cy.log('✅ Server is healthy')
	})
})

// Enhanced debug logging
Cypress.Commands.add('debugLog', (message: string, data?: any) => {
	const timestamp = new Date().toISOString()
	if (data) {
		cy.log(`[${timestamp}] ${message}`, data)
	} else {
		cy.log(`[${timestamp}] ${message}`)
	}
})

// Wait for authentication state to settle
Cypress.Commands.add('waitForAuthState', () => {
	// Wait for auth state to propagate through the app
	cy.wait(1000)
	
	// Check that the page is stable
	cy.get('body').should('be.visible')
	
	// Allow additional time for React state updates
	cy.wait(1000)
})

// Type declarations are now in support/index.d.ts
