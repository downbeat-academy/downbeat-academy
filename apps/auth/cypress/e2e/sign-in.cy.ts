describe('Sign In Flow', () => {
	beforeEach(() => {
		cy.clearAllData()
		cy.checkServerHealth()
	})

	describe('Sign In Page', () => {
		it('should display the sign-in form', () => {
			cy.visit('/sign-in')

			// Check form elements are visible
			cy.get('[data-testid="email-input"]').should('be.visible')
			cy.get('[data-testid="password-input"]').should('be.visible')
			cy.get('[data-testid="sign-in-submit"]').should('be.visible')
		})

		it('should have a link to forgot password', () => {
			cy.visit('/sign-in')

			cy.contains('Forgot your password?').should('be.visible')
			cy.contains('Forgot your password?').should('have.attr', 'href', '/forgot-password')
		})

		it('should have tabs to switch between sign-in and sign-up', () => {
			cy.visit('/sign-in')

			// Sign in tab should be active by default
			cy.contains('Sign in').should('be.visible')
			cy.contains('Sign up').should('be.visible')

			// Switch to sign up tab
			cy.get('[data-testid="create-account-tab"]').click()

			// Sign up form should be visible
			cy.get('[data-testid="signup-name-input"]').should('be.visible')
		})
	})

	describe('Form Validation', () => {
		beforeEach(() => {
			cy.visit('/sign-in')
		})

		it('should show validation error for empty email', () => {
			cy.get('[data-testid="password-input"]').type('TestPassword123!')
			cy.submitSignIn()

			cy.contains('valid email').should('be.visible')
		})

		it('should show validation error for empty password', () => {
			cy.get('[data-testid="email-input"]').type('test@example.com')
			cy.submitSignIn()

			cy.contains('required').should('be.visible')
		})

		it('should show validation error for invalid email format', () => {
			cy.fillSignInForm('invalid-email', 'TestPassword123!')
			cy.submitSignIn()

			cy.contains('valid email').should('be.visible')
		})
	})

	describe('Authentication', () => {
		beforeEach(() => {
			cy.visit('/sign-in')
		})

		it('should show error for invalid credentials', () => {
			cy.fillSignInForm('nonexistent@example.com', 'WrongPassword123!')
			cy.submitSignIn()

			// Should show error toast or message
			cy.contains(/Sign in failed|Invalid|not found/i, { timeout: 10000 }).should('be.visible')
		})

		it('should disable submit button while submitting', () => {
			cy.fillSignInForm(Cypress.env('TEST_STUDENT_EMAIL'), Cypress.env('TEST_STUDENT_PASSWORD'))

			// Click and immediately check button state
			cy.get('[data-testid="sign-in-submit"]').click()
			cy.get('[data-testid="sign-in-submit"]').should('be.disabled')
		})

		it('should successfully sign in with valid credentials', () => {
			cy.fillSignInForm(Cypress.env('TEST_STUDENT_EMAIL'), Cypress.env('TEST_STUDENT_PASSWORD'))
			cy.submitSignIn()

			// Should redirect away from sign-in page
			cy.url({ timeout: 15000 }).should('not.include', '/sign-in')
		})
	})

	describe('Redirect URI', () => {
		it('should preserve redirect_uri parameter', () => {
			const redirectUri = encodeURIComponent('http://localhost:3000/account')
			cy.visit(`/sign-in?redirect_uri=${redirectUri}`)

			// Form should still be visible
			cy.get('[data-testid="email-input"]').should('be.visible')
		})

		it('should redirect to redirect_uri after successful login', () => {
			const targetUrl = Cypress.env('WWW_URL') + '/account'
			const redirectUri = encodeURIComponent(targetUrl)

			cy.visit(`/sign-in?redirect_uri=${redirectUri}`)
			cy.fillSignInForm(Cypress.env('TEST_STUDENT_EMAIL'), Cypress.env('TEST_STUDENT_PASSWORD'))
			cy.submitSignIn()

			// Should redirect to the target URL
			cy.url({ timeout: 15000 }).should('include', '/account')
		})
	})
})
