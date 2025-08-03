---
'cadence-core': major
---

**BREAKING CHANGE: Standardized CSS class names and architecture**

This is a major refactor of the cadence-core component library's CSS architecture:

## CSS Class Name Standardization
- **All CSS class names now use `cds-` prefix** (Cadence Design System)
- **Implemented consistent BEM notation** across all components
- **Flattened nested CSS selectors** for improved performance and specificity management

## Components Updated
- **Button and ButtonWrapper**: Standardized class names and BEM structure
- **Brand/Logo**: Unified logo component CSS with consistent naming
- **Card (including image component)**: Complete class name overhaul
- **Badge, Flex, Grid, Text**: Consistent BEM implementation
- **List**: Standardized list component CSS
- **HorizontalWrapper and Switch**: Updated to new naming convention

## Breaking Changes
This update requires consumers to update their CSS overrides and any references to the previous class names. The new standardized naming provides:
- Better component isolation
- Consistent naming patterns across the design system
- Improved CSS performance with flattened selectors
- Clearer component boundaries with BEM methodology

## Migration Required
Projects using cadence-core will need to update any custom CSS that targets the old class names to use the new `cds-` prefixed classes.
