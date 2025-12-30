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

/**
 * Handle uncaught exceptions from application code.
 *
 * Some errors are known framework issues that shouldn't fail tests:
 * - Next.js 16 Performance API bug: "cannot have a negative time stamp"
 *   This occurs during 404 page rendering in development/Turbopack mode
 *   and is a known Next.js issue, not an application bug.
 *
 * @see https://on.cypress.io/uncaught-exception-from-application
 */
Cypress.on('uncaught:exception', (err, runnable) => {
	// Next.js 16 Turbopack performance measurement bug
	// This error occurs when rendering 404 pages and is a framework issue
	if (err.message.includes('cannot have a negative time stamp')) {
		// Return false to prevent the error from failing the test
		return false
	}

	// Let other errors fail the test as normal
	return true
})
