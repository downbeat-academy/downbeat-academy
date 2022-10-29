// vite.config.ts
import react from "file:///Users/jorytindall/projects/downbeat-academy/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "node:path";
import { defineConfig } from "file:///Users/jorytindall/projects/downbeat-academy/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/jorytindall/projects/downbeat-academy/node_modules/vite-plugin-dts/dist/index.mjs";
import tsConfigPaths from "file:///Users/jorytindall/projects/downbeat-academy/node_modules/vite-tsconfig-paths/dist/index.mjs";
import postcssNesting from "file:///Users/jorytindall/projects/downbeat-academy/node_modules/postcss-nesting/dist/index.mjs";
import cssInjectedByJsPlugin from "file:///Users/jorytindall/projects/downbeat-academy/node_modules/vite-plugin-css-injected-by-js/dist/esm/index.js";
var __vite_injected_original_dirname = "/Users/jorytindall/projects/downbeat-academy/packages/cadence-core";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    tsConfigPaths(),
    dts({
      insertTypesEntry: true,
      include: ["src/components"]
    }),
    cssInjectedByJsPlugin()
  ],
  build: {
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "./src/components/index.ts"),
      name: "CadenceCore",
      formats: ["es", "umd"],
      fileName: (format) => `cadence-core.${format}.js`
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  css: {
    postcss: {
      plugins: [postcssNesting]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvam9yeXRpbmRhbGwvcHJvamVjdHMvZG93bmJlYXQtYWNhZGVteS9wYWNrYWdlcy9jYWRlbmNlLWNvcmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qb3J5dGluZGFsbC9wcm9qZWN0cy9kb3duYmVhdC1hY2FkZW15L3BhY2thZ2VzL2NhZGVuY2UtY29yZS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvam9yeXRpbmRhbGwvcHJvamVjdHMvZG93bmJlYXQtYWNhZGVteS9wYWNrYWdlcy9jYWRlbmNlLWNvcmUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnO1xuaW1wb3J0IHRzQ29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocyc7XG5pbXBvcnQgcG9zdGNzc05lc3RpbmcgZnJvbSAncG9zdGNzcy1uZXN0aW5nJztcbmltcG9ydCBjc3NJbmplY3RlZEJ5SnNQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tY3NzLWluamVjdGVkLWJ5LWpzJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcblx0cGx1Z2luczogW1xuXHRcdHJlYWN0KCksXG5cdFx0dHNDb25maWdQYXRocygpLFxuXHRcdGR0cyh7XG5cdFx0XHRpbnNlcnRUeXBlc0VudHJ5OiB0cnVlLFxuXHRcdFx0aW5jbHVkZTogWydzcmMvY29tcG9uZW50cyddLFxuXHRcdH0pLFxuXHRcdGNzc0luamVjdGVkQnlKc1BsdWdpbigpLFxuXHRdLFxuXHRidWlsZDoge1xuXHRcdGxpYjoge1xuXHRcdFx0ZW50cnk6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9jb21wb25lbnRzL2luZGV4LnRzJyksXG5cdFx0XHRuYW1lOiAnQ2FkZW5jZUNvcmUnLFxuXHRcdFx0Zm9ybWF0czogWydlcycsICd1bWQnXSxcblx0XHRcdGZpbGVOYW1lOiAoZm9ybWF0KSA9PiBgY2FkZW5jZS1jb3JlLiR7Zm9ybWF0fS5qc2AsXG5cdFx0fSxcblx0XHRyb2xsdXBPcHRpb25zOiB7XG5cdFx0XHRleHRlcm5hbDogWydyZWFjdCcsICdyZWFjdC1kb20nXSxcblx0XHRcdG91dHB1dDoge1xuXHRcdFx0XHRnbG9iYWxzOiB7XG5cdFx0XHRcdFx0cmVhY3Q6ICdSZWFjdCcsXG5cdFx0XHRcdFx0J3JlYWN0LWRvbSc6ICdSZWFjdERPTScsXG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdH0sXG5cdH0sXG5cdHJlc29sdmU6IHtcblx0XHRhbGlhczoge1xuXHRcdFx0J0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcblx0XHR9LFxuXHR9LFxuXHRjc3M6IHtcblx0XHRwb3N0Y3NzOiB7XG5cdFx0XHRwbHVnaW5zOiBbcG9zdGNzc05lc3RpbmddLFxuXHRcdH0sXG5cdH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1gsT0FBTyxXQUFXO0FBQzFZLE9BQU8sVUFBVTtBQUNqQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxvQkFBb0I7QUFDM0IsT0FBTywyQkFBMkI7QUFObEMsSUFBTSxtQ0FBbUM7QUFRekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDM0IsU0FBUztBQUFBLElBQ1IsTUFBTTtBQUFBLElBQ04sY0FBYztBQUFBLElBQ2QsSUFBSTtBQUFBLE1BQ0gsa0JBQWtCO0FBQUEsTUFDbEIsU0FBUyxDQUFDLGdCQUFnQjtBQUFBLElBQzNCLENBQUM7QUFBQSxJQUNELHNCQUFzQjtBQUFBLEVBQ3ZCO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTixLQUFLO0FBQUEsTUFDSixPQUFPLEtBQUssUUFBUSxrQ0FBVywyQkFBMkI7QUFBQSxNQUMxRCxNQUFNO0FBQUEsTUFDTixTQUFTLENBQUMsTUFBTSxLQUFLO0FBQUEsTUFDckIsVUFBVSxDQUFDLFdBQVcsZ0JBQWdCO0FBQUEsSUFDdkM7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNkLFVBQVUsQ0FBQyxTQUFTLFdBQVc7QUFBQSxNQUMvQixRQUFRO0FBQUEsUUFDUCxTQUFTO0FBQUEsVUFDUixPQUFPO0FBQUEsVUFDUCxhQUFhO0FBQUEsUUFDZDtBQUFBLE1BQ0Q7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1IsT0FBTztBQUFBLE1BQ04sS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3JDO0FBQUEsRUFDRDtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0osU0FBUztBQUFBLE1BQ1IsU0FBUyxDQUFDLGNBQWM7QUFBQSxJQUN6QjtBQUFBLEVBQ0Q7QUFDRCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
