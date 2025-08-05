---
'cadence-core': patch
---

Remove duplicative CSS class prefixes from component modules

This change eliminates duplicative "cds-" prefixes in CSS class names that were being doubled by the build system. Previously, classes like `.cds-badge--root` would generate `cds-cds-badge--root--hash` in production builds. 

Changes:
- Updated CSS module class names to use semantic names (`.root`, `.primary`, `.wrapper` etc.)
- Build system now generates clean, scoped class names like `badge-module_root__abc123`
- Maintains all existing component functionality and styling
- Affects all 37 component CSS modules across the design system

This is a patch release as it maintains API compatibility while fixing CSS output generation.