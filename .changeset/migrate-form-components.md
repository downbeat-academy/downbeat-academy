---
"cadence-core": minor
"www": patch
---

Migrate Form components from www app to cadence-core package

This migration centralizes all form components in the design system while maintaining framework-agnostic compatibility and direct import usage.

## New Components in cadence-core

- **Form**: Main form container with configurable spacing (none, small, medium, large)
- **FormField**: Field wrapper supporting horizontal/vertical layouts
- **Input**: Text input with validation state support and react-hook-form integration
- **Textarea**: Multi-line text input with configurable rows
- **Label**: Form field labels with proper typography
- **HelperText**: Descriptive text for form fields
- **ValidationMessage**: Success/warning/error messages with icons from cadence-icons
- **HorizontalWrapper**: Layout helper for side-by-side form fields with responsive behavior

## Features

- **Framework Agnostic**: All components work without framework-specific dependencies
- **TypeScript Support**: Full TypeScript definitions with proper HTML element inheritance
- **React Hook Form**: Optional integration support for form validation
- **Accessible**: Proper ARIA attributes and semantic HTML
- **Design System Integration**: Uses cadence-tokens for consistent styling
- **Responsive**: Layout components adapt to mobile viewports

## Usage

All form components can now be imported directly from cadence-core:

```tsx
import { 
  Form, 
  FormField, 
  Input, 
  Label, 
  ValidationMessage 
} from 'cadence-core'

function MyForm() {
  return (
    <Form spacing="medium">
      <FormField>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="Enter your name" />
        <ValidationMessage type="success">Name is valid</ValidationMessage>
      </FormField>
    </Form>
  )
}
```

## Breaking Changes

- Form components are no longer available from `@components/form` in www app
- All form imports must be updated to use `cadence-core` directly
- Switch component was not migrated (requires Radix UI dependency decision)

## Migration

- Old: `import { Form } from '@components/form'`
- New: `import { Form } from 'cadence-core'`

## Storybook

- Standardized all component stories to use "Cadence/Components" category
- Added comprehensive Form component documentation and examples
- Updated Button component story to match new category structure