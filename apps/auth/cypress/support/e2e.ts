// ***********************************************************
// This file is processed and loaded automatically before test files.
// ***********************************************************

import './commands'

// Prevent uncaught exceptions from failing tests
Cypress.on('uncaught:exception', (err, runnable) => {
	// Log the error for debugging
	console.error('Uncaught exception:', err.message)

	// Return false to prevent the error from failing the test
	// This is useful for third-party scripts that throw errors
	return false
})

// Log test start/end for better debugging
beforeEach(() => {
	cy.debugLog(`Starting test: ${Cypress.currentTest.title}`)
})

afterEach(() => {
	cy.debugLog(`Finished test: ${Cypress.currentTest.title}`)
})
