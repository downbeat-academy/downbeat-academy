---
'cadence-core': minor
'www': patch
---

Migrate DropdownMenu component from www to cadence-core

## cadence-core
- Added new DropdownMenu component built on `@radix-ui/react-dropdown-menu`
- Includes styled sub-components: Content, Item, CheckboxItem, RadioItem, Label, Separator, SubTrigger, SubContent, and Shortcut
- CSS module styling using Cadence design tokens for colors, spacing, typography, and radii
- Slide-in animations matching the existing Tooltip and HoverCard patterns
- Storybook documentation covering all sub-components and common usage patterns

## www
- Removed local DropdownMenu component in favor of the shared cadence-core version
