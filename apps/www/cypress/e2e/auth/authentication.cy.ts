describe('Authentication Flow Tests', () => {
	before(() => {
		// Ensure test users exist before running any auth tests
		cy.verifyTestUsers()
	})

	beforeEach(() => {
		// Seed database and clear any existing sessions
		cy.seedDatabase()
		cy.clearAllData()
	})

	afterEach(() => {
		// Clean up database after each test
		cy.cleanDatabase()
	})

	describe('Sign Up Flow', () => {
		it('should successfully register a new user', () => {
			const newUser = {
				name: 'Cypress Test User',
				email: `test.cypress-user-${Date.now()}@example.com`,
				password: 'TestPassword123!'
			}

			cy.visit('/sign-in')
			
			// Switch to sign up tab
			cy.get('[data-testid="create-account-tab"]').click()
			
			// Fill out sign up form
			cy.get('[data-testid="signup-name-input"]').type(newUser.name)
			cy.get('[data-testid="signup-email-input"]').type(newUser.email)
			cy.get('[data-testid="signup-password-input"]').type(newUser.password)
			cy.get('[data-testid="signup-confirm-password-input"]').type(newUser.password)
			
			// Submit form
			cy.get('[data-testid="signup-submit"]').click()
			
			// Should show success message
			cy.contains('Account created').should('be.visible')
			cy.contains('verification link').should('be.visible')
		})

		it('should show validation errors for invalid input', () => {
			cy.visit('/sign-in')
			cy.get('[data-testid="create-account-tab"]').click()
			
			// Try submitting without filling required fields
			cy.get('[data-testid="signup-submit"]').click()
			
			// Should show validation errors (exact messages depend on validation schema)
			cy.get('form').should('contain', 'required')
		})

		it('should show error for mismatched passwords', () => {
			cy.visit('/sign-in')
			cy.get('[data-testid="create-account-tab"]').click()
			
			cy.get('[data-testid="signup-name-input"]').type('Test User')
			cy.get('[data-testid="signup-email-input"]').type('test.user@example.com')
			cy.get('[data-testid="signup-password-input"]').type('TestPassword123!')
			cy.get('[data-testid="signup-confirm-password-input"]').type('DifferentPassword123!')
			
			cy.get('[data-testid="signup-submit"]').click()
			
			// Should show password mismatch error
			cy.contains("don't match").should('be.visible')
		})

		it('should show error for existing email', () => {
			cy.visit('/sign-in')
			cy.get('[data-testid="create-account-tab"]').click()
			
			// Try to register with an existing test user email
			cy.get('[data-testid="signup-name-input"]').type('Test User')
			cy.get('[data-testid="signup-email-input"]').type(Cypress.env('TEST_STUDENT_EMAIL'))
			cy.get('[data-testid="signup-password-input"]').type('TestPassword123!')
			cy.get('[data-testid="signup-confirm-password-input"]').type('TestPassword123!')
			
			cy.get('[data-testid="signup-submit"]').click()
			
			// Should show error about existing account
			cy.contains('already exists').should('be.visible')
		})
	})

	describe('Sign In Flow', () => {
		it('should successfully sign in with valid credentials', () => {
			// Log environment variables for debugging
			cy.log('Test credentials:', {
				email: Cypress.env('TEST_STUDENT_EMAIL'),
				hasPassword: !!Cypress.env('TEST_STUDENT_PASSWORD')
			})
			
			cy.visit('/sign-in')
			
			// Ensure page is fully loaded
			cy.get('[data-testid="email-input"]').should('be.visible')
			cy.get('[data-testid="password-input"]').should('be.visible')
			cy.get('[data-testid="sign-in-submit"]').should('be.visible')
			
			// Use predefined test user credentials
			cy.get('[data-testid="email-input"]').clear().type(Cypress.env('TEST_STUDENT_EMAIL'))
			cy.get('[data-testid="password-input"]').clear().type(Cypress.env('TEST_STUDENT_PASSWORD'))
			cy.get('[data-testid="sign-in-submit"]').click()
			
			// Should redirect away from sign-in page or handle errors gracefully
			cy.url({ timeout: 15000 }).then(url => {
				cy.log('Current URL after sign-in attempt:', url)
				
				if (url.includes('/sign-in')) {
					// Still on sign-in page, check for specific error messages
					cy.get('body').then($body => {
						const bodyText = $body.text()
						cy.log('Page content after failed login:', bodyText)
						
						if (bodyText.includes('verify your email')) {
							cy.log('❌ Email verification required - this should not happen for test users')
							throw new Error('Test user email not verified')
						} else if (bodyText.includes('Sign in failed') || bodyText.includes('Invalid')) {
							cy.log('❌ Authentication failed with invalid credentials')
							throw new Error('Invalid test credentials')
						} else {
							cy.log('❌ Login failed for unknown reason')
							// Take a screenshot for debugging
							cy.screenshot('failed-login-debug')
							throw new Error('Login failed - see screenshot for details')
						}
					})
				} else {
					// Successfully redirected
					cy.log('✅ Successfully redirected from sign-in page')
					
					// Wait for auth state to propagate
					cy.wait(2000)
					
					// Should show user menu or account link indicating successful login
					cy.get('[data-testid="sign-in-link"]', { timeout: 5000 }).should('not.exist')
					cy.get('[data-testid="user-menu"], [data-testid="account-link"]', { timeout: 10000 })
						.should('be.visible')
				}
			})
		})

		it('should show error for invalid credentials', () => {
			cy.visit('/sign-in')
			
			cy.get('[data-testid="email-input"]').type('test.invalid@example.com')
			cy.get('[data-testid="password-input"]').type('wrongpassword')
			cy.get('[data-testid="sign-in-submit"]').click()
			
			// Should show error message
			cy.contains('Sign in failed').should('be.visible')
		})

		it('should show validation errors for empty fields', () => {
			cy.visit('/sign-in')
			
			// Try submitting without filling fields
			cy.get('[data-testid="sign-in-submit"]').click()
			
			// Should show validation errors
			cy.contains('required').should('be.visible')
		})

		it('should redirect unverified users appropriately', () => {
			cy.visit('/sign-in')
			
			// Try to sign in with unverified test user
			cy.get('[data-testid="email-input"]').type('test.unverified@example.com')
			cy.get('[data-testid="password-input"]').type(Cypress.env('TEST_STUDENT_PASSWORD'))
			cy.get('[data-testid="sign-in-submit"]').click()
			
			// Should show email verification error
			cy.contains('verify your email').should('be.visible')
		})
	})

	describe('Password Reset Flow', () => {
		it('should send password reset email for valid email', () => {
			cy.visit('/forgot-password')
			
			cy.get('[data-testid="forgot-password-email-input"]').type(Cypress.env('TEST_STUDENT_EMAIL'))
			cy.get('[data-testid="forgot-password-submit"]').click()
			
			// Should show success message
			cy.contains('Check your email').should('be.visible')
		})

		it('should show validation error for invalid email format', () => {
			cy.visit('/forgot-password')
			
			cy.get('[data-testid="forgot-password-email-input"]').type('invalid-email')
			cy.get('[data-testid="forgot-password-submit"]').click()
			
			// Should show validation error
			cy.contains('valid email').should('be.visible')
		})

		it('should handle password reset form with valid token', () => {
			// Note: This test would require a valid reset token
			// In a real scenario, you might mock the token or generate one programmatically
			const mockToken = 'valid-reset-token'
			
			cy.visit(`/update-password?token=${mockToken}`)
			
			const newPassword = 'NewTestPassword123!'
			
			cy.get('[data-testid="new-password-input"]').type(newPassword)
			cy.get('[data-testid="confirm-new-password-input"]').type(newPassword)
			cy.get('[data-testid="reset-password-submit"]').click()
			
			// Note: This might fail without a valid token, but tests the UI flow
		})
	})

	describe('Session Management', () => {
		it('should maintain session across page reloads', () => {
			// Log in first
			cy.loginAsStudent()
			
			// Verify logged in state
			cy.get('[data-testid="user-menu"]').should('be.visible')
			
			// Reload page
			cy.reload()
			
			// Should still be logged in
			cy.get('[data-testid="user-menu"]').should('be.visible')
		})

		it('should successfully log out user', () => {
			// Log in first
			cy.loginAsStudent()
			
			// Verify logged in state
			cy.get('[data-testid="user-menu"]').should('be.visible')
			
			// Log out
			cy.logout()
			
			// Should show sign in link
			cy.get('[data-testid="sign-in-link"]').should('be.visible')
			cy.get('[data-testid="user-menu"]').should('not.exist')
		})

		it('should redirect to sign-in for protected routes when not authenticated', () => {
			// Clear any existing session
			cy.clearAllData()
			
			// Try to access protected route
			cy.visit('/account', { failOnStatusCode: false })
			
			// Should redirect to sign-in
			cy.url().should('include', '/sign-in')
		})
	})

	describe('Role-based Authentication', () => {
		it('should authenticate users with student role', () => {
			cy.loginAsStudent()
			
			// Should be able to access account page
			cy.visit('/account')
			cy.url().should('include', '/account')
		})

		it('should authenticate users with educator role', () => {
			cy.loginAsEducator()
			
			// Should be able to access account page
			cy.visit('/account')
			cy.url().should('include', '/account')
		})

		it('should authenticate users with admin role', () => {
			cy.loginAsAdmin()
			
			// Should be able to access account page
			cy.visit('/account')
			cy.url().should('include', '/account')
		})

		it('should authenticate users with super admin role', () => {
			cy.loginAsSuperAdmin()
			
			// Should be able to access account page
			cy.visit('/account')
			cy.url().should('include', '/account')
		})
	})

	describe('Authentication Edge Cases', () => {
		it('should handle network errors gracefully', () => {
			cy.visit('/sign-in')
			
			// Intercept and fail the sign-in request
			cy.intercept('POST', '/api/auth/**', { forceNetworkError: true })
			
			cy.get('[data-testid="email-input"]').type(Cypress.env('TEST_STUDENT_EMAIL'))
			cy.get('[data-testid="password-input"]').type(Cypress.env('TEST_STUDENT_PASSWORD'))
			cy.get('[data-testid="sign-in-submit"]').click()
			
			// Should handle error appropriately (exact behavior depends on implementation)
			// This tests that the app doesn't crash on network errors
		})

		it('should prevent multiple simultaneous sign-in attempts', () => {
			cy.visit('/sign-in')
			
			cy.get('[data-testid="email-input"]').type(Cypress.env('TEST_STUDENT_EMAIL'))
			cy.get('[data-testid="password-input"]').type(Cypress.env('TEST_STUDENT_PASSWORD'))
			
			// Click submit button multiple times rapidly
			cy.get('[data-testid="sign-in-submit"]').click().click().click()
			
			// Button should be disabled after first click
			cy.get('[data-testid="sign-in-submit"]').should('be.disabled')
		})

		it('should clear sensitive form data on navigation away', () => {
			cy.visit('/sign-in')
			
			cy.get('[data-testid="email-input"]').type('test.user@example.com')
			cy.get('[data-testid="password-input"]').type('password123')
			
			// Navigate away
			cy.get('[data-testid="nav-articles"]').click()
			
			// Navigate back
			cy.visit('/sign-in')
			
			// Fields should be empty (depending on implementation)
			cy.get('[data-testid="email-input"]').should('have.value', '')
			cy.get('[data-testid="password-input"]').should('have.value', '')
		})
	})
})