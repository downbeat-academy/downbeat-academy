import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
	test: {
		environment: 'node',
		include: ['src/**/*.test.ts'],
		exclude: ['node_modules', '.next'],
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
			'@components': resolve(__dirname, './src/components'),
			'@lib': resolve(__dirname, './src/lib'),
			'@utils': resolve(__dirname, './src/lib/utils'),
		},
	},
})
