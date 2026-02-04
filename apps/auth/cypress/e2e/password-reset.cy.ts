describe('Password Reset Flow', () => {
	beforeEach(() => {
		cy.clearAllData()
		cy.checkServerHealth()
	})

	describe('Forgot Password Page', () => {
		beforeEach(() => {
			cy.visit('/forgot-password')
		})

		it('should display the forgot password form', () => {
			cy.get('[data-testid="forgot-password-email-input"]').should('be.visible')
			cy.get('[data-testid="forgot-password-submit"]').should('be.visible')
			cy.contains(/forgot.*password|reset.*password/i).should('be.visible')
		})

		it('should show validation error for empty email', () => {
			cy.get('[data-testid="forgot-password-submit"]').click()

			cy.contains(/email|required/i).should('be.visible')
		})

		it('should show validation error for invalid email', () => {
			cy.get('[data-testid="forgot-password-email-input"]').type('invalid-email')
			cy.get('[data-testid="forgot-password-submit"]').click()

			cy.contains(/valid email/i).should('be.visible')
		})

		it('should show success message for valid email submission', () => {
			cy.get('[data-testid="forgot-password-email-input"]').type('test@example.com')
			cy.get('[data-testid="forgot-password-submit"]').click()

			// Should show success message regardless of whether email exists (security best practice)
			cy.contains(/check your email|reset link|sent/i, { timeout: 10000 }).should('be.visible')
		})

		it('should disable submit button while submitting', () => {
			cy.get('[data-testid="forgot-password-email-input"]').type('test@example.com')
			cy.get('[data-testid="forgot-password-submit"]').click()
			cy.get('[data-testid="forgot-password-submit"]').should('be.disabled')
		})

		it('should have a link back to sign in', () => {
			cy.contains(/sign in|back to login/i).should('be.visible')
			cy.contains(/sign in|back to login/i).click()
			cy.url().should('include', '/sign-in')
		})
	})

	describe('Update Password Page', () => {
		it('should show error when accessing without token', () => {
			cy.visit('/update-password')

			cy.contains(/invalid|expired|token/i, { timeout: 10000 }).should('be.visible')
		})

		it('should show error for invalid token', () => {
			cy.visit('/update-password?token=invalid-token-12345')

			cy.contains(/invalid|expired|token/i, { timeout: 10000 }).should('be.visible')
		})

		it('should display password reset form with valid token format', () => {
			// Note: This test uses a mock token - in real scenarios, the token would be validated server-side
			// The form should still render even if token validation happens on submit
			cy.visit('/update-password?token=valid-looking-token-abc123')

			// The form should be visible (token validation may happen on submit)
			cy.get('[data-testid="update-password-input"]').should('exist')
			cy.get('[data-testid="update-password-confirm-input"]').should('exist')
			cy.get('[data-testid="update-password-submit"]').should('exist')
		})
	})

	describe('Update Password Form Validation', () => {
		beforeEach(() => {
			// Visit with a token parameter (validation happens server-side)
			cy.visit('/update-password?token=test-token-for-validation')
		})

		it('should show validation error for empty password', () => {
			cy.get('[data-testid="update-password-submit"]').click()

			cy.contains(/password|required/i).should('be.visible')
		})

		it('should show validation error for weak password', () => {
			cy.get('[data-testid="update-password-input"]').type('weak')
			cy.get('[data-testid="update-password-confirm-input"]').type('weak')
			cy.get('[data-testid="update-password-submit"]').click()

			cy.contains(/8 characters|uppercase|lowercase|number|special/i).should('be.visible')
		})

		it('should show validation error for mismatched passwords', () => {
			cy.get('[data-testid="update-password-input"]').type('NewPassword123!')
			cy.get('[data-testid="update-password-confirm-input"]').type('DifferentPassword123!')
			cy.get('[data-testid="update-password-submit"]').click()

			cy.contains(/don't match|do not match|mismatch/i).should('be.visible')
		})

		it('should show password requirements', () => {
			cy.contains(/8 characters/i).should('be.visible')
			cy.contains(/uppercase/i).should('be.visible')
			cy.contains(/lowercase/i).should('be.visible')
		})
	})

	describe('Password Reset with Existing User', () => {
		it('should accept password reset request for existing user email', () => {
			cy.visit('/forgot-password')

			// Use the test student email from environment
			cy.get('[data-testid="forgot-password-email-input"]').type(Cypress.env('TEST_STUDENT_EMAIL'))
			cy.get('[data-testid="forgot-password-submit"]').click()

			// Should show success message (same as non-existent email for security)
			cy.contains(/check your email|reset link|sent/i, { timeout: 10000 }).should('be.visible')
		})
	})
})
