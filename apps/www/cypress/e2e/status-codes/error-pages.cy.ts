describe('Error Pages and Status Codes', () => {
  beforeEach(() => {
    // Clear any existing authentication
    cy.clearAllData()
  })

  describe('404 Page', () => {
    it('should return 404 status code for non-existent pages', () => {
      // Test a clearly non-existent page
      cy.request({
        url: '/this-page-definitely-does-not-exist',
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.equal(404)
        expect(response.body).to.include('404')
      })
    })

    it('should show proper 404 page in browser', () => {
      cy.visit('/this-page-definitely-does-not-exist', { failOnStatusCode: false })
      
      // Should show 404 content
      cy.contains('404').should('be.visible')
      cy.contains('Not Found', { matchCase: false }).should('be.visible')
    })

    it('should not return 500 error for non-existent routes', () => {
      const nonExistentRoutes = [
        '/fake-route',
        '/articles/non-existent-article',
        '/handbook/missing-chapter',
        '/lexicon/fake-entry'
      ]

      nonExistentRoutes.forEach(route => {
        cy.request({
          url: route,
          failOnStatusCode: false
        }).then(response => {
          // Should be 404, not 500
          expect(response.status).to.not.equal(500, `Route ${route} should not return 500 error`)
          expect(response.status).to.equal(404, `Route ${route} should return 404`)
        })
      })
    })
  })

  describe('API Routes', () => {
    it('should handle missing API routes gracefully', () => {
      cy.request({
        url: '/api/non-existent-endpoint',
        failOnStatusCode: false
      }).then(response => {
        // Should be 404, not 500
        expect(response.status).to.not.equal(500, 'API route should not return 500 error')
        expect(response.status).to.equal(404, 'API route should return 404')
      })
    })

    it('should return appropriate status for auth endpoints', () => {
      // Test auth session endpoint - should be accessible
      cy.request({
        url: '/api/auth/session',
        failOnStatusCode: false
      }).then(response => {
        // Should not be 500
        expect(response.status).to.not.equal(500, 'Auth session endpoint should not return 500')
        // Could be 200 (no session) or other valid status
        expect([200, 401, 404]).to.include(response.status)
      })
    })
  })

  describe('Protected Routes', () => {
    it('should handle protected routes correctly when not authenticated', () => {
      const protectedRoutes = [
        '/account',
        '/account/profile',
        '/account/settings'
      ]

      protectedRoutes.forEach(route => {
        cy.request({
          url: route,
          failOnStatusCode: false,
          followRedirect: false
        }).then(response => {
          // Should redirect (3xx) or return 401/403, not 500
          expect(response.status).to.not.equal(500, `Protected route ${route} should not return 500 error`)
          expect([301, 302, 307, 308, 401, 403]).to.include(response.status, 
            `Protected route ${route} should redirect or return auth error`)
        })
      })
    })

    it('should redirect to sign-in for protected routes in browser', () => {
      cy.visit('/account', { failOnStatusCode: false })
      
      // Should redirect to sign-in
      cy.url({ timeout: 10000 }).should('include', '/sign-in')
      
      // Should not show 500 error page
      cy.contains('500').should('not.exist')
      cy.contains('Internal Server Error').should('not.exist')
    })
  })

  describe('Error Boundary Testing', () => {
    it('should handle malformed URLs gracefully', () => {
      const malformedUrls = [
        '/articles/%',
        '/handbook//double-slash',
        '/lexicon/<script>',
        '/contact?param=<script>alert("xss")</script>'
      ]

      malformedUrls.forEach(url => {
        cy.request({
          url: encodeURI(url),
          failOnStatusCode: false
        }).then(response => {
          // Should not return 500 error
          expect(response.status).to.not.equal(500, `Malformed URL ${url} should not return 500 error`)
          // Should be 400 (bad request) or 404 (not found)
          expect([400, 404]).to.include(response.status, 
            `Malformed URL ${url} should return 400 or 404`)
        })
      })
    })

    it('should handle server errors gracefully in browser', () => {
      // Visit pages that might have issues and ensure no crashes
      const potentiallyProblematicRoutes = [
        '/',
        '/articles',
        '/handbook',
        '/about',
        '/contact'
      ]

      potentiallyProblematicRoutes.forEach(route => {
        cy.visit(route, { failOnStatusCode: false })
        
        // Should not show 500 error
        cy.get('body').should('not.contain', '500')
        cy.get('body').should('not.contain', 'Internal Server Error')
        cy.get('body').should('not.contain', 'Application error')
        
        // Should show some content (page loaded successfully)
        cy.get('body').should('not.be.empty')
      })
    })
  })

  describe('Health Checks', () => {
    it('should have accessible home page', () => {
      cy.request('/').then(response => {
        expect(response.status).to.equal(200)
        expect(response.body).to.include('html')
      })
    })

    it('should have accessible sign-in page', () => {
      cy.request('/sign-in').then(response => {
        expect(response.status).to.equal(200)
        expect(response.body).to.include('html')
        expect(response.body).to.include('sign')
      })
    })

    it('should handle CORS and headers properly', () => {
      cy.request('/').then(response => {
        // Check for security headers
        expect(response.headers).to.have.property('content-type')
        expect(response.headers['content-type']).to.include('text/html')
      })
    })
  })
})