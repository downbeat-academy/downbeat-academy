# Downbeat Academy

This is the monorepo for all Downbeat Academy projects, managed with Yarn
workspaces.

# Contents

## Apps

### `www`

- Main Downbeat Academy website
- Built with Next.js and Cadence Design System components and tokens.
- View at [downbeatacademy.com](https://downbeatacademy.com).

### `cms-sanity`

- Instance of Sanity Studio for managing content on `www`
- This is the in the progress of being deprecated.

### `cms-payload`

- Instance of Payload using Postgres with Supabase

## Packages

These are the packages used to build and maintain Downbeat Academy applications,
including the Cadence Design System

### `cadence-icons`

- Icon library for the Cadence Design System

### `cadence-tokens`

- Global and semantic tokens for the Cadence Design System
- Managed and built with `style-dictionary`

### `typeface-favorit`

- Font dependencies for ABC Favorit

### `typeface-tiempos-text`

- Font dependencies for Tiempos Text

## Other notes

- Versioning manged with changesets
- _Most_ apps and packages (if applicable) deploy to Vercel
