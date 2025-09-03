describe('User Journey Tests', () => {
	beforeEach(() => {
		cy.seedDatabase()
		cy.clearAllData()
	})

	afterEach(() => {
		cy.cleanDatabase()
	})

	describe('New User Onboarding Journey', () => {
		it('should complete full new user registration and setup journey', () => {
			const newUser = {
				name: 'Miles Davis',
				email: `test.miles.davis-${Date.now()}@example.com`,
				password: 'TestPassword123!'
			}

			// 1. Discover the site - Start at homepage
			cy.visit('/')
			cy.get('[data-testid="main-navigation"]').should('be.visible')

			// 2. Browse some content as anonymous user
			cy.get('[data-testid="nav-articles"]').click()
			cy.url().should('include', '/articles')
			
			cy.get('[data-testid="nav-handbook"]').click()
			cy.url().should('include', '/handbook')

			// 3. Decide to create account
			cy.get('[data-testid="sign-in-link"]').click()
			cy.url().should('include', '/sign-in')

			// 4. Register new account
			cy.get('[data-testid="create-account-tab"]').click()
			
			cy.get('[data-testid="signup-name-input"]').type(newUser.name)
			cy.get('[data-testid="signup-email-input"]').type(newUser.email)
			cy.get('[data-testid="signup-password-input"]').type(newUser.password)
			cy.get('[data-testid="signup-confirm-password-input"]').type(newUser.password)
			
			cy.get('[data-testid="signup-submit"]').click()

			// 5. See success message and email verification notice
			cy.contains('Account created').should('be.visible')
			cy.contains('verification link').should('be.visible')

			// 6. Navigate back to homepage after signup
			cy.visit('/')
			
			// Should still show sign-in link (user not verified yet)
			cy.get('[data-testid="sign-in-link"]').should('be.visible')
		})

		it('should guide user through email verification flow', () => {
			// Note: This test simulates the flow, actual email verification
			// would require email interception or mocked verification
			
			cy.visit('/sign-in')
			
			// Try to sign in with unverified account
			cy.get('[data-testid="email-input"]').type('test.unverified@example.com')
			cy.get('[data-testid="password-input"]').type(Cypress.env('TEST_STUDENT_PASSWORD'))
			cy.get('[data-testid="sign-in-submit"]').click()
			
			// Should see verification message
			cy.contains('verify your email').should('be.visible')
		})
	})

	describe('Returning User Journey', () => {
		it('should complete returning user sign-in and content exploration', () => {
			// 1. Return to site
			cy.visit('/')
			
			// 2. Sign in with existing account
			cy.get('[data-testid="sign-in-link"]').click()
			cy.url().should('include', '/sign-in')
			
			cy.get('[data-testid="email-input"]').type(Cypress.env('TEST_STUDENT_EMAIL'))
			cy.get('[data-testid="password-input"]').type(Cypress.env('TEST_STUDENT_PASSWORD'))
			cy.get('[data-testid="sign-in-submit"]').click()
			
			// 3. Should redirect to main area with logged in state
			cy.url().should('not.include', '/sign-in')
			cy.get('[data-testid="user-menu"]').should('be.visible')
			cy.get('[data-testid="account-link"]').should('be.visible')
			
			// 4. Explore content as authenticated user
			cy.get('[data-testid="nav-articles"]').click()
			cy.url().should('include', '/articles')
			cy.get('[data-testid="user-menu"]').should('be.visible') // Still logged in
			
			cy.get('[data-testid="nav-lexicon"]').click()
			cy.url().should('include', '/lexicon')
			
			// 5. Access account features
			cy.get('[data-testid="account-link"]').click()
			cy.url().should('include', '/account')
			
			// 6. Update profile
			cy.visit('/account/update-profile')
			cy.get('[data-testid="profile-name-input"]').should('be.visible')
			
			// 7. Sign out
			cy.logout()
			cy.get('[data-testid="sign-in-link"]').should('be.visible')
		})
	})

	describe('Content Discovery Journey', () => {
		it('should allow comprehensive content exploration', () => {
			// 1. Start at homepage
			cy.visit('/')
			
			// 2. Explore different content sections
			const contentSections = [
				{ link: '[data-testid="nav-articles"]', path: '/articles' },
				{ link: '[data-testid="nav-handbook"]', path: '/handbook' },
				{ link: '[data-testid="nav-jazz-language-lexicon"]', path: '/lexicon' },
				{ link: '[data-testid="nav-contributors"]', path: '/contributors' }
			]
			
			contentSections.forEach(({ link, path }) => {
				cy.visit('/')
				cy.get(link).click()
				cy.url().should('include', path)
				cy.get('[data-testid="main-navigation"]').should('be.visible')
			})
			
			// 3. Navigate between sections
			cy.visit('/articles')
			cy.get('[data-testid="nav-handbook"]').click()
			cy.url().should('include', '/handbook')
			
			cy.get('[data-testid="nav-lexicon"]').click()
			cy.url().should('include', '/lexicon')
			
			// 4. Return to homepage
			cy.get('header').within(() => {
				cy.get('a[href="/"]').first().click()
			})
			cy.url().should('eq', Cypress.config('baseUrl') + '/')
		})

		it('should provide smooth navigation experience', () => {
			cy.visit('/')
			
			// Test navigation flow doesn't have loading issues
			cy.get('[data-testid="nav-articles"]').click()
			cy.waitForPageLoad()
			
			cy.get('[data-testid="nav-about"]').click()
			cy.waitForPageLoad()
			
			cy.get('[data-testid="nav-contact"]').click()
			cy.waitForPageLoad()
			
			// All navigations should complete successfully
			cy.url().should('include', '/contact')
		})
	})

	describe('Contact and Engagement Journey', () => {
		it('should complete contact form submission journey', () => {
			// 1. User decides to get in touch
			cy.visit('/')
			cy.get('[data-testid="nav-contact"]').click()
			
			// 2. Fill out contact form
			const contactData = {
				name: 'Thelonious Monk',
				email: 'test.thelonious.monk@example.com',
				message: 'I\'m interested in learning more about jazz theory and would like to contribute to the community.'
			}
			
			cy.get('[data-testid="contact-name-input"]').type(contactData.name)
			cy.get('[data-testid="contact-email-input"]').type(contactData.email)
			cy.get('[data-testid="contact-message-input"]').type(contactData.message)
			
			// 3. Submit form
			cy.get('[data-testid="contact-submit"]').click()
			
			// 4. See success message
			cy.contains('Message sent').should('be.visible')
			
			// 5. Form should be cleared for potential additional messages
			cy.get('[data-testid="contact-name-input"]').should('have.value', '')
			
			// 6. User might want to sign up for newsletter too
			cy.visit('/newsletter')
			cy.get('[data-testid="newsletter-email-input"]').type(contactData.email)
			cy.get('[data-testid="newsletter-submit"]').click()
			
			cy.contains('Subscribed').should('be.visible')
		})
	})

	describe('Account Management Journey', () => {
		beforeEach(() => {
			cy.loginAsStudent()
		})

		it('should complete profile management tasks', () => {
			// 1. Access account area
			cy.visit('/account')
			cy.get('[data-testid="user-menu"]').should('be.visible')
			
			// 2. Update profile information
			cy.visit('/account/update-profile')
			
			const newName = 'Updated Test Name'
			cy.get('[data-testid="profile-name-input"]').clear().type(newName)
			cy.get('[data-testid="profile-update-submit"]').click()
			
			cy.contains('Profile updated').should('be.visible')
			
			// 3. Navigate to password change
			cy.visit('/account/update-password')
			cy.url().should('include', '/account/update-password')
			
			// 4. Return to main account page
			cy.visit('/account')
			cy.url().should('include', '/account')
			
			// 5. Continue browsing site with updated profile
			cy.get('[data-testid="nav-articles"]').click()
			cy.get('[data-testid="user-menu"]').should('be.visible') // Still logged in
		})

		it('should handle session management across multiple tabs/windows', () => {
			// 1. User is logged in
			cy.visit('/account')
			cy.get('[data-testid="user-menu"]').should('be.visible')
			
			// 2. Open new window (simulated by visiting same site)
			cy.visit('/articles')
			cy.get('[data-testid="user-menu"]').should('be.visible') // Still logged in
			
			// 3. Navigate between different areas
			cy.visit('/handbook')
			cy.get('[data-testid="user-menu"]').should('be.visible')
			
			// 4. Log out from one "tab" (current window)
			cy.logout()
			
			// 5. Verify logged out state
			cy.get('[data-testid="sign-in-link"]').should('be.visible')
		})
	})

	describe('Error Recovery Journey', () => {
		it('should handle and recover from navigation errors', () => {
			// 1. Start normal journey
			cy.visit('/')
			
			// 2. Try to access non-existent page
			cy.visit('/non-existent-page', { failOnStatusCode: false })
			
			// 3. Should show 404 but maintain navigation
			cy.get('[data-testid="main-navigation"]').should('be.visible')
			
			// 4. User can recover by navigating to valid page
			cy.get('[data-testid="nav-articles"]').click()
			cy.url().should('include', '/articles')
			
			// 5. Continue normal browsing
			cy.get('[data-testid="nav-handbook"]').click()
			cy.url().should('include', '/handbook')
		})

		it('should recover from form submission errors', () => {
			cy.visit('/contact')
			
			// 1. Try submitting form with invalid data
			cy.get('[data-testid="contact-name-input"]').type('Test')
			cy.get('[data-testid="contact-email-input"]').type('invalid-email')
			cy.get('[data-testid="contact-message-input"]').type('Test message')
			
			cy.get('[data-testid="contact-submit"]').click()
			
			// 2. Should show validation error
			cy.contains('valid email').should('be.visible')
			
			// 3. User corrects error and resubmits
			cy.get('[data-testid="contact-email-input"]').clear().type('test.user@example.com')
			cy.get('[data-testid="contact-submit"]').click()
			
			// 4. Should succeed
			cy.contains('Message sent').should('be.visible')
		})

		it('should handle authentication errors gracefully', () => {
			// 1. Try to sign in with wrong credentials
			cy.visit('/sign-in')
			
			cy.get('[data-testid="email-input"]').type('test.wrong@example.com')
			cy.get('[data-testid="password-input"]').type('wrongpassword')
			cy.get('[data-testid="sign-in-submit"]').click()
			
			// 2. Should show error message
			cy.contains('Sign in failed').should('be.visible')
			
			// 3. User can correct and try again
			cy.get('[data-testid="email-input"]').clear().type(Cypress.env('TEST_STUDENT_EMAIL'))
			cy.get('[data-testid="password-input"]').clear().type(Cypress.env('TEST_STUDENT_PASSWORD'))
			cy.get('[data-testid="sign-in-submit"]').click()
			
			// 4. Should succeed
			cy.url().should('not.include', '/sign-in')
			cy.get('[data-testid="user-menu"]').should('be.visible')
		})
	})

	describe('Cross-Device Journey Simulation', () => {
		it('should work consistently across different viewport sizes', () => {
			const viewports: Cypress.ViewportPreset[] = ['iphone-x', 'ipad-2', 'macbook-15']
			
			viewports.forEach(viewport => {
				cy.viewport(viewport)
				cy.visit('/')
				
				// Navigation should work on all sizes
				cy.get('[data-testid="main-navigation"], [data-testid="mobile-menu-toggle"]')
					.should('be.visible')
				
				// Can access key pages
				if (viewport === 'iphone-x') {
					// Mobile navigation
					cy.get('[data-testid="mobile-menu-toggle"]').click()
					cy.get('[data-testid="nav-articles"]').click()
				} else {
					// Desktop navigation
					cy.get('[data-testid="nav-articles"]').click()
				}
				
				cy.url().should('include', '/articles')
			})
		})

		it('should handle user switching between desktop and mobile', () => {
			// 1. Start on desktop
			cy.viewport('macbook-15')
			cy.visit('/')
			
			cy.get('[data-testid="nav-articles"]').click()
			cy.url().should('include', '/articles')
			
			// 2. Switch to mobile (user rotated device or resized browser)
			cy.viewport('iphone-x')
			
			// Mobile navigation should be available
			cy.get('[data-testid="mobile-menu-toggle"]').should('be.visible')
			
			// 3. Continue navigation on mobile
			cy.get('[data-testid="mobile-menu-toggle"]').click()
			cy.get('[data-testid="nav-handbook"]').click()
			
			cy.url().should('include', '/handbook')
		})
	})

	describe('Performance and Loading Journey', () => {
		it('should maintain good performance throughout user journey', () => {
			// 1. Homepage should load quickly
			cy.visit('/')
			cy.waitForPageLoad()
			
			// 2. Navigation between pages should be smooth
			const pages = ['/articles', '/handbook', '/lexicon', '/about', '/contact']
			
			pages.forEach(page => {
				cy.visit(page)
				cy.waitForPageLoad()
				
				// Page should be interactive
				cy.get('[data-testid="main-navigation"]').should('be.visible')
			})
			
			// 3. Forms should be responsive
			cy.visit('/contact')
			cy.get('[data-testid="contact-name-input"]').type('Test User')
			cy.get('[data-testid="contact-email-input"]').type('test.user@example.com')
			cy.get('[data-testid="contact-message-input"]').type('Test message')
			
			// Form should respond immediately to input
			cy.get('[data-testid="contact-name-input"]').should('have.value', 'Test User')
		})
	})

	describe('Complete End-to-End User Journey', () => {
		it('should complete a comprehensive user journey from discovery to engagement', () => {
			const newUser = {
				name: 'Charlie Parker',
				email: `test.charlie.parker-${Date.now()}@example.com`,
				password: 'TestPassword123!'
			}
			
			// 1. Discovery - User finds the site
			cy.visit('/')
			cy.get('[data-testid="main-navigation"]').should('be.visible')
			
			// 2. Exploration - Browse content without account
			cy.get('[data-testid="nav-articles"]').click()
			cy.url().should('include', '/articles')
			
			cy.get('[data-testid="nav-handbook"]').click()
			cy.url().should('include', '/handbook')
			
			// 3. Engagement - Contact form
			cy.get('[data-testid="nav-contact"]').click()
			cy.submitContactForm({
				name: newUser.name,
				email: newUser.email,
				message: 'Great content! I\'d like to learn more.'
			})
			cy.contains('Message sent').should('be.visible')
			
			// 4. Newsletter signup
			cy.visit('/newsletter')
			cy.subscribeToNewsletter(newUser.email)
			cy.contains('Subscribed').should('be.visible')
			
			// 5. Account creation
			cy.signup(newUser)
			cy.contains('Account created').should('be.visible')
			
			// 6. Continue browsing while thinking about email verification
			cy.visit('/lexicon')
			cy.url().should('include', '/lexicon')
			
			// 7. Return later and sign in (simulate verified email)
			cy.visit('/sign-in')
			cy.login(Cypress.env('TEST_STUDENT_EMAIL'), Cypress.env('TEST_STUDENT_PASSWORD'))
			
			// 8. Profile management
			cy.visit('/account/update-profile')
			cy.get('[data-testid="profile-name-input"]').clear().type('Updated Name')
			cy.get('[data-testid="profile-update-submit"]').click()
			cy.contains('Profile updated').should('be.visible')
			
			// 9. Continue using the site as authenticated user
			cy.get('[data-testid="nav-articles"]').click()
			cy.get('[data-testid="user-menu"]').should('be.visible')
			
			// 10. Eventually log out
			cy.logout()
			cy.get('[data-testid="sign-in-link"]').should('be.visible')
			
			// Journey complete - user has discovered, engaged, registered, and used the platform
		})
	})
})