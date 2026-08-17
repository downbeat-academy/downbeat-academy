/// <reference types="vitest" />

// jest-dom matchers (toBeInTheDocument, toHaveAttribute, toHaveClass, …). Several
// suites already depend on these; without them vitest reports "Invalid Chai property".
import '@testing-library/jest-dom/vitest'

// jsdom does not implement ResizeObserver, and a component that constructs one throws on
// mount. This is the only platform gap the jsdom project still papers over.
//
// The pointer-capture trio and `scrollIntoView` used to be shimmed here too, both
// commented "for Radix UI". They were removed in C.4 once nothing wrapped a Radix
// primitive, and the whole suite passes without them — verified, not assumed. Do not
// reintroduce a shim here without checking the same way: this file is the jsdom project's
// only lever for hiding a real defect, which is exactly what the `form/radio-card/`
// failure looked like.
global.ResizeObserver =
	global.ResizeObserver ||
	class ResizeObserver {
		constructor(callback: ResizeObserverCallback) {}
		observe() {}
		unobserve() {}
		disconnect() {}
	}
