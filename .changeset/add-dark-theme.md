---
'cadence-tokens': minor
'cadence-core': minor
---

Added dark theme support across the design system. Dark theme CSS token overrides remap all semantic and palette color variables under `[data-theme="dark"]`, including inverted blackberry scale and adjusted colored palettes for proper contrast on dark backgrounds. Added a presentational ThemeSwitcher component to cadence-core with light/dark/system toggle using a segmented control UI. Storybook now includes a toolbar theme toggle for previewing all components in both themes.
