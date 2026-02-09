# email

## 1.5.2

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

## 1.5.1

### Patch Changes

- 3141cdc: Update dependencies

## 1.5.0

### Minor Changes

- 008a9bc: Added custom components adhereing with brand and cadence styles.

## 1.4.0

### Minor Changes

- 8a5d081: Added email authentication to the `better-auth` configuration, and added a React email template.
- 3793fa9: Add support for password reset with better-auth and Resend, created a new email template for password reset emails.

## 1.3.0

### Minor Changes

- Update core dependencies

## 1.2.1

### Patch Changes

- c601ce8: Formatting cleanup, etc

## 1.2.0

### Minor Changes

- 80edb95: Updated core deps and fixed dependency issue

## 1.1.0

### Minor Changes

- 70cc2e1: Add transactional email with Resend, react-hook-form, and zod. Add custom toast component.
- 7dd226a: Added support for an email download component and accompanying email API routes.
