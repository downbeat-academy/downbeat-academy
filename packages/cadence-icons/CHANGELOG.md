# cadence-icons

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
