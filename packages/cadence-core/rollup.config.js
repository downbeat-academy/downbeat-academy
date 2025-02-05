import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import preserveDirectives from "rollup-plugin-preserve-directives";
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

// This imports tokens from the cadence-tokens package
const tokensPath = resolve(__dirname, '../cadence-tokens/dist/tokens.css');

export default {
  input: './src/index.ts',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      globals,
      preserveModules: true
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      globals,
      preserveModules: true
    },
  ],
  plugins: [
    peerDepsExternal(),
    nodeResolve({ extensions, browser: true }),
    commonjs(),
    preserveDirectives(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      // declarationDir: 'dist',
      rootDir: './src'
    }),
    postcss({
      plugins: [
        postcssPresetEnv(),
        autoprefixer(),
      ],
      extract: 'cadence-core.min.css',
      minimize: true,
      sourceMap: false,
      include: [tokensPath, '**/*.css'], // Include both tokens and your CSS files
      inject: false, // This prevents automatic injection of styles into the head
    }),
  ],
  external: ['react', 'react-dom'],
};