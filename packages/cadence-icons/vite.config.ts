import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import dts from 'vite-plugin-dts'
import tsConfigPaths from 'vite-tsconfig-paths'
import postcssNesting from 'postcss-nesting'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
	plugins: [
		react(),
		tsConfigPaths(),
		dts({
			insertTypesEntry: true,
			include: ['src'],
			beforeWriteFile: (filePath, content) => {
				// Skip writing if the components haven't been generated yet
				if (filePath.includes('components/index.d.ts') && !content.trim()) {
					return false;
				}
				return { filePath, content };
			},
		}),
		cssInjectedByJsPlugin(),
	],
	build: {
		lib: {
			entry: path.resolve(__dirname, './src/index.ts'),
			name: 'CadenceIcons',
			formats: ['es', 'umd'],
			fileName: (format) => `cadence-icons.${format}.js`,
		},
		rollupOptions: {
			external: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDom',
					'react/jsx-runtime': 'jsxRuntime',
					'react/jsx-dev-runtime': 'jsxDevRuntime',
				},
			},
		},
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
