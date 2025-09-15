---
"cadence-core": minor
"www": minor
---

feat: migrate HoverCard and Tooltip components to cadence-core

This migration centralizes the HoverCard and Tooltip components from the www app into the cadence-core design system package, providing:

**HoverCard Component**:
- Complete migration with all primitives (HoverCard, HoverCardContent, HoverCardTrigger, HoverCardTitle, HoverCardMain, HoverCardFooter, HoverCardArrow)
- Comprehensive Storybook documentation with 11 stories covering all use cases
- 39 passing unit tests with full coverage
- Accessibility improvements (WCAG 2.1 AA compliance)
- Snake-case file naming convention
- Portal rendering for proper DOM structure

**Tooltip Component**:
- Full migration with TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, TooltipArrow
- Complete Storybook documentation with 8 stories
- 39 passing unit tests with comprehensive coverage
- Proper accessibility support for screen readers
- Design system integration with CSS modules and tokens

**Breaking Changes**:
- Updated import paths for HoverCard components in www app
- Added TooltipProvider requirement at app level
- Removed local HoverCard and Tooltip implementations from www

**Technical Improvements**:
- Added "use client" directives for all Radix UI-based components
- Updated rollup configuration for proper external dependencies
- Maintained backward compatibility for component APIs
- Enhanced build process for component library distribution