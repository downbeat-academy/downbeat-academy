# AGENTS.md - Downbeat Academy Monorepo

This file provides operational guidance for AI coding agents working with the Downbeat Academy monorepo. For architectural overview, see [CLAUDE.md](./CLAUDE.md).

## Monorepo Structure

```
downbeat-academy/
├── apps/
│   ├── www/                    # Next.js main website
│   └── cms-sanity/            # Sanity CMS
├── packages/
│   ├── cadence-core/          # React component library
│   ├── cadence-icons/         # Icon library
│   ├── cadence-tokens/        # Design tokens
│   ├── email/                 # Email templates
│   ├── typeface-favorit/      # Font package
│   └── typeface-tiempos-text/ # Font package
└── docs/                      # Monorepo documentation
```

## Workspace Commands

### Development
```bash
# Start all apps in development
pnpm dev

# Start specific apps
pnpm www:dev          # Main website
pnpm cms:dev          # Sanity CMS
pnpm icons:dev        # Icons development server
pnpm core:storybook   # Component library Storybook

# Fresh development (rebuild packages first)
pnpm dev:fresh
```

### Building
```bash
# Build all apps and packages
pnpm build

# Build packages only
pnpm build:packages

# Build specific targets
pnpm www:build        # Main website
pnpm cms:build        # Sanity CMS
pnpm tokens:build     # Design tokens
pnpm icons:build      # Icon library
pnpm core:build       # Component library
```

### Testing
```bash
# Run all tests
pnpm test

# Run E2E tests for www app
pnpm www:cypress
```

## Package Dependencies

### Dependency Flow
```
www → cadence-core → cadence-tokens
    → cadence-icons
    → typeface-favorit
    → typeface-tiempos-text
    → email

cms-sanity (independent)
```

### Critical Rules
1. **Always build packages before apps**: Changes in `packages/` require rebuilding before apps can use them
2. **Turbo handles dependencies**: Use turbo commands to ensure proper build order
3. **Test downstream effects**: Changes in packages affect multiple apps

## Where to Make Changes

### Adding New Components
- **Location**: `packages/cadence-core/src/components/`
- **Process**: Build package → Test in Storybook → Use in apps
- **Commands**: `pnpm core:build && pnpm core:storybook`

### Adding New Icons
- **Location**: `packages/cadence-icons/src/assets/`
- **Process**: Add SVG → Run build → Icons available in apps
- **Commands**: `pnpm icons:build`

### Design Token Changes
- **Location**: `packages/cadence-tokens/tokens/`
- **Process**: Update JSON → Build tokens → Rebuild dependent packages
- **Commands**: `pnpm tokens:build && pnpm build:packages`

### App-Specific Features
- **WWW App**: `apps/www/src/`
- **CMS Configuration**: `apps/cms-sanity/schemas/`

### Email Templates
- **Location**: `packages/email/emails/`
- **Components**: `packages/email/components/`

## Development Workflows

### 1. Component Development
```bash
# 1. Create component in cadence-core
cd packages/cadence-core
# Add component files

# 2. Build and test
pnpm core:build
pnpm core:storybook

# 3. Use in www app
cd ../../apps/www
# Import and use component
```

### 2. Design System Updates
```bash
# 1. Update tokens
cd packages/cadence-tokens
# Modify JSON files

# 2. Build tokens and packages
pnpm tokens:build
pnpm build:packages

# 3. Test in apps
pnpm dev
```

### 3. Full Stack Feature
```bash
# 1. Update CMS schema if needed
cd apps/cms-sanity
# Modify schemas

# 2. Add components if needed
cd ../../packages/cadence-core
# Add new components

# 3. Build packages
pnpm build:packages

# 4. Implement in www app
cd ../../apps/www
# Use components and integrate
```

## Testing Strategy

### Package Testing
- **Component Library**: Vitest tests in `cadence-core`
- **Icons**: Build verification
- **Tokens**: Style dictionary compilation

### App Testing  
- **WWW**: Cypress E2E tests (see `apps/www/docs/`)
- **CMS**: Manual testing in Sanity Studio

### Integration Testing
```bash
# Full build test
pnpm build

# E2E with fresh packages
pnpm dev:fresh
pnpm www:cypress
```

## Common Issues & Solutions

### "Module not found" in apps
**Cause**: Package not built or outdated
**Solution**: 
```bash
pnpm build:packages
# or for specific package
pnpm icons:build
```

### Storybook not showing new components
**Cause**: Component not exported from package index
**Solution**: Add export to `packages/cadence-core/src/index.ts`

### Styling inconsistencies
**Cause**: Outdated design tokens
**Solution**:
```bash
pnpm tokens:build
pnpm build:packages
```

### Changes not reflecting in apps
**Cause**: Turbo cache or missing dependency build
**Solution**:
```bash
# Clear cache and rebuild
turbo clean
pnpm build:packages
pnpm dev:fresh
```

## File Locations Quick Reference

### Configuration Files
- Workspace: `pnpm-workspace.yaml`
- Build system: `turbo.json`
- Package manager: `package.json` (root)

### App Entry Points
- WWW: `apps/www/src/app/layout.tsx`
- CMS: `apps/cms-sanity/sanity.config.ts`

### Package Entry Points
- Components: `packages/cadence-core/src/index.ts`
- Icons: `packages/cadence-icons/src/index.ts`
- Tokens: `packages/cadence-tokens/dist/`

### Documentation
- WWW specific: `apps/www/docs/`
- Monorepo: `CLAUDE.md`, this file

## Environment Setup

### Prerequisites
- Node.js 18+
- pnpm 8.14.0+ (specified in package.json)

### First-time Setup
```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build:packages

# Start development
pnpm dev
```

### Environment Variables
- **WWW App**: See `apps/www/docs/setup/environment-variables.md`
- **CMS**: Configured in Sanity Studio

## AI Agent Guidelines

### Before Making Changes
1. Understand the dependency graph
2. Build packages if modifying them
3. Test in multiple apps if changing shared code

### Decision Tree
- **Styling/Design**: Modify tokens → rebuild packages
- **New Component**: Add to cadence-core → build → use in apps  
- **App Feature**: Work directly in app directory
- **CMS Schema**: Modify cms-sanity schemas
- **Icons**: Add to cadence-icons → build

### Best Practices
- Use turbo commands for builds (handles dependencies)
- Test changes in Storybook before integrating
- Build packages before testing apps
- Check multiple apps for impact of package changes

## Related Documentation

- [CLAUDE.md](./CLAUDE.md) - Project architecture and overview
- [WWW App Docs](./apps/www/docs/) - Specific to main website
- [Turbo Documentation](https://turbo.build/repo/docs) - Build system reference