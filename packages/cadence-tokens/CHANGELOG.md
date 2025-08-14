# @downbeat-academy/cadence-tokens

## 2.3.0

### Minor Changes

- 3de90cf: Add focus ring system for accessibility
  - Add focus ring design tokens with standard (Blueberry) and critical (Peach) colors
  - Implement focus rings for all interactive components (Button, Input, Checkbox, Radio, Switch, Textarea, RadioCard, CheckboxCard)
  - Use :focus-visible for buttons and form controls (keyboard navigation only)
  - Use :focus for text inputs and textarea (all interactions)
  - Add critical focus rings for error states
  - Update all Storybook stories with Focus States examples
  - Fix CheckboxCard accessibility with proper ARIA attributes and keyboard navigation
  - Ensure WCAG compliance with proper focus indicators

## 2.2.1

### Patch Changes

- 3141cdc: Update dependencies

## 2.2.0

### Minor Changes

- Update core dependencies

## 2.1.1

### Patch Changes

- c601ce8: Formatting cleanup, etc

## 2.1.0

### Minor Changes

- 01fbdf4: Updating the toast styling and cleanup of the authentication experience

## 2.0.1

### Patch Changes

- dcb7815: Fixed build issues with how packages are being distributed

## 2.0.0

### Major Changes

- v1 release!

## 1.1.0

### Minor Changes

- 2f8a1b2: Setup publishing to NPM

### Patch Changes

- 027ce9a: Added more config for Turborepo
- 3835726: Initial changeset created
- Small cleanup in the tokens, added Avatar and Text components to core
