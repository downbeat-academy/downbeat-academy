---
"cadence-core-web-components": minor
---

Add Tier 2 layout web components: Flex, Grid, Grid Item, and Section Container.

- `cds-flex` — flex layout container with `direction`, `gap`, `padding`, `align-items`, `align-content`, `justify-content`, `wrap`, and `background` attributes; styles applied directly to `:host`
- `cds-grid` — responsive grid container with `columns` (1–12) attribute using the same `auto-fit` / `minmax` pattern as cadence-core
- `cds-grid-item` — grid child element with `span` and `row-span` attributes; implements the previously empty `GridItem` stub
- `cds-section-container` — card-like container with `background` and `border-color` attributes; `outline` used for border to match the React component

All components include Storybook stories and unit tests.
