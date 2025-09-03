/// <reference types="cypress" />
/// <reference types="cypress-axe" />

import { mount } from 'cypress/react18'

// Extend Cypress namespace with custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      // Component testing
      mount: typeof mount

      // Authentication commands
      login(email: string, password: string): Chainable<void>
      loginAsStudent(): Chainable<void>
      loginAsEducator(): Chainable<void>
      loginAsAdmin(): Chainable<void>
      loginAsSuperAdmin(): Chainable<void>
      logout(): Chainable<void>
      signup(userData: { name: string; email: string; password: string }): Chainable<void>
      
      // Database commands
      seedDatabase(): Chainable<void>
      cleanDatabase(): Chainable<void>
      verifyTestUsers(): Chainable<void>
      
      // Form commands
      submitContactForm(formData: { name: string; email: string; message: string }): Chainable<void>
      subscribeToNewsletter(email: string): Chainable<void>
      
      // Navigation commands
      visitProtectedRoute(route: string): Chainable<void>
      verifyRoleAccess(route: string, shouldHaveAccess: boolean): Chainable<void>
      
      // Accessibility commands
      checkA11y(context?: string | Node, options?: any, violationCallback?: (violations: any[]) => void): Chainable<void>
      auditA11y(context?: string): Chainable<void>
      injectAxe(): Chainable<void>
      
      // Keyboard navigation commands
      tab(): Chainable<JQuery<HTMLElement>>
      
      // Utility commands
      waitForPageLoad(): Chainable<void>
      clearAllData(): Chainable<void>
      screenshotWithName(name: string): Chainable<void>
      checkServerHealth(): Chainable<void>
      debugLog(message: string, data?: any): Chainable<void>
      waitForAuthState(): Chainable<void>
    }
  }
}

// Cypress environment variables
declare namespace Cypress {
  interface ResolvedConfigOptions {
    env: {
      TEST_DATABASE_URL: string
      BETTER_AUTH_SECRET: string
      NEXT_PUBLIC_PROJECT_URL: string
      TEST_STUDENT_EMAIL: string
      TEST_STUDENT_PASSWORD: string
      TEST_EDUCATOR_EMAIL: string
      TEST_EDUCATOR_PASSWORD: string
      TEST_ADMIN_EMAIL: string
      TEST_ADMIN_PASSWORD: string
      TEST_SUPER_ADMIN_EMAIL: string
      TEST_SUPER_ADMIN_PASSWORD: string
      CI: boolean
      GITHUB_ACTIONS: boolean
    }
  }
}

export {}