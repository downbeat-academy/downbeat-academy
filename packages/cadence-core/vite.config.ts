import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import dts from 'vite-plugin-dts'
import tsConfigPaths from 'vite-tsconfig-paths'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
	plugins: [
		react(),
		tsConfigPaths(),
		dts({
			insertTypesEntry: true,
			include: ['src/components'],
		}),
		cssInjectedByJsPlugin(),
	],
	build: {
		lib: {
			entry: path.resolve(__dirname, './src/components/index.ts'),
			name: 'CadenceCore',
			formats: ['es', 'umd'],
			fileName: (format) => `cadence-core.${format}.js`,
		},
		rollupOptions: {
			external: ['react', 'react-dom'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
				},
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@components': path.resolve(__dirname, './src/components'),
			'@pages': path.resolve(__dirname, './src/pages'),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "./src/styles/global.scss";`
			}
		},
		modules: {
			localsConvention: 'camelCase',
		},
	},
})
