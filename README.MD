# Downbeat Academy

This is the monorepo for all Downbeat Academy projects, managed with Yarn
workspaces.

# Contents

## Apps

### `www`

- Main Downbeat Academy website
- Built with Next.js and Cadence Design System components and tokens.
- View at [downbeatacademy.com](https://downbeatacademy.com).

### `sanity-cms`

- Instance of Sanity Studio for managing content on `www`

### `cadence-docs`

- Documentation website for the Cadence Design System
- View at [cadence.downbeatacademy.com](https://cadence.downbeatacademy.com)

## Packages

These are the packages used to build and maintain Downbeat Academy applications,
including the Cadence Design System

### `cadence-core`

- Primary library for the Cadence Design System
- React components compiled using [Vite](https://vitejs.dev)

### `cadence-icons`

- Icon library for the Cadence Design System

### `cadence-tokens`

- Global and semantic tokens for the Cadence Design System
- Managed and built with `style-dictionary`

### `cadence-utils` (Coming soon!)

- Utilities for managing and building the Cadence Design System

### `typeface-favorit`

- Font dependencies for ABC Favorit

### `typeface-tiempos-text`

- Font dependencies for Tiempos Text

## Other notes

- Versioning manged with changesets
- _Most_ apps and packages (if applicable) deploy to Vercel

## Linking between packages

- The various apps and projects in this monorepo make use of yarn symlinks (via
  `yarn link`) to create connections between them.
- Link to another package from the workspace level with
  `yarn link:@downbeat-academy/[pacakge to link]`
