/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	// `tsconfigPaths` resolves every path alias (`@/*`, `@lib/*`, `@utils/*`,
	// `@actions/*`, …) so tests can import source the same way the app does,
	// without hand-maintaining `resolve.alias`. It reads `tsconfig.test.json`,
	// which includes the `__test__` dirs the production `tsconfig.json` excludes
	// (so test files stay out of `next build` but still resolve aliases here).
	plugins: [react(), tsconfigPaths({ projects: ['tsconfig.test.json'] })],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './setup-tests.ts',
		// Unit/integration tests live in `__test__` dirs next to the source they cover.
		// Cypress E2E specs (cypress/**) are intentionally excluded.
		include: ['src/**/__test__/**/*.test.{ts,tsx}'],
		exclude: ['node_modules', '.next', 'cypress'],
		// Source styling is irrelevant to logic tests; skip CSS module processing.
		css: false,
		coverage: {
			provider: 'v8',
			reporter: ['text', 'html', 'lcov'],
			reportsDirectory: './coverage',
			// Scope coverage to the logic surface this suite targets so untested
			// view/layout code doesn't distort the numbers.
			include: [
				'src/utils/**',
				'src/lib/types/**',
				// Only the pure calculator is in scope here; the sibling render
				// component (reading-length.tsx) is covered by E2E tests.
				'src/components/reading-length/calculateReadingLength.ts',
				'src/components/music-notation/transfomers/**',
				'src/actions/**',
			],
			thresholds: {
				lines: 80,
				functions: 80,
				statements: 80,
				branches: 75,
			},
		},
	},
})
