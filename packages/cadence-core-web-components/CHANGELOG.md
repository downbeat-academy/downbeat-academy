# cadence-core-web-components

## 0.2.1

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

## 0.2.0

### Minor Changes

- fe0f764: Add Tier 1 web components: Badge, Text, Separator, Link, and Skeleton Loader.
  - `cds-badge` — display badge with `type`, `variant` (filled/outlined/light), and `size` attributes; supports icon and text slots
  - `cds-text` — typography component with `type`, `size`, `color`, `align`, `collapse`, `background`, and `tag` attributes
  - `cds-separator` — horizontal/vertical divider with `orientation`, `color`, and `decorative` attributes
  - `cds-link` — anchor wrapper with `type`, `no-underline`, `href`, `target`, and `rel` attributes
  - `cds-skeleton-loader` — shimmer loading placeholder with `count`, `width`, `height`, `border-radius`, `circle`, `inline`, `direction`, `duration`, and `no-animation` attributes

  All components include Storybook stories and unit tests.

- 2f77bf3: Add Tier 2 layout web components: Flex, Grid, Grid Item, and Section Container.
  - `cds-flex` — flex layout container with `direction`, `gap`, `padding`, `align-items`, `align-content`, `justify-content`, `wrap`, and `background` attributes; styles applied directly to `:host`
  - `cds-grid` — responsive grid container with `columns` (1–12) attribute using the same `auto-fit` / `minmax` pattern as cadence-core
  - `cds-grid-item` — grid child element with `span` and `row-span` attributes; implements the previously empty `GridItem` stub
  - `cds-section-container` — card-like container with `background` and `border-color` attributes; `outline` used for border to match the React component

  All components include Storybook stories and unit tests.

- bbf3c54: Add Tier 3 composite display web components: Banner, Section Title, Blockquote, and Summary.
  - `cds-banner` — thin wrapper with a `type` attribute (`primary` | `secondary` | `tertiary`) and a single default slot; compose `<section>`/`<aside>` inside for content + actions
  - `cds-section-title` — `alignment` (`left` | `center` | `right`), `background`, and `has-border` (boolean, default `true`) attributes; named `title` and `subtitle` slots plus a default slot for body content
  - `cds-blockquote` — `attribution`, `link`, and `collapse` (boolean) attributes; default slot for the quote text; composes `cds-text` and `cds-link` internally
  - `cds-summary` — wraps native `<details>`/`<summary>` for stateless disclosure; `is-open`, `type` (`contained` | `flush`), `size` (`small` | `medium` | `large`), and `max-width` attributes; named `title` slot and default content slot, with an inline chevron icon that rotates when open

  All components include Storybook stories and unit tests.

### Patch Changes

- Updated dependencies [9a1d49a]
- Updated dependencies [c284a74]
  - cadence-tokens@2.4.0

## 0.1.1

### Patch Changes

- 4d3d348: Dependency bump: Vite 8.0.12
- f7a0524: Update dependencies; Storybook 10, Chromatic 16.
- 38c53a1: Add serve configuration for production Storybook hosting. Adds `start` script and `serve` dependency matching cadence-core so the web components Storybook can run on Railway and other platforms.
- 2ea6f1c: Update tier 1 and tier dependencies
- Updated dependencies [2ea6f1c]
  - cadence-tokens@2.3.1
