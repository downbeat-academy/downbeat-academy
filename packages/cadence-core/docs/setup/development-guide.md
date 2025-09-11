# Development Guide - Cadence Core

This guide covers local development setup and workflows for the Cadence Core component library.

## Prerequisites

- Node.js 18+
- pnpm 8.14.0+
- Basic knowledge of React and TypeScript

## Quick Start

### Initial Setup
```bash
# From monorepo root
pnpm install

# Build dependencies first
pnpm tokens:build
pnpm icons:build

# Start Storybook for development
pnpm core:storybook
# Opens http://localhost:6006
```

### Development Workflow
```bash
# Make component changes
# Storybook will hot-reload automatically

# Run tests
pnpm --filter=cadence-core test

# Build package
pnpm core:build

# Test in consuming app
cd ../../apps/www
pnpm dev
```

## Project Structure

```
cadence-core/
├── src/
│   ├── components/          # All React components
│   │   ├── badge/
│   │   │   ├── index.ts    # Main export
│   │   │   ├── types.ts    # TypeScript definitions
│   │   │   ├── badge.tsx   # Component implementation
│   │   │   ├── badge.module.css # Scoped styles
│   │   │   ├── __docs__/
│   │   │   │   ├── badge.stories.tsx # Storybook stories
│   │   │   │   └── badge.mdx         # Documentation (optional)
│   │   │   └── __test__/
│   │   │       └── badge.test.tsx    # Unit tests
│   │   └── [other-components]/
│   ├── index.ts            # Package exports
│   └── global.d.ts         # Global type definitions
├── docs/                   # Package documentation
├── dist/                   # Build output
├── storybook-static/       # Storybook build output
├── package.json
├── rollup.config.js        # Build configuration
├── vite.config.ts          # Vite/Vitest configuration
└── tsconfig.json           # TypeScript configuration
```

## Component Development

### Creating a New Component

1. **Create component directory:**
```bash
mkdir src/components/my-component
cd src/components/my-component
```

2. **Create basic files:**

**index.ts** (Main export):
```typescript
export { MyComponent } from './my-component'
export type { MyComponentProps } from './types'
```

**types.ts** (Type definitions):
```typescript
import { ReactNode } from 'react'

export interface MyComponentProps {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
  className?: string
}
```

**my-component.tsx** (Implementation):
```typescript
import { forwardRef } from 'react'
import classNames from 'classnames'
import { MyComponentProps } from './types'
import styles from './my-component.module.css'

export const MyComponent = forwardRef<HTMLButtonElement, MyComponentProps>(
  ({ children, variant = 'primary', size = 'md', disabled, onClick, className }, ref) => {
    const classes = classNames(
      styles.component,
      styles[variant],
      styles[size],
      { [styles.disabled]: disabled },
      className
    )

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled}
        onClick={onClick}
        type="button"
      >
        {children}
      </button>
    )
  }
)

MyComponent.displayName = 'MyComponent'
```

**my-component.module.css** (Styles):
```css
.component {
  /* Base styles using design tokens */
  font-family: var(--font-family-body);
  font-size: var(--font-size-md);
  line-height: var(--line-height-md);
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all var(--transition-fast) ease;
}

.primary {
  background-color: var(--color-primary-500);
  color: var(--color-white);
}

.primary:hover {
  background-color: var(--color-primary-600);
}

.secondary {
  background-color: var(--color-surface-100);
  color: var(--color-foreground-900);
  border-color: var(--color-border-200);
}

.sm {
  padding: var(--space-xs) var(--space-sm);
  font-size: var(--font-size-sm);
}

.md {
  padding: var(--space-sm) var(--space-md);
}

.lg {
  padding: var(--space-md) var(--space-lg);
  font-size: var(--font-size-lg);
}

.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

3. **Create Storybook story:**

**__docs__/my-component.stories.tsx**:
```typescript
import type { Meta, StoryObj } from '@storybook/react'
import { MyComponent } from '../my-component'

const meta: Meta<typeof MyComponent> = {
  title: 'Components/MyComponent',
  component: MyComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
}
```

4. **Create unit test:**

**__test__/my-component.test.tsx**:
```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MyComponent } from '../my-component'

