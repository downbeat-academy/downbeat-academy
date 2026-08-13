/// <reference types="vitest" />

import { defineConfig, configDefaults } from "vitest/config";
import dts from "vite-plugin-dts";
import { playwright } from "@vitest/browser-playwright";
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
    rolldownOptions: {
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
  // Two vitest projects, not one.
  //
  // jsdom does not implement `HTMLDialogElement` — `showModal` and `close` are
  // `undefined` on every installed version. So focus trapping, `Escape`, the top layer
  // and background inerting cannot be verified there, and stubbing `showModal` in a
  // setup file would assert against the stub rather than the platform. Phase C needs
  // this project again for CSS anchor positioning, which jsdom cannot compute at all.
  //
  // `jsdom` stays the default (`pnpm test`) so the existing suite stays fast and the
  // `Lint, Typecheck & Test` CI job never downloads a browser. The `browser` project
  // runs on its own, in its own workflow — see .github/workflows/ci-cadence-browser.yml.
  //
  // Both projects set `extends: true` so they inherit the `css.modules` block above.
  // That is load-bearing, not tidiness: browser specs assert on `s.content` and friends,
  // and the generated `cds-*` hashes must match across projects.
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "jsdom",
          globals: true,
          environment: "jsdom",
          setupFiles: "./setup-tests.ts",
          // Process CSS through Vite's pipeline so tests see the same `cds-*` class names
          // as the published bundle, and so stylesheets are injected into jsdom — without
          // this every CSS-driven behavior (collapsed rails, hidden labels) is untestable.
          css: true,
          // vitest's default `include` matches `*.browser.test.tsx` too, so without this
          // every browser spec would also run under jsdom and fail. Spread the defaults
          // rather than replacing them, or `node_modules` and `dist` come back.
          exclude: [...configDefaults.exclude, "src/**/*.browser.test.*"],
        },
      },
      {
        extends: true,
        test: {
          name: "browser",
          globals: true,
          // NOT ./setup-tests.ts — that file assigns to the bare `global` identifier,
          // which Vite does not shim for a browser bundle. See setup-tests.browser.ts.
          setupFiles: "./setup-tests.browser.ts",
          css: true,
          include: ["src/**/*.browser.test.{ts,tsx}"],
          browser: {
            enabled: true,
            headless: true,
            // vitest 4 takes a provider factory here, not the v3 `'playwright'` string.
            provider: playwright(),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  }
});