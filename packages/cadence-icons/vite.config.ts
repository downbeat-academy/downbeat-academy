import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import dts from 'vite-plugin-dts'
import tsConfigPaths from 'vite-tsconfig-paths'
import postcssNesting from 'postcss-nesting'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
	plugins: [
		react({
			jsxRuntime: 'automatic',
			jsxImportSource: 'react',
		}),
		tsConfigPaths(),
		dts({
			insertTypesEntry: true,
			include: ['src/components'],
		}),
		cssInjectedByJsPlugin(),
	],
	build: {
		target: 'esnext',
		lib: {
			entry: path.resolve(__dirname, './src/components/index.ts'),
			name: 'CadenceIcons',
			formats: ['es'],
			fileName: (format) => `cadence-icons.${format}.js`,
		},
		rollupOptions: {
			external: ['react', 'react-dom', 'react/jsx-runtime'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
					'react/jsx-runtime': 'jsx'
				},
				format: 'es',
				preserveModules: true,
				preserveModulesRoot: 'src',
				exports: 'named'
			},
		},
		sourcemap: true,
		minify: false
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	css: {
		postcss: {
			plugins: [postcssNesting],
		},
	},
})
