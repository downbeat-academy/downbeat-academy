# @downbeat-academy/cadence-tokens

## 2.4.0

### Minor Changes

- 9a1d49a: Add shadow, border width, overlay, easing, and disabled opacity tokens (Phase 1–2 tokenization)

  New tokens:
  - `--cds-elevation-box-shadow-{raised,floating,overlay,popover,inset}` — named shadow scale
  - `--cds-border-width-{thin,medium}` — 1px and 2px border widths
  - `--cds-color-overlay-scrim` — modal/drawer backdrop color
  - `--cds-animation-easing-{standard,enter,exit,linear}` — named easing curves
  - `--cds-state-disabled-opacity` — shared disabled state opacity

  Updated cadence-core components to use new tokens in place of hardcoded values:
  dialog, drawer, dropdown-menu, hover-card, button, checkbox, checkbox-card, radio-card, input, switch

- c284a74: Phase 3 tokenization: z-index, content widths, breakpoints, icon sizes, and SCSS mixins.

  New tokens added to cadence-tokens:
  - `--cds-z-index-{base,raised,dropdown,overlay,sticky}` — semantic z-index scale
  - `--cds-content-width-{sidebar,dialog,form}` — common layout widths
  - `--cds-breakpoint-{sm,md,lg,xl}` — responsive breakpoints (SCSS use only)
  - `--cds-size-icon-{small,medium,large}` — icon sizing scale

  New `mixins.scss` exported from cadence-tokens providing SCSS breakpoint helpers (`bp-sm-up`, `bp-md-down`, etc.).

  cadence-core components updated to use `--cds-z-index-overlay` and `--cds-z-index-dropdown` tokens in dialog, drawer, dropdown-menu, hover-card, and toast. Restored accidentally removed `max-width: 450px` on dialog content.

  www app updated to replace hardcoded `600px` form widths, `400px` dialog widths, `300px` sidebar widths, and `1px` border declarations with their corresponding design tokens.

## 2.3.1

### Patch Changes

- 2ea6f1c: Update tier 1 and tier dependencies

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
