describe('Public Routes Coverage', () => {
	beforeEach(() => {
		// Ensure we start each test without authentication
		cy.clearAllData()
	})

	describe('Homepage', () => {
		it('should load homepage successfully', () => {
			cy.visit('/')
			
			// Should not redirect to sign-in
			cy.url().should('eq', Cypress.config('baseUrl') + '/')
			
			// Should show main navigation
			cy.get('[data-testid="main-navigation"]').should('be.visible')
			
			// Should show sign-in link for unauthenticated users
			cy.get('[data-testid="sign-in-link"]').should('be.visible')
			
			// Should not show user menu
			cy.get('[data-testid="user-menu"]').should('not.exist')
		})

		it('should display main content sections', () => {
			cy.visit('/')
			
			// Check for key content areas (adjust based on actual homepage structure)
			cy.get('header').should('be.visible')
			cy.get('main').should('be.visible')
			
			// Should have working navigation links
			cy.get('[data-testid="nav-articles"]').should('be.visible').and('have.attr', 'href', '/articles')
			cy.get('[data-testid="nav-handbook"]').should('be.visible').and('have.attr', 'href', '/handbook')
		})

		it('should have working navigation menu', () => {
			cy.visit('/')
			
			// Test navigation links work
			cy.get('[data-testid="nav-articles"]').click()
			cy.url().should('include', '/articles')
			
			cy.go('back')
			
			cy.get('[data-testid="nav-handbook"]').click()
			cy.url().should('include', '/handbook')
		})
	})

	describe('Articles Section', () => {
		it('should load articles index page', () => {
			cy.visit('/articles')
			
			cy.url().should('include', '/articles')
			
			// Should show main navigation
			cy.get('[data-testid="main-navigation"]').should('be.visible')
			
			// Should show page content
			cy.get('main').should('be.visible')
		})

		it('should be accessible without authentication', () => {
			cy.clearAllData()
			cy.visit('/articles')
			
			// Should not redirect to sign-in
			cy.url().should('include', '/articles')
		})

		it('should have working navigation back to homepage', () => {
			cy.visit('/articles')
			
			// Click logo or home link to go back
			cy.get('header').within(() => {
				cy.get('a[href="/"]').first().click()
			})
			
			cy.url().should('eq', Cypress.config('baseUrl') + '/')
		})
	})

	describe('Handbook Section', () => {
		it('should load handbook index page', () => {
			cy.visit('/handbook')
			
			cy.url().should('include', '/handbook')
			cy.get('[data-testid="main-navigation"]').should('be.visible')
			cy.get('main').should('be.visible')
		})

		it('should be accessible without authentication', () => {
			cy.clearAllData()
			cy.visit('/handbook')
			
			cy.url().should('include', '/handbook')
		})
	})

	describe('Jazz Language Lexicon', () => {
		it('should load lexicon page', () => {
			cy.visit('/lexicon')
			
			cy.url().should('include', '/lexicon')
			cy.get('[data-testid="main-navigation"]').should('be.visible')
			cy.get('main').should('be.visible')
		})

		it('should be accessible without authentication', () => {
			cy.clearAllData()
			cy.visit('/lexicon')
			
			cy.url().should('include', '/lexicon')
		})
	})

	describe('Contributors Page', () => {
		it('should load contributors page', () => {
			cy.visit('/contributors')
			
			cy.url().should('include', '/contributors')
			cy.get('[data-testid="main-navigation"]').should('be.visible')
			cy.get('main').should('be.visible')
		})

		it('should be accessible without authentication', () => {
			cy.clearAllData()
			cy.visit('/contributors')
			
			cy.url().should('include', '/contributors')
		})
	})

	describe('About Page', () => {
		it('should load about page', () => {
			cy.visit('/about')
			
			cy.url().should('include', '/about')
			cy.get('[data-testid="main-navigation"]').should('be.visible')
			cy.get('main').should('be.visible')
		})

		it('should be accessible without authentication', () => {
			cy.clearAllData()
			cy.visit('/about')
			
			cy.url().should('include', '/about')
		})
	})

	describe('Contact Page', () => {
		it('should load contact page with form', () => {
			cy.visit('/contact')
			
			cy.url().should('include', '/contact')
			cy.get('[data-testid="main-navigation"]').should('be.visible')
			cy.get('main').should('be.visible')
			
			// Should show contact form
			cy.get('[data-testid="contact-name-input"]').should('be.visible')
			cy.get('[data-testid="contact-email-input"]').should('be.visible')
			cy.get('[data-testid="contact-message-input"]').should('be.visible')
			cy.get('[data-testid="contact-submit"]').should('be.visible')
		})

		it('should be accessible without authentication', () => {
			cy.clearAllData()
			cy.visit('/contact')
			
			cy.url().should('include', '/contact')
		})
	})

	describe('Newsletter Page', () => {
		it('should load newsletter signup page', () => {
			cy.visit('/newsletter')
			
			cy.url().should('include', '/newsletter')
			cy.get('[data-testid="main-navigation"]').should('be.visible')
			
			// Should show newsletter signup form
			cy.get('[data-testid="newsletter-email-input"]').should('be.visible')
			cy.get('[data-testid="newsletter-submit"]').should('be.visible')
		})

		it('should be accessible without authentication', () => {
			cy.clearAllData()
			cy.visit('/newsletter')
			
			cy.url().should('include', '/newsletter')
		})
	})

	describe('Authentication Pages', () => {
		it('should load sign-in page', () => {
			cy.visit('/sign-in')
			
			cy.url().should('include', '/sign-in')
			
			// Should show sign-in form
			cy.get('[data-testid="email-input"]').should('be.visible')
			cy.get('[data-testid="password-input"]').should('be.visible')
			cy.get('[data-testid="sign-in-submit"]').should('be.visible')
			
			// Should show sign-up tab
			cy.get('[data-testid="create-account-tab"]').should('be.visible')
		})

		it('should load forgot password page', () => {
			cy.visit('/forgot-password')
			
			cy.url().should('include', '/forgot-password')
			
			// Should show forgot password form
			cy.get('[data-testid="forgot-password-email-input"]').should('be.visible')
			cy.get('[data-testid="forgot-password-submit"]').should('be.visible')
		})
	})

	describe('Error Handling', () => {
		it('should show 404 page for non-existent routes', () => {
			cy.visit('/non-existent-route', { failOnStatusCode: false })
			
			// Should show 404 or not found content
			cy.contains('404').should('be.visible')
				.or(cy.contains('Not Found').should('be.visible'))
				.or(cy.contains('Page not found').should('be.visible'))
		})

		it('should maintain navigation on 404 pages', () => {
			cy.visit('/non-existent-route', { failOnStatusCode: false })
			
			// Should still show main navigation
			cy.get('[data-testid="main-navigation"]').should('be.visible')
			
			// Should be able to navigate back to home
			cy.get('header').within(() => {
				cy.get('a[href="/"]').first().click()
			})
			
			cy.url().should('eq', Cypress.config('baseUrl') + '/')
		})
	})

	describe('Mobile Navigation', () => {
		it('should show mobile menu toggle on smaller screens', () => {
			// Set viewport to mobile size
			cy.viewport('iphone-x')
			
			cy.visit('/')
			
			// Mobile menu toggle should be visible
			cy.get('[data-testid="mobile-menu-toggle"]').should('be.visible')
		})

		it('should toggle mobile menu correctly', () => {
			cy.viewport('iphone-x')
			cy.visit('/')
			
			// Click mobile menu toggle
			cy.get('[data-testid="mobile-menu-toggle"]').click()
			
			// Menu should expand (exact behavior depends on implementation)
			cy.get('[data-testid="mobile-menu-toggle"]').should('contain', 'Close')
			
			// Click again to close
			cy.get('[data-testid="mobile-menu-toggle"]').click()
			
			cy.get('[data-testid="mobile-menu-toggle"]').should('contain', 'Open')
		})

		it('should allow navigation through mobile menu', () => {
			cy.viewport('iphone-x')
			cy.visit('/')
			
			// Open mobile menu
			cy.get('[data-testid="mobile-menu-toggle"]').click()
			
			// Click on a navigation link
			cy.get('[data-testid="nav-articles"]').click()
			
			cy.url().should('include', '/articles')
		})
	})

	describe('SEO and Meta Tags', () => {
		it('should have proper page titles', () => {
			const pages = [
				{ url: '/', titlePattern: /Downbeat Academy/ },
				{ url: '/articles', titlePattern: /Articles.*Downbeat Academy/ },
				{ url: '/handbook', titlePattern: /Handbook.*Downbeat Academy/ },
				{ url: '/contact', titlePattern: /Contact.*Downbeat Academy/ }
			]

			pages.forEach(({ url, titlePattern }) => {
				cy.visit(url)
				cy.title().should('match', titlePattern)
			})
		})

		it('should have meta descriptions', () => {
			cy.visit('/')
			cy.get('meta[name="description"]').should('have.attr', 'content').and('not.be.empty')
		})
	})
})