# cadence-icons

## 1.9.0

### Minor Changes

- 3ee9142: Make icons safe by default — `aria-hidden` unless they are named.

  Every icon rendered as `role="img"` unconditionally. With no `title` — the overwhelmingly
  common case, because these icons are decorative — `titleId` is `undefined`, React omits
  `aria-labelledby`, and the result is a `role="img"` with no accessible name. Axe reports
  `svg-img-alt`, and when such an icon is the only child of a button, that button is nameless
  too and axe adds `button-name`.

  That single root cause produced six shipped defects across four PRs, each fixed at the call
  site: the close button in `dialog`, `drawer` and `toast`, and three nameless icons in one
  open `dropdown-menu`. The API was unsafe by default — the correct usage was the one you had
  to remember, and forgetting it failed silently in review.

  Now:

  - No `title`, `aria-label` or `aria-labelledby` → `aria-hidden="true"` and **no** `role`. An
    `aria-hidden` element cannot trip `svg-img-alt`.
  - Named → `role="img"`, wired to `aria-labelledby` as before.
  - An explicit `aria-hidden` or `role` from the caller still wins; `{...props}` is spread
    after the computed defaults.

  The logic lives in `svgProps` in `.svgrrc.json`, so it is the SVGR template rather than 79
  hand-edited files, and all 79 components are regenerated. A new suite in
  `src/__test__/icon-accessibility.test.tsx` pins all three cases — the first tests in this
  package.

  **This changes rendered output.** Code that finds a decorative icon with
  `getByRole('img', { hidden: true })` no longer matches, because an untitled icon has no
  role. Two tests in `cadence-core`'s `summary` suite did exactly that and are updated. The
  per-call-site `aria-hidden` added in #312, #314 and #316 is now redundant — verified by
  removing all thirteen and re-running the suite, including the axe specs for `dialog`,
  `drawer`, `toast` and `sidebar`, with no regression. They are kept as defence in depth.

## 1.8.1

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

## 1.8.0

### Minor Changes

- fa814d3: Sidebar cleanup — fix collapsed-rail behaviour for `asChild` links and tighten the rail's visual treatment.
  - `SidebarLink` with `asChild` now wraps the consumer's label in the hideable label span before Radix Slot promotes the element, so the collapsed rail actually hides label text (previously the label leaked through as bare text)
  - Collapsed tooltips render plain text instead of re-rendering the consumer's `<Link>`/`<a>`, which nested an anchor inside the tooltip
  - New optional `label` prop on `SidebarLink` for the collapsed tooltip and accessible name; falls back to string `children`. Collapsed links now carry an `aria-label` so they keep an accessible name once the visible label is hidden
  - `Sidebar` fills its container height (`height: 100%`) and scrolls internally, letting consumers own the viewport math
  - Border now runs the full perimeter with `--cds-radii-medium`, replacing the single `border-right`
  - Hover states use the semantic `--cds-color-surface-faint` token instead of a raw palette reference
  - `SidebarLink` and `SidebarSeparator` no longer emit an orphan `<li>` when used outside a `SidebarSection`, which was invalid HTML under `<nav>`; separators inside a section now render as a listitem wrapping the divider so list semantics survive

  Adds `Layout`, `UserPlus`, and `MailPlus` icons to cadence-icons.

  Test infrastructure (cadence-core):
  - `@testing-library/jest-dom` matchers are now actually loaded — `vite.config.ts` pointed at a setup file that skipped them while a second, unused setup file imported them, so any suite using `toBeInTheDocument`/`toHaveAttribute` failed with "Invalid Chai property"
  - Added the missing `@testing-library/user-event` and `axe-core` dev dependencies
  - Enabled `test.css` so CSS modules are compiled and injected into jsdom, making CSS-driven behaviour (collapsed rails, hidden labels) testable

## 1.7.1

### Patch Changes

- 4d3d348: Dependency bump: Vite 8.0.12
- 2ea6f1c: Update tier 1 and tier dependencies

## 1.7.0

### Minor Changes

- af86b9f: Add changelog feature for tracking content changes

  Introduces a changelog system that lets editors document meaningful content updates in Sanity CMS, displayed to readers via a slide-out drawer on content pages.
  - **cadence-core**: New Drawer component built on Radix UI Dialog, with slide-in animation, scrollable body, left/right side support, and full keyboard accessibility. Includes DrawerContent, DrawerTrigger, DrawerHeader, DrawerBody, DrawerFooter, DrawerTitle, and DrawerDescription sub-components.
  - **cms-sanity**: New `changelogEntry` object schema (date, summary, description) and `changelog` array field added to all educational content document types — articles, resources, snippets, handbook, lexicon, courses, lessons, and curricula — each with a dedicated Changelog tab (groups added where applicable).
  - **www**: New ChangelogDrawer component with an "Updated" badge trigger near content metadata. GROQ queries updated to fetch changelog data for educational content types.
  - **cadence-icons**: Added a logs icon.

## 1.6.1

### Patch Changes

- 8b7e7d2: Update dependencies across monorepo

  ## www
  - Next.js 15.4.5 → 16.1.1
  - React/React DOM 19.1.0 → 19.2.3
  - Zod 3.x → 4.2.1
  - @hookform/resolvers 3.x → 5.2.2
  - @sentry/nextjs 9.x → 10.32.1
  - @portabletext/react 3.x → 6.0.0
  - next-sanity 9.x → 12.0.5
  - Cypress 14.x → 15.8.1
  - drizzle-orm 0.44.x → 0.45.1
  - resend 4.x → 6.6.0
  - All Radix UI components updated to latest patches

  ## cms-sanity
  - Sanity 4.20.0 → 4.22.0
  - React/React DOM 19.1.0 → 19.2.3
  - ESLint 9.32.0 → 9.39.2
  - TypeScript 5.8.3 → 5.9.3

  ## cadence-core
  - @rollup/plugin-commonjs 28.x → 29.0.0
  - Storybook packages 8.6.14 → 8.6.15
  - Radix UI components updated to latest patches
  - rollup 4.46.2 → 4.54.0
  - sass 1.89.4 → 1.97.1
  - vitest 3.x → 4.0.16
  - TypeScript 5.8.3 → 5.9.3

  ## cadence-icons
  - @vitejs/plugin-react 4.x → 5.1.2
  - Vite 7.0.6 → 7.3.0
  - Vitest 3.x → 4.0.16
  - TypeScript 5.8.3 → 5.9.3
  - vite-tsconfig-paths 5.x → 6.0.3

  ## email
  - @react-email/components 1.0.1 → 1.0.3
  - React 19.1.0 → 19.2.3
  - react-email 5.0.5 → 5.1.1

## 1.6.0

### Minor Changes

- 1b2e672: Added Checkbox and CheckboxCard components. Added `minus` icon.

## 1.5.1

### Patch Changes

- f7bfaef: Update to NextJS 15
- 3141cdc: Update dependencies

## 1.5.0

### Minor Changes

- Update core dependencies

## 1.4.1

### Patch Changes

- c601ce8: Formatting cleanup, etc

## 1.4.0

### Minor Changes

- 3a93e7b: Add support for more complex account management

## 1.3.0

### Minor Changes

- Adding support for a Lexicon content model, various additional icons to support an audio player, addition of the audio player component.

## 1.2.0

### Minor Changes

- 70cc2e1: Add transactional email with Resend, react-hook-form, and zod. Add custom toast component.
- 01a260b: Fixed icon color rendering a bit and updated the icon colors in the footer
- 01fbdf4: Updating the toast styling and cleanup of the authentication experience

## 1.1.0

### Minor Changes

- Added social icons
