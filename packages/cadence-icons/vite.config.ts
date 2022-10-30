import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';
import postcssNesting from 'postcss-nesting';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tsConfigPaths(),
		dts({
			insertTypesEntry: true,
			include: ['src/components'],
		}),
		cssInjectedByJsPlugin(),
		// svgr({
		// 	svgrOptions: {
		// 		typescript: true,
		// 		icon: true,
		// 		dimensions: false,
		// 		titleProp: true,
		// 		filenameCase: 'kebab',
		// 		svgProps: {
		// 			role: 'img',
		// 		}
		// 	},
		// 	esbuildOptions: {
		// 	},
		// 	include: '**/*.svg',
		// }),
	],
	build: {
		lib: {
			entry: path.resolve(__dirname, './src/components/index.ts'),
			name: 'CadenceIcons',
			formats: ['es', 'umd'],
			fileName: (format) => `cadence-icons.${format}.js`,
		},
		rollupOptions: {
			external: ['react', 'react-dom'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDom',
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
});
