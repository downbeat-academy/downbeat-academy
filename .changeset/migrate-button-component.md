---
"cadence-core": minor
"www": patch
---

Migrate Button component from www app to cadence-core package

This migration centralizes the Button component in the design system while maintaining framework-agnostic compatibility through a polymorphic component design.

## New Features

- **Button Component**: Added polymorphic Button and ButtonWrapper components to cadence-core
- **Framework Agnostic**: Button component accepts `linkComponent` prop for framework-specific routing
- **Storybook Documentation**: Comprehensive Button component documentation and examples

## Changes

- Move Button & ButtonWrapper components from apps/www to packages/cadence-core
- Implement polymorphic Button component with linkComponent prop support
- Create framework wrapper in www app that injects Next.js Link component
- Update all Button imports across www app (17+ files) to use new wrapper
- Remove old button component files and tests from www app

## Button Component Features

- Standard button behavior when no href is provided
- Automatic anchor tag rendering with href but no custom link component  
- Framework-specific link components via linkComponent prop (e.g., Next.js Link)
- Zero breaking changes to existing button usage in www app

## Usage

```tsx
// In React apps with custom routing
import { Button } from 'cadence-core'
import { Link } from 'react-router-dom'

<Button text="Navigate" href="/about" linkComponent={Link} />

// In Next.js apps (via wrapper)
import { Button } from '@components/ui/button'

<Button text="Go Home" href="/" />
<Button text="Submit" onClick={handleSubmit} />
```