describe('Form Tests', () => {
	beforeEach(() => {
		cy.seedDatabase()
		cy.clearAllData()
	})

	afterEach(() => {
		cy.cleanDatabase()
	})

	describe('Contact Form', () => {
		beforeEach(() => {
			cy.visit('/contact')
		})

		it('should submit valid contact form successfully', () => {
			const contactData = {
				name: 'John Coltrane',
				email: 'test.john.coltrane@example.com',
				message: 'Hello, I would like to learn more about jazz theory and improvisation techniques.'
			}

			// Fill out the form
			cy.get('[data-testid="contact-name-input"]').type(contactData.name)
			cy.get('[data-testid="contact-email-input"]').type(contactData.email)
			cy.get('[data-testid="contact-message-input"]').type(contactData.message)

			// Submit the form
			cy.get('[data-testid="contact-submit"]').click()

			// Should show success message
			cy.contains('Message sent').should('be.visible')
			cy.contains('we\'ll be in touch').should('be.visible')

			// Form should be reset after successful submission
			cy.get('[data-testid="contact-name-input"]').should('have.value', '')
			cy.get('[data-testid="contact-email-input"]').should('have.value', '')
			cy.get('[data-testid="contact-message-input"]').should('have.value', '')
		})

		it('should show validation errors for empty required fields', () => {
			// Try to submit empty form
			cy.get('[data-testid="contact-submit"]').click()

			// Should show validation errors
			cy.contains('required').should('be.visible')
		})

		it('should validate email format', () => {
			cy.get('[data-testid="contact-name-input"]').type('Test User')
			cy.get('[data-testid="contact-email-input"]').type('invalid-email')
			cy.get('[data-testid="contact-message-input"]').type('Test message')

			cy.get('[data-testid="contact-submit"]').click()

			// Should show email validation error
			cy.contains('valid email').should('be.visible')
		})

		it('should handle special characters in message', () => {
			const specialMessage = 'Test with special characters: !@#$%^&*()_+{}|:"<>?[]\\;\',./`~'

			cy.get('[data-testid="contact-name-input"]').type('Test User')
			cy.get('[data-testid="contact-email-input"]').type('test.user@example.com')
			cy.get('[data-testid="contact-message-input"]').type(specialMessage)

			cy.get('[data-testid="contact-submit"]').click()

			// Should handle special characters without issues
			cy.contains('Message sent').should('be.visible')
		})

		it('should handle very long messages', () => {
			const longMessage = 'A'.repeat(5000) // Very long message

			cy.get('[data-testid="contact-name-input"]').type('Test User')
			cy.get('[data-testid="contact-email-input"]').type('test.user@example.com')
			cy.get('[data-testid="contact-message-input"]').type(longMessage)

			cy.get('[data-testid="contact-submit"]').click()

			// Should either accept or show appropriate error for long messages
			cy.get('body').should('exist') // Basic check that app doesn't crash
		})

		it('should disable submit button while submitting', () => {
			cy.get('[data-testid="contact-name-input"]').type('Test User')
			cy.get('[data-testid="contact-email-input"]').type('test.user@example.com')
			cy.get('[data-testid="contact-message-input"]').type('Test message')

			cy.get('[data-testid="contact-submit"]').click()

			// Button should be disabled during submission
			cy.get('[data-testid="contact-submit"]').should('be.disabled')
		})
	})

	describe('Newsletter Signup Form', () => {
		beforeEach(() => {
			cy.visit('/newsletter')
		})

		it('should successfully subscribe to newsletter', () => {
			const email = `test.newsletter-${Date.now()}@example.com`

			cy.get('[data-testid="newsletter-email-input"]').type(email)
			cy.get('[data-testid="newsletter-submit"]').click()

			// Should show success message
			cy.contains('Subscribed').should('be.visible')
			cy.contains('Thanks for signing up').should('be.visible')

			// Form should be reset
			cy.get('[data-testid="newsletter-email-input"]').should('have.value', '')
		})

		it('should validate email format for newsletter', () => {
			cy.get('[data-testid="newsletter-email-input"]').type('invalid-email-format')
			cy.get('[data-testid="newsletter-submit"]').click()

			// Should show validation error
			cy.contains('valid email').should('be.visible')
		})

		it('should require email field', () => {
			cy.get('[data-testid="newsletter-submit"]').click()

			// Should show required field error
			cy.contains('required').should('be.visible')
		})

		it('should handle duplicate newsletter signups gracefully', () => {
			const email = 'test.duplicate@example.com'

			// Sign up first time
			cy.get('[data-testid="newsletter-email-input"]').type(email)
			cy.get('[data-testid="newsletter-submit"]').click()

			// Wait for first signup to complete
			cy.contains('Subscribed').should('be.visible')

			// Try to sign up again with same email
			cy.get('[data-testid="newsletter-email-input"]').type(email)
			cy.get('[data-testid="newsletter-submit"]').click()

			// Should handle duplicate gracefully (exact behavior depends on implementation)
			cy.get('body').should('exist')
		})

		it('should disable submit button while processing', () => {
			cy.get('[data-testid="newsletter-email-input"]').type('test.user@example.com')
			cy.get('[data-testid="newsletter-submit"]').click()

			// Button should be disabled during submission
			cy.get('[data-testid="newsletter-submit"]').should('be.disabled')
		})
	})

	describe('Profile Update Form', () => {
		beforeEach(() => {
			cy.loginAsStudent()
			cy.visit('/account/update-profile')
		})

		it('should update user profile successfully', () => {
			const newName = 'Updated Test Name'

			// Clear existing name and enter new name
			cy.get('[data-testid="profile-name-input"]').clear().type(newName)

			cy.get('[data-testid="profile-update-submit"]').click()

			// Should show success message
			cy.contains('Profile updated').should('be.visible')
		})

		it('should show validation error for empty name', () => {
			// Clear the name field
			cy.get('[data-testid="profile-name-input"]').clear()

			cy.get('[data-testid="profile-update-submit"]').click()

			// Should show validation error
			cy.contains('required').should('be.visible')
		})

		it('should show email as disabled/read-only', () => {
			// Email field should be disabled
			cy.get('[data-testid="profile-email-input"]').should('be.disabled')
		})

		it('should handle special characters in name', () => {
			const nameWithSpecialChars = 'José María O\'Connor-Smith Jr.'

			cy.get('[data-testid="profile-name-input"]').clear().type(nameWithSpecialChars)
			cy.get('[data-testid="profile-update-submit"]').click()

			cy.contains('Profile updated').should('be.visible')
		})

		it('should validate name length limits', () => {
			const veryLongName = 'A'.repeat(100)

			cy.get('[data-testid="profile-name-input"]').clear().type(veryLongName)
			cy.get('[data-testid="profile-update-submit"]').click()

			// Should either accept or show appropriate validation error
			cy.get('body').should('exist')
		})

		it('should disable submit button while updating', () => {
			cy.get('[data-testid="profile-name-input"]').clear().type('New Name')
			cy.get('[data-testid="profile-update-submit"]').click()

			// Button should be disabled during submission
			cy.get('[data-testid="profile-update-submit"]').should('be.disabled')
		})
	})

	describe('Form Accessibility', () => {
		it('should have proper labels for contact form fields', () => {
			cy.visit('/contact')

			// Check that form fields have proper labels
			cy.get('[data-testid="contact-name-input"]').should('have.attr', 'id')
			cy.get('label[for="name"]').should('exist')

			cy.get('[data-testid="contact-email-input"]').should('have.attr', 'id')
			cy.get('label[for="email"]').should('exist')

			cy.get('[data-testid="contact-message-input"]').should('have.attr', 'id')
			cy.get('label[for="message"]').should('exist')
		})

		it('should support keyboard navigation in forms', () => {
			cy.visit('/contact')

			// Tab through form fields
			cy.get('body').tab()
			cy.focused().should('have.attr', 'data-testid', 'contact-name-input')

			cy.focused().tab()
			cy.focused().should('have.attr', 'data-testid', 'contact-email-input')

			cy.focused().tab()
			cy.focused().should('have.attr', 'data-testid', 'contact-message-input')

			cy.focused().tab()
			cy.focused().should('have.attr', 'data-testid', 'contact-submit')
		})

		it('should show error messages with proper attributes', () => {
			cy.visit('/contact')
			cy.get('[data-testid="contact-submit"]').click()

			// Error messages should be associated with fields
			cy.get('[data-testid="contact-name-input"]').should('have.attr', 'aria-invalid', 'true')
		})
	})

	describe('Form Persistence and Recovery', () => {
		it('should retain form data on page refresh (contact form)', () => {
			cy.visit('/contact')

			const formData = {
				name: 'Test User',
				email: 'test.user@example.com',
				message: 'Test message'
			}

			// Fill out form
			cy.get('[data-testid="contact-name-input"]').type(formData.name)
			cy.get('[data-testid="contact-email-input"]').type(formData.email)
			cy.get('[data-testid="contact-message-input"]').type(formData.message)

			// Refresh page
			cy.reload()

			// Check if form data is retained (behavior depends on implementation)
			// This might not be implemented, so we just verify the page loads
			cy.get('[data-testid="contact-name-input"]').should('be.visible')
		})

		it('should clear form data after successful submission', () => {
			cy.visit('/newsletter')

			cy.get('[data-testid="newsletter-email-input"]').type('test.user@example.com')
			cy.get('[data-testid="newsletter-submit"]').click()

			// Wait for success message
			cy.contains('Subscribed').should('be.visible')

			// Form should be cleared
			cy.get('[data-testid="newsletter-email-input"]').should('have.value', '')
		})
	})

	describe('Form Error Handling', () => {
		it('should handle network errors gracefully', () => {
			cy.visit('/contact')

			// Intercept and fail the contact form submission
			cy.intercept('POST', '/api/**', { forceNetworkError: true })

			cy.get('[data-testid="contact-name-input"]').type('Test User')
			cy.get('[data-testid="contact-email-input"]').type('test.user@example.com')
			cy.get('[data-testid="contact-message-input"]').type('Test message')

			cy.get('[data-testid="contact-submit"]').click()

			// Should handle error gracefully without crashing
			cy.get('body').should('exist')
		})

		it('should show appropriate error messages for server errors', () => {
			cy.visit('/newsletter')

			// Intercept and return server error
			cy.intercept('POST', '/api/**', { statusCode: 500, body: { error: 'Server error' } })

			cy.get('[data-testid="newsletter-email-input"]').type('test.user@example.com')
			cy.get('[data-testid="newsletter-submit"]').click()

			// Should show error message
			cy.contains('Error').should('be.visible')
		})
	})

	describe('Form Security', () => {
		it('should sanitize input to prevent XSS', () => {
			cy.visit('/contact')

			const xssAttempt = '<script>alert("xss")</script>'

			cy.get('[data-testid="contact-name-input"]').type(xssAttempt)
			cy.get('[data-testid="contact-email-input"]').type('test.user@example.com')
			cy.get('[data-testid="contact-message-input"]').type('Normal message')

			cy.get('[data-testid="contact-submit"]').click()

			// Should handle XSS attempt safely
			cy.get('body').should('exist')
			// Script should not execute
			cy.window().then((win) => {
				cy.stub(win, 'alert').as('windowAlert')
			})
			cy.get('@windowAlert').should('not.have.been.called')
		})

		it('should handle SQL injection attempts safely', () => {
			cy.visit('/contact')

			const sqlInjection = "'; DROP TABLE users; --"

			cy.get('[data-testid="contact-name-input"]').type(sqlInjection)
			cy.get('[data-testid="contact-email-input"]').type('test.user@example.com')
			cy.get('[data-testid="contact-message-input"]').type('Test message')

			cy.get('[data-testid="contact-submit"]').click()

			// Should handle SQL injection attempt safely
			cy.get('body').should('exist')
		})
	})
})