import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		globals: true,
		// Node, not jsdom: everything tested here runs server-side.
		environment: 'node',
		include: ['src/**/__test__/**/*.test.ts'],
	},
})
