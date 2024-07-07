import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.css'];
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

// Adjust this path to point to your generated tokens CSS file
const tokensPath = resolve(__dirname, '../your-tokens-package/dist/tokens.css');

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
      ],
      extract: 'dist/cadence-core.min.css',
      minimize: true,
      sourceMap: false,
      include: [tokensPath, '**/*.css'], // Include both tokens and your CSS files
      inject: false, // This prevents automatic injection of styles into the head
    }),
  ],
};

// import peerDepsExternal from 'rollup-plugin-peer-deps-external'
// import nodeResolve from '@rollup/plugin-node-resolve'
// import commonjs from '@rollup/plugin-commonjs'
// import typescript from '@rollup/plugin-typescript'
// import postcss from 'postcss'
// import postcssPresetEnv from 'postcss-preset-env'
// import autoprefixer from 'autoprefixer'
// import scss from 'rollup-plugin-scss'

// const extensions = ['.js', '.jsx', '.ts', '.tsx', '.css']
// const globals = {
// 	react: 'React',
// 	'react-dom': 'ReactDOM',
// }

// export default {
// 	input: ['./src/index.ts'],
// 	output: [
// 		{
// 			file: './dist/index.esm.js',
// 			format: 'esm',
// 			globals,
// 		},
// 		{
// 			file: './dist/index.cjs.js',
// 			format: 'cjs',
// 			globals,
// 		},
// 	],
// 	plugins: [
// 		peerDepsExternal(),
// 		nodeResolve({ extensions, browser: true }),
// 		commonjs(),
// 		typescript(),
// 		postcss({
// 			plugins: [
// 				postcssPresetEnv(),
// 				autoprefixer(),
// 				scss({
// 					output: 'dist/cadence-core.min.css',
// 					outputStyle: 'compressed',
// 				}),
// 			],
// 			autoModules: false,
// 			onlyModules: false,
// 			// modules: {
// 			//   generatedScopedName: (name, filename, css) => {
// 			//     if (filename.includes('global')) {
// 			//       return name;
// 			//     }
// 			//     const hash = stringHash(css).toString(36).substring(0, 5);
// 			//     return `cadence_${name}_${hash}`;
// 			//   }
// 			// },
// 			extract: 'css/cadence-core.min.css',
// 			extensions: ['.scss'],
// 			use: ['scss'],
// 			minimize: true,
// 			sourceMap: false,
// 		}),
// 	],
// }
