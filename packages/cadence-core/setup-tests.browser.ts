/// <reference types="vitest" />

// Setup for the `browser` vitest project (Playwright/Chromium), NOT for jsdom.
//
// This is deliberately a separate file from `setup-tests.ts` rather than a reuse of it,
// for two reasons:
//
// 1. `setup-tests.ts` assigns to the bare identifier `global`, which Vite does not shim
//    when it bundles for a browser. Importing it here throws `ReferenceError: global is
//    not defined` before a single test runs.
// 2. Everything else in that file exists to paper over jsdom — `ResizeObserver`,
//    `scrollIntoView`, and the pointer-capture trio that Radix needs. A real browser
//    implements all of them. Shimming them here would be the `form/radio-card/` failure
//    mode in miniature: asserting against a stub in the very project that exists to
//    assert against the platform.
//
// So this file carries the matchers and nothing else. If something needs a polyfill to
// pass in Chromium, that is a finding about the component, not a gap in this file.
import '@testing-library/jest-dom/vitest'

// The design tokens, exactly as `.storybook/preview.ts` loads them.
//
// This project exists to test things that need real layout, and without the `--cds-*`
// custom properties every token-driven dimension resolves to nothing: a dialog whose
// `padding: var(--cds-scale-2x-large)` silently becomes zero is 18px tall, and a test
// that clicks "inside the padding gutter" lands on the title instead and proves the
// opposite of what it claims. Measured, not hypothetical — it is how the padding
// assertion in dialog.browser.test.tsx was found to be vacuous.
import './node_modules/cadence-tokens/dist/web/tokens.css'

// Silence React's act(...) warning — in this project only, and only this message.
//
// These specs drive components with **trusted** browser events on purpose, so every
// resulting state update lands outside `act(...)`. That is the point rather than a
// defect: an update arriving outside act is what proves the platform did the work, not
// our React code. `@testing-library/react` turns React's act environment on at `render`
// time, so the warning cannot be switched off from a global; and the message reaches the
// terminal through Vite's client console relay, so vitest's own `onConsoleLog` filter
// does not see it either. Patching `console.error` here is the one place that works.
//
// The predicate is deliberately narrow: every other console.error still surfaces. If a
// component genuinely misbehaves in a browser, this will not hide it.
const consoleError = console.error
console.error = (...args: unknown[]) => {
	if (typeof args[0] === 'string' && args[0].includes('was not wrapped in act(...)')) {
		return
	}
	consoleError(...args)
}
