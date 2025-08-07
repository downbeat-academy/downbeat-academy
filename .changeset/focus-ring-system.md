---
'cadence-tokens': minor
'cadence-core': minor
---

Add focus ring system for accessibility

- Add focus ring design tokens with standard (Blueberry) and critical (Peach) colors
- Implement focus rings for all interactive components (Button, Input, Checkbox, Radio, Switch, Textarea, RadioCard, CheckboxCard)
- Use :focus-visible for buttons and form controls (keyboard navigation only)
- Use :focus for text inputs and textarea (all interactions)
- Add critical focus rings for error states
- Update all Storybook stories with Focus States examples
- Fix CheckboxCard accessibility with proper ARIA attributes and keyboard navigation
- Ensure WCAG compliance with proper focus indicators

