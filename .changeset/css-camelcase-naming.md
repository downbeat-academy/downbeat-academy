---
"cadence-core": minor
---

Migrate CSS class naming conventions from BEM to camelCase

Updated all CSS module class names from BEM notation (e.g., `block__element--modifier`) to functional camelCase notation (e.g., `blockElementModifier`) for better CSS modules compatibility.

## Components Updated
- Badge
- Banner
- Brand
- Button (including ButtonWrapper)
- Card
- Checkbox, CheckboxCard
- DataTable (including filter, pagination, body, cell, column-header, row)
- Flex
- Grid
- Input, Textarea, Select
- Label, HelperText, ValidationMessage
- Radio, RadioCard
- Summary
- Switch
- Text

## Changes
- All BEM-style hyphenated class names converted to camelCase
- String interpolation for class lookups replaced with type-safe mapping objects
- Bracket notation `s['className']` replaced with dot notation `s.className`

## Migration Notes
This is a non-breaking internal change. Component props and public APIs remain unchanged. Consuming applications do not need to make any modifications.
