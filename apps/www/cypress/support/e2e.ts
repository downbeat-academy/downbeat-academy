// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Every spec starts with analytics cookies accepted, so the consent banner does
// not cover the page and PostHog runs as it did before consent existed. Specs
// that test consent itself clear this cookie first — see
// cypress/e2e/analytics/cookie-consent.cy.ts.
beforeEach(() => {
	cy.setCookie('dba_analytics_consent', 'granted')
})
