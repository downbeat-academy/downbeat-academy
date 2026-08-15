# Cadence Core Component Library Documentation

This directory contains comprehensive documentation for the Cadence Core component library, part of the Downbeat Academy design system.

## Documentation Structure

### 📁 [setup/](./setup/)
- [development-guide.md](./setup/development-guide.md) — local development setup and workflows

### 📁 [reference/](./reference/)
- [components.md](./reference/components.md) — component library reference

> Conventions, testing rules, the build pipeline, and gotchas live in
> [`../AGENTS.md`](../AGENTS.md). Design-system-wide context is in
> [`../../../docs/architecture/design-system.md`](../../../docs/architecture/design-system.md).

## Package Overview

**Cadence Core** is the primary React component library for the Downbeat Academy design system, providing:

- **UI Components**: Buttons, forms, cards, typography, layout components
- **Design System Integration**: Built with cadence-tokens and cadence-icons
- **TypeScript Support**: Full type definitions and IntelliSense
- **CSS Modules**: Scoped styling with design token integration
- **Storybook Documentation**: Interactive component playground
- **Testing**: Vitest unit tests and visual regression testing

## Quick Start

### Installation
```bash
# In your app (if not using workspace)
npm install cadence-core cadence-tokens cadence-icons

# In monorepo
pnpm install
```

### Basic Usage
```tsx
import { Button, Card, Text } from 'cadence-core'
import 'cadence-core/styles.css'

function App() {
  return (
    <Card>
      <Text variant="heading">Welcome</Text>
      <Button variant="primary">Get Started</Button>
    </Card>
  )
}
```

### Development
```bash
# Start Storybook
pnpm core:storybook

# Run tests
pnpm --filter=cadence-core test

# Build package
pnpm core:build
```

## Component Categories

### Layout Components
- **Flex** - Flexible layout container with design token spacing
- **Grid** - CSS Grid layout with responsive breakpoints
- **Card** - Content containers with elevation and spacing

### Form Components
- **Button** - Primary, secondary, and tertiary button variants
- **Input** - Text inputs with validation states
- **Textarea** - Multi-line text inputs
- **Checkbox** - Single and grouped checkboxes
- **Radio** - Radio buttons and radio cards
- **Switch** - Toggle switches
- **Field** - Form field wrapper with labels and validation

### Typography
- **Text** - Heading, body, and caption text with semantic variants
- **List** - Ordered and unordered lists with design system styling

### Feedback Components
- **Badge** - Status indicators and labels
- **Banner** - System messages and notifications

### Brand Components
- **Brand** - Logo components and brand elements

## Storybook Integration

Each component includes:
- **Stories**: Interactive examples with controls
- **Documentation**: MDX files with usage guidelines
- **Tests**: Visual regression and interaction tests

View components in Storybook:
```bash
pnpm core:storybook
# Opens http://localhost:6006
```

## Dependencies

### Workspace Dependencies
- `cadence-tokens` - Design system tokens
- `cadence-icons` - Icon library
- `typeface-favorit` - Primary font family
- `typeface-tiempos-text` - Secondary font family

### External Dependencies
- `@radix-ui/*` - Accessible primitives for `dropdown-menu`, `toast`, `tooltip` and
  `hover-card` only. Everything else is built on the platform — see
  `docs/adr/0002-known-gaps.md` before reaching for a new one.
- `classnames` - Conditional CSS class utilities

## Development Workflow

### Adding New Components
1. Create component directory in `src/components/`
2. Add component files (`index.ts`, `types.ts`, `[name].tsx`, `[name].module.css`)
3. Create Storybook stories in `__docs__/` directory
4. Add unit tests in `__test__/` directory
5. Export from `src/index.ts`
6. Build and test: `pnpm core:build && pnpm core:storybook`

### Component Structure
```
component-name/
├── index.ts              # Main export
├── types.ts              # TypeScript definitions
├── component-name.tsx    # Component implementation
├── component-name.module.css # Styles
├── __docs__/
│   ├── component-name.stories.tsx
│   └── component-name.mdx (optional)
└── __test__/
    └── component-name.test.tsx
```

## Design System Integration

Components automatically inherit design tokens:
- **Colors**: Semantic color palette from cadence-tokens
- **Typography**: Font sizes, families, and line heights
- **Spacing**: Consistent margin and padding scale
- **Elevation**: Box shadow and border radius values

## For AI Agents

This component library is structured for efficient AI development:
- **Consistent Patterns**: All components follow the same structure
- **Type Safety**: Full TypeScript coverage with strict types
- **Documentation**: Each component has stories and examples
- **Testing**: Comprehensive test coverage for reliability
- **Build System**: Automated building and publishing

### Common Tasks
- **Find Component**: Check `src/components/[name]/` directory
- **See Examples**: View `__docs__/*.stories.tsx` files
- **Check API**: Review `types.ts` files for props
- **Test Changes**: Run `pnpm core:build && pnpm core:storybook`

## Related Documentation

- [Root agents.md](../../../AGENTS.md) - Monorepo development guide
- [WWW App Docs](../../../apps/www/docs/) - Implementation examples
- [Storybook Deployment](https://cadence-storybook.vercel.app) - Live component library