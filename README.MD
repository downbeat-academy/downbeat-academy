# Downbeat Academy

This is the monorepo for all Downbeat Academy projects, managed with pnpm
workspaces and Turbo.

# Contents

## Apps

### `www`

- Main Downbeat Academy website
- Built with Next.js and Cadence Design System components and tokens
- View at [downbeatacademy.com](https://downbeatacademy.com)

### `cms-sanity`

- Instance of Sanity Studio for managing content on `www`
- Primary CMS for all educational content and resources

### `auth`

- Centralized authentication service for all Downbeat Academy apps
- Built with Next.js, better-auth, and Drizzle ORM
- OAuth 2.1 provider for federated authentication across apps
- Includes admin dashboard for user and session management

### `cadence-links`

- URL shortener service for Downbeat Academy
- Built with Next.js and Drizzle ORM

## Packages

These are the packages used to build and maintain Downbeat Academy applications,
including the Cadence Design System.

### `cadence-core`

- Core component library for the Cadence Design System
- Built with React and Radix UI primitives
- Includes Storybook for component development and documentation

### `cadence-core-web-components`

- Web Components version of the Cadence Design System
- Built with Lit

### `cadence-icons`

- Icon library for the Cadence Design System

### `cadence-tokens`

- Global and semantic tokens for the Cadence Design System
- Managed and built with `style-dictionary`

### `auth-permissions`

- Shared RBAC permissions, roles, and access control utilities
- Used across `www`, `auth`, and `cadence-links`

### `email`

- Email templates built with React Email

### `typeface-favorit`

- Font dependencies for ABC Favorit

### `typeface-tiempos-text`

- Font dependencies for Tiempos Text

## Development

```bash
# Run all apps in development
pnpm dev

# Run specific apps
pnpm www:dev         # Main website
pnpm cms:dev         # Sanity CMS
pnpm auth:dev        # Auth service
pnpm links:dev       # URL shortener
pnpm email:dev       # Email templates

# Build
pnpm build           # Build all packages and apps

# Testing
pnpm test            # Run all tests
pnpm lint            # Lint all packages
pnpm format          # Format with Prettier

# Storybook
pnpm core:storybook  # React component library
pnpm wc:storybook    # Web components library
```

## Other notes

- Versioning managed with changesets
- Build orchestration with Turbo
- Secrets managed with Infisical
- _Most_ apps and packages (if applicable) deploy to Vercel
