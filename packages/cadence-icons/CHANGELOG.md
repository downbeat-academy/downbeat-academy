# cadence-icons

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
