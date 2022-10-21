import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths'
import postcssNesting from 'postcss-nesting'

export default defineConfig({
    plugins: [
        react(),
        tsConfigPaths(),
        dts({
            insertTypesEntry: true,
            include: [ 'src/components' ],
        }),
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
        }
    },
    css: {
        postcss: {
            plugins: [
                postcssNesting,
            ]
        }
    }
});