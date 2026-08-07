# cadence-core

## 3.3.2

### Patch Changes

- 50af95d: Adds the accessibility test harness the Radix removal work depends on: registers
  `@storybook/addon-a11y`, and extracts the ad-hoc `axe.run` and declared-rule helpers from
  the sidebar suite into `src/test-utils/` so every component suite shares one
  implementation.

  Tooling only — no component, API, or bundle change. `src/test-utils/` is excluded from
  `tsconfig.json` alongside `__test__/`, so nothing reaches `dist/`.

- b46f883: Two Radix dependency-hygiene fixes, found while auditing the Radix removal epic.

  `@radix-ui/react-collapsible` and `@radix-ui/react-slot` were missing from the Rollup
  `external` array, so both were bundled into `dist/index.esm.js` while the other ten Radix
  packages stayed external. Consumers were shipping a second copy of code they already had
  installed. Marking them external drops the ESM bundle from 317,829 to 285,457 bytes.

  `www` declared six `@radix-ui/*` dependencies it never imported — it consumes Radix only
  indirectly through `cadence-core`. Removed.

  No API or behavior change in either package.

## 3.3.1

### Patch Changes

- 927c0b8: Repair the repo-wide verification loop so `lint`, `typecheck`, and `test` are trustworthy gates.

  **`pnpm test` now terminates.** `www`, `cadence-core`, `cadence-core-web-components`, and `cadence-icons` defined `test` as bare `vitest` (watch mode), so the root task hung forever and no exit code was ever observed. All four now run `vitest run`, with `test:watch` kept for interactive use.

  **Typechecking exists.** Every workspace gained a `typecheck` script and a matching `typecheck` task in `turbo.json`. Previously type errors only surfaced during `next build`.

  **CI covers the whole monorepo.** New `ci-monorepo.yml` runs lint + typecheck + test across all workspaces. `ci-www.yml` is removed: its lint/unit jobs are superseded, and its E2E job duplicated `ci-www-e2e.yml`, so PRs touching `apps/www` ran Cypress twice.

  Fixes surfaced by turning the gates on:
  - `cms-sanity` — migrated the legacy `.eslintrc` to flat config (ESLint 9 could not read it, so `eslint .` exited 2). Corrected four `dashboardTool` widget `layout` props from `'medium'`/`'large'` to `{ width: … }`, matching `@sanity/dashboard` v5's `LayoutConfig`.
  - `cadence-core` — the sidebar border assertion tested something jsdom cannot evaluate: jsdom does not resolve `var()`, so `border: 1px solid var(--cds-color-border-faint)` computes as `borderStyle: 'none'`. Now asserted against the declared CSS rule.
  - `auth-permissions` — negative permission assertions ("a student cannot manage users") were type errors, because `ac.newRole()` narrows `authorize()` to the resources a role declares. Added a `denies()` helper that keeps the runtime check.
  - `apps/auth` — added the missing `cypress` dependency and scripts; five E2E specs had been unrunnable.
  - Removed a malformed `packages/cadence-core/.prettierrc` (`"printWidth": "80"` as a string, `tabWidht` misspelled) and a dead `.eslintrc` referencing six uninstalled plugins.
  - Aligned pnpm on 9 across `packageManager` and both workflows (was 8 / 9 / 8).
  - Added `.env*` to `.gitignore`; removed the stale `scripts/test-vercel-build.sh`.

  Also fixed: `button.test.tsx` imported `'../Button'` where the file is `button.tsx`.
  macOS is case-insensitive so it resolved locally; Linux CI is not, and this suite had
  never run there before. The new workflow caught it on its first run.

  Known gaps deliberately left, documented in code where they live: 14 `radio-card` tests are quarantined pending an accessibility fix to `RadioCardItem`; `cadence-core` has no lint setup; `pnpm format:check` is not yet gated in CI.

- Updated dependencies [927c0b8]
  - cadence-icons@1.8.1

## 2.4.0

### Minor Changes

- Added Toast component - A notification system built on Radix UI's Toast primitive with variant styling (default, success, error, warning), slide direction animations (from-bottom, from-right), and a global state management pattern via the `useToast` hook and `toast()` function. Includes `Toaster`, `Toast`, `ToastAction`, `ToastClose`, `ToastTitle`, `ToastDescription`, `ToastViewport`, and `ToastProvider` components. Migrated from the www app to the shared library.

## 2.2.0

### Minor Changes

- Added Summary component - A collapsible disclosure widget with configurable title, visual variants (contained/flush), and size options (small/medium/large)

## 1.1.0

### Minor Changes

- 8c4cb6b: Added Badge to Core package

### Patch Changes

- c601ce8: Formatting cleanup, etc
- Updated dependencies [c601ce8]
  - typeface-tiempos-text@1.0.3
  - typeface-favorit@1.0.3
  - cadence-tokens@2.1.1
  - cadence-icons@1.4.1
