/// <reference types="vitest" />

import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Unmount any rendered components and reset jsdom between tests.
afterEach(() => {
	cleanup()
})

// Mock ResizeObserver for tests (mirrors cadence-core setup; needed by Radix UI).
global.ResizeObserver =
	global.ResizeObserver ||
	class ResizeObserver {
		constructor(_callback: ResizeObserverCallback) {}
		observe() {}
		unobserve() {}
		disconnect() {}
	}

// Mock scrollIntoView for Radix UI Select tests.
Element.prototype.scrollIntoView =
	Element.prototype.scrollIntoView || function () {}

// Mock pointer capture APIs for Radix UI components.
Element.prototype.hasPointerCapture =
	Element.prototype.hasPointerCapture ||
	function () {
		return false
	}
Element.prototype.setPointerCapture =
	Element.prototype.setPointerCapture || function () {}
Element.prototype.releasePointerCapture =
	Element.prototype.releasePointerCapture || function () {}

// Provide placeholder env vars consumed at import time by Sanity/Resend modules
// so importing the units under test never throws during collection.
process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||= 'test-project'
process.env.NEXT_PUBLIC_SANITY_DATASET ||= 'test-dataset'
process.env.NEXT_PUBLIC_SANITY_API_VERSION ||= '2024-01-01'
process.env.RESEND_API_KEY ||= 'test-resend-key'
