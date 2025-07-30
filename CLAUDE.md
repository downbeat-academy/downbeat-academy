# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Downbeat Academy is a monorepo for educational music content and resources, managed with pnpm workspaces and Turbo. The project includes multiple applications and packages under the Cadence Design System.

## Architecture

### Apps

1. **www** - Main Next.js website (apps/www)
   - Uses Next.js 14 with App Router
   - Styled with CSS modules and Cadence Design System tokens
   - Authentication via better-auth with Drizzle ORM
   - Content from Sanity CMS
   - Analytics with Fathom and Sentry for error tracking

2. **cms-sanity** - Sanity Studio (apps/cms-sanity)
   - Active CMS for content management
   - Manages educational content, resources, and metadata

### Packages

- **cadence-icons** - Icon library for the design system
- **cadence-tokens** - Design tokens managed with style-dictionary
- **cadence-core** - Core component library
- **typeface-favorit** - ABC Favorit font dependencies
- **typeface-tiempos-text** - Tiempos Text font dependencies

## Common Commands

### Development
```bash
# Run all apps in development
pnpm dev

# Run specific app
pnpm www:dev         # Main website
pnpm cms:dev         # Sanity CMS

# Run specific package development
pnpm icons:dev       # Cadence icons
pnpm core:storybook  # Component library Storybook
```

### Build & Testing
```bash
# Build all packages
pnpm build

# Build specific apps
pnpm www:build
pnpm cms:build
pnpm tokens:build
pnpm icons:build
pnpm core:build

# Testing
pnpm test              # Run all tests
pnpm www:cypress       # Open Cypress for www app

# Linting & Formatting
pnpm lint              # Run linting across all packages
pnpm format            # Format code with Prettier
```

### Storybook
```bash
pnpm core:storybook         # Run Storybook dev server
pnpm core:build-storybook   # Build Storybook static files
```

## Key Technical Details

### www App
- **Authentication**: Uses better-auth with PostgreSQL/Drizzle ORM
- **Content**: Fetches from Sanity CMS
- **Styling**: CSS modules with Cadence Design System tokens
- **Components**: Located in src/components with rich-text, music notation, and audio players
- **Forms**: React Hook Form with Zod validation
- **Database**: Drizzle ORM with PostgreSQL for auth/user data

### Sanity CMS
- **Content Types**: Articles, handbooks, lexicons, courses, lessons, resources
- **Asset Management**: Media, documents, and educational materials
- **Rich Text**: Portable Text with custom marks and blocks

### Music-Specific Features
- Music notation rendering with OpenSheetMusicDisplay
- Audio player components
- Chord and music text primitives
- MusicXML file support

## Environment Variables

Key environment variables needed:
- Database connection strings (DATABASE_URI)
- API keys for services (Resend, Fathom, Sentry)
- Blob storage tokens
- CMS secrets

## Testing Approach

- **E2E Testing**: Cypress for the www app
- **Unit Testing**: Vitest for packages (cadence-icons, cadence-core)
- Test files follow *.test.* or *.cy.* naming conventions

## Code Conventions

- TypeScript throughout the codebase
- CSS modules for component styling
- Semantic design tokens from cadence-tokens
- Component files use .tsx extension
- Module exports typically through index.ts files
- Rich text content uses Portable Text (Sanity)