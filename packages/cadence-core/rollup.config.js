import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import stringHash from 'string-hash'
import postcss from 'postcss'
import postcssPresetEnv from 'postcss-preset-env'
import autoprefixer from 'autoprefixer'
import scss from 'rollup-plugin-scss'

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.css']
const globals = {
	react: 'React',
	'react-dom': 'ReactDOM',
}

export default {
	input: ['./src/index.ts'],
	output: [
		{
			file: './dist/index.esm.js',
			format: 'esm',
			globals,
		},
		{
			file: './dist/index.cjs.js',
			format: 'cjs',
			globals,
		},
	],
	plugins: [
		peerDepsExternal(),
		nodeResolve({ extensions, browser: true }),
		commonjs(),
		typescript(),
		postcss({
			plugins: [
				postcssPresetEnv(),
				autoprefixer(),
				scss({
					output: 'dist/cadence-core.min.css',
					outputStyle: 'compressed',
				}),
			],
			autoModules: false,
			onlyModules: false,
			// modules: {
			//   generatedScopedName: (name, filename, css) => {
			//     if (filename.includes('global')) {
			//       return name;
			//     }
			//     const hash = stringHash(css).toString(36).substring(0, 5);
			//     return `cadence_${name}_${hash}`;
			//   }
			// },
			extract: 'css/cadence-core.min.css',
			extensions: ['.scss'],
			use: ['scss'],
			minimize: true,
			sourceMap: false,
		}),
	],
}
