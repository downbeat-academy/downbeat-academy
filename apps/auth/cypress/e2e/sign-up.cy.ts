describe('Sign Up Flow', () => {
	beforeEach(() => {
		cy.clearAllData()
		cy.checkServerHealth()
		cy.visit('/sign-in')
		// Switch to sign up tab
		cy.get('[data-testid="create-account-tab"]').click()
	})

	describe('Sign Up Form', () => {
		it('should display the sign-up form', () => {
			cy.get('[data-testid="signup-name-input"]').should('be.visible')
			cy.get('[data-testid="signup-email-input"]').should('be.visible')
			cy.get('[data-testid="signup-password-input"]').should('be.visible')
			cy.get('[data-testid="signup-confirm-password-input"]').should('be.visible')
			cy.get('[data-testid="signup-submit"]').should('be.visible')
		})

		it('should show password requirements helper text', () => {
			cy.contains('8 characters').should('be.visible')
			cy.contains('uppercase').should('be.visible')
			cy.contains('lowercase').should('be.visible')
		})
	})

	describe('Form Validation', () => {
		it('should show validation error for empty name', () => {
			cy.get('[data-testid="signup-email-input"]').type('test@example.com')
			cy.get('[data-testid="signup-password-input"]').type('TestPassword123!')
			cy.get('[data-testid="signup-confirm-password-input"]').type('TestPassword123!')
			cy.submitSignUp()

			cy.contains(/name|required/i).should('be.visible')
		})

		it('should show validation error for invalid email', () => {
			cy.get('[data-testid="signup-name-input"]').type('Test User')
			cy.get('[data-testid="signup-email-input"]').type('invalid-email')
			cy.get('[data-testid="signup-password-input"]').type('TestPassword123!')
			cy.get('[data-testid="signup-confirm-password-input"]').type('TestPassword123!')
			cy.submitSignUp()

			cy.contains('valid email').should('be.visible')
		})

		it('should show validation error for weak password', () => {
			cy.get('[data-testid="signup-name-input"]').type('Test User')
			cy.get('[data-testid="signup-email-input"]').type('test@example.com')
			cy.get('[data-testid="signup-password-input"]').type('weak')
			cy.get('[data-testid="signup-confirm-password-input"]').type('weak')
			cy.submitSignUp()

			cy.contains(/8 characters|uppercase|lowercase|number|special/i).should('be.visible')
		})

		it('should show validation error for mismatched passwords', () => {
			cy.get('[data-testid="signup-name-input"]').type('Test User')
			cy.get('[data-testid="signup-email-input"]').type('test@example.com')
			cy.get('[data-testid="signup-password-input"]').type('TestPassword123!')
			cy.get('[data-testid="signup-confirm-password-input"]').type('DifferentPassword123!')
			cy.submitSignUp()

			cy.contains("don't match").should('be.visible')
		})

		it('should show success indicator when password meets requirements', () => {
			cy.get('[data-testid="signup-password-input"]').type('TestPassword123!')

			cy.contains('meets all requirements').should('be.visible')
		})
	})

	describe('Registration', () => {
		it('should show error for existing email', () => {
			cy.fillSignUpForm({
				name: 'Test User',
				email: Cypress.env('TEST_STUDENT_EMAIL'),
				password: 'TestPassword123!'
			})
			cy.submitSignUp()

			cy.contains(/already exists|Account already exists/i, { timeout: 10000 }).should('be.visible')
		})

		it('should successfully register a new user', () => {
			const uniqueEmail = `cypress-test-${Date.now()}@example.com`

			cy.fillSignUpForm({
				name: 'Cypress Test User',
				email: uniqueEmail,
				password: 'TestPassword123!'
			})
			cy.submitSignUp()

			// Should show success message about verification email
			cy.contains(/Account created|verification/i, { timeout: 10000 }).should('be.visible')
		})

		it('should disable submit button while submitting', () => {
			const uniqueEmail = `cypress-test-${Date.now()}@example.com`

			cy.fillSignUpForm({
				name: 'Cypress Test User',
				email: uniqueEmail,
				password: 'TestPassword123!'
			})

			cy.get('[data-testid="signup-submit"]').click()
			cy.get('[data-testid="signup-submit"]').should('be.disabled')
		})
	})
})
