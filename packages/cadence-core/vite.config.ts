/// <reference types="vitest" />

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { peerDependencies } from "./package.json";
import crypto from "crypto";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts", // Specifies the entry point for building the library.
      name: "cadence-core", // Sets the name of the generated library.
      fileName: (format) => `index.${format}.js`, // Generates the output file name based on the format.
      formats: ["cjs", "es"], // Specifies the output formats (CommonJS and ES modules).
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies)], // Defines external dependencies for Rollup bundling.
    },
    sourcemap: true, // Generates source maps for debugging.
    emptyOutDir: true, // Clears the output directory before building.
  },
  plugins: [dts()], // Uses the 'vite-plugin-dts' plugin for generating TypeScript declaration files (d.ts).
  css: {
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
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setup-tests.ts",
  }
});