describe('MyComponent', () => {
  it('renders with default props', () => {
    render(<MyComponent>Test Button</MyComponent>)
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('Test Button')).toBeInTheDocument()
  })

  it('applies variant classes correctly', () => {
    render(<MyComponent variant="secondary">Button</MyComponent>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('secondary')
  })

  it('applies size classes correctly', () => {
    render(<MyComponent size="lg">Button</MyComponent>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('lg')
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<MyComponent onClick={handleClick}>Button</MyComponent>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('disables the button when disabled prop is true', () => {
    render(<MyComponent disabled>Button</MyComponent>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled')
  })
})
```

5. **Export from package:**

Add to `src/index.ts`:
```typescript
export { MyComponent } from './components/my-component'
export type { MyComponentProps } from './components/my-component'
```

6. **Test the component:**
```bash
# Run tests
pnpm test

# View in Storybook
pnpm core:storybook

# Build package
pnpm core:build
```

## Design Token Integration

### Using Design Tokens in CSS
```css
.component {
  /* Colors */
  color: var(--color-foreground-900);
  background-color: var(--color-surface-100);
  border-color: var(--color-border-200);
  
  /* Spacing */
  padding: var(--space-md);
  margin: var(--space-sm);
  
  /* Typography */
  font-family: var(--font-family-body);
  font-size: var(--font-size-md);
  line-height: var(--line-height-md);
  font-weight: var(--font-weight-medium);
  
  /* Border radius */
  border-radius: var(--radius-md);
  
  /* Elevation */
  box-shadow: var(--elevation-sm);
  
  /* Animation */
  transition: all var(--transition-fast) ease;
}
```

### Available Token Categories
- **Colors**: `--color-[category]-[weight]`
- **Spacing**: `--space-[size]`
- **Typography**: `--font-[property]-[variant]`
- **Radii**: `--radius-[size]`
- **Elevation**: `--elevation-[level]`
- **Transitions**: `--transition-[speed]`

## Testing Strategy

### Unit Tests with Vitest
```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests with coverage
pnpm test --coverage
```

### Testing Best Practices
1. **Test component behavior, not implementation**
2. **Use accessible queries**: `getByRole`, `getByLabelText`, etc.
3. **Test user interactions**: clicks, keyboard navigation
4. **Test accessibility**: screen reader support, focus management
5. **Mock external dependencies**: icons, tokens

### Example Test Patterns
```typescript
// Testing component rendering
it('renders with correct accessibility attributes', () => {
  render(<Button aria-label="Close dialog">×</Button>)
  expect(screen.getByRole('button')).toHaveAccessibleName('Close dialog')
})

// Testing variants
it.each([
  ['primary', 'primary'],
  ['secondary', 'secondary'],
  ['tertiary', 'tertiary'],
])('applies %s variant class', (variant, expectedClass) => {
  render(<Button variant={variant}>Button</Button>)
  expect(screen.getByRole('button')).toHaveClass(expectedClass)
})

// Testing interactions
it('calls onClick when clicked', async () => {
  const user = userEvent.setup()
  const handleClick = vi.fn()
  
  render(<Button onClick={handleClick}>Button</Button>)
  await user.click(screen.getByRole('button'))
  
  expect(handleClick).toHaveBeenCalledTimes(1)
})
```

## Build System

### Development Build
```bash
# Build for development (includes source maps)
pnpm build
```

### Production Build
```bash
# Clean previous build
pnpm clean

# Full production build
pnpm build
```

### Build Outputs
- `dist/index.esm.js` - ES modules
- `dist/index.cjs.js` - CommonJS
- `dist/index.d.ts` - TypeScript definitions
- `dist/cadence-core.min.css` - Compiled CSS

## Storybook Development

### Starting Storybook
```bash
# Development server
pnpm core:storybook

# Build static Storybook
pnpm core:build-storybook
```

### Story Best Practices
1. **Use controls** for interactive props
2. **Document component usage** with descriptions
3. **Show multiple variants** in different stories
4. **Include edge cases**: empty states, long content
5. **Add accessibility testing** with a11y addon

## Dependencies

### Workspace Dependencies
- `cadence-tokens` - Design system tokens (required)
- `cadence-icons` - Icon library (required)
- `typeface-favorit` - Primary font
- `typeface-tiempos-text` - Secondary font

### External Dependencies
- `@radix-ui/*` - Accessible primitives
- `classnames` - CSS class utilities
- `react` & `react-dom` - Peer dependencies

### Development Dependencies
- `typescript` - Type checking
- `rollup` - Bundling
- `vitest` - Testing framework
- `storybook` - Component documentation

## Common Issues

### Component not showing in Storybook
1. Check that the story is properly exported
2. Ensure component is exported from `src/index.ts`
3. Restart Storybook server

### Styles not applying
1. Verify CSS modules are imported correctly
2. Check that design tokens are available
3. Ensure cadence-tokens is built: `pnpm tokens:build`

### TypeScript errors
1. Run type checking: `pnpm tsc --noEmit`
2. Check that all dependencies have types
3. Update `tsconfig.json` if needed

### Tests failing
1. Check test imports match exports
2. Ensure test environment is set up correctly
3. Mock external dependencies properly

## Related Documentation

- [Component Reference](../reference/components.md) - Complete API documentation
- [Storybook Guide](./storybook-guide.md) - Interactive documentation setup
- [Component Architecture](../implementation/component-architecture.md) - Design patterns