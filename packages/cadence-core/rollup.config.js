import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.css'];
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'react/jsx-runtime': 'jsxRuntime',
  'react/jsx-dev-runtime': 'jsxDevRuntime',
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
      banner: "'use client';",
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      globals,
      banner: "'use client';",
    }
  ],
  plugins: [
    peerDepsExternal(),
    nodeResolve({ extensions, browser: true }),
    commonjs(),
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
      modules: {
        generateScopedName: (name, filename, css) => {
          // Extract component name from path
          const parts = filename.split('/');
          const componentFile = parts[parts.length - 1];
          const componentName = componentFile.replace('.module.css', '');
          
          // Generate short hash
          const hash = crypto
            .createHash('md5')
            .update(filename + name)
            .digest('base64')
            .substring(0, 5)
            .replace(/[/+=]/g, ''); // Remove special characters from base64
          
          // Return formatted class name
          return `cds-${componentName}-${name}--${hash}`;
        }
      }
    }),
  ],
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    'react/jsx-dev-runtime',
    'cadence-icons',
    '@radix-ui/react-switch',
    '@radix-ui/react-radio-group',
    '@radix-ui/react-checkbox',
    '@radix-ui/react-hover-card',
    '@radix-ui/react-tooltip'
  ],
};