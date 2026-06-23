# cadence-core-web-components

## 0.2.0

### Minor Changes

- fe0f764: Add Tier 1 web components: Badge, Text, Separator, Link, and Skeleton Loader.
  - `cds-badge` — display badge with `type`, `variant` (filled/outlined/light), and `size` attributes; supports icon and text slots
  - `cds-text` — typography component with `type`, `size`, `color`, `align`, `collapse`, `background`, and `tag` attributes
  - `cds-separator` — horizontal/vertical divider with `orientation`, `color`, and `decorative` attributes
  - `cds-link` — anchor wrapper with `type`, `no-underline`, `href`, `target`, and `rel` attributes
  - `cds-skeleton-loader` — shimmer loading placeholder with `count`, `width`, `height`, `border-radius`, `circle`, `inline`, `direction`, `duration`, and `no-animation` attributes

  All components include Storybook stories and unit tests.

- 2f77bf3: Add Tier 2 layout web components: Flex, Grid, Grid Item, and Section Container.
  - `cds-flex` — flex layout container with `direction`, `gap`, `padding`, `align-items`, `align-content`, `justify-content`, `wrap`, and `background` attributes; styles applied directly to `:host`
  - `cds-grid` — responsive grid container with `columns` (1–12) attribute using the same `auto-fit` / `minmax` pattern as cadence-core
  - `cds-grid-item` — grid child element with `span` and `row-span` attributes; implements the previously empty `GridItem` stub
  - `cds-section-container` — card-like container with `background` and `border-color` attributes; `outline` used for border to match the React component

  All components include Storybook stories and unit tests.

- bbf3c54: Add Tier 3 composite display web components: Banner, Section Title, Blockquote, and Summary.
  - `cds-banner` — thin wrapper with a `type` attribute (`primary` | `secondary` | `tertiary`) and a single default slot; compose `<section>`/`<aside>` inside for content + actions
  - `cds-section-title` — `alignment` (`left` | `center` | `right`), `background`, and `has-border` (boolean, default `true`) attributes; named `title` and `subtitle` slots plus a default slot for body content
  - `cds-blockquote` — `attribution`, `link`, and `collapse` (boolean) attributes; default slot for the quote text; composes `cds-text` and `cds-link` internally
  - `cds-summary` — wraps native `<details>`/`<summary>` for stateless disclosure; `is-open`, `type` (`contained` | `flush`), `size` (`small` | `medium` | `large`), and `max-width` attributes; named `title` slot and default content slot, with an inline chevron icon that rotates when open

  All components include Storybook stories and unit tests.

## 0.1.1

### Patch Changes

- 4d3d348: Dependency bump: Vite 8.0.12
- f7a0524: Update dependencies; Storybook 10, Chromatic 16.
- 38c53a1: Add serve configuration for production Storybook hosting. Adds `start` script and `serve` dependency matching cadence-core so the web components Storybook can run on Railway and other platforms.
- 2ea6f1c: Update tier 1 and tier dependencies
- Updated dependencies [2ea6f1c]
  - cadence-tokens@2.3.1
