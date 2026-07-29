---
'www': patch
'auth': patch
'cadence-links': patch
'cms-sanity': patch
'cadence-core': patch
'cadence-core-web-components': patch
'cadence-icons': patch
'auth-permissions': patch
---

Repair the repo-wide verification loop so `lint`, `typecheck`, and `test` are trustworthy gates.

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
