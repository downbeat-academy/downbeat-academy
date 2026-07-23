---
"cadence-core": minor
---

Card, Grid, Select, and DataTable polish driven by the admin dashboard cleanup.

- `Card` gains a `radius` prop (`none | hard | medium | soft | x-soft`, mapped to the `--cds-radii-*` tokens) defaulting to `soft`, so cards match the rounding of `SectionContainer` instead of shipping hard edges. `.root` now sets `overflow: hidden` so `CardImage` clips to the corner.
- `Card` gains a `background` prop mirroring `Flex`'s surface options (`primary | faint | high-contrast | brand | interactive | success | warning | critical`).
- `Card` now forwards remaining props to the rendered element.
- `Grid` gains a `gap` prop using the `--cds-scale-*` tokens (defaults to `none`, so existing layouts are unchanged) and a `minColumnWidth` prop that overrides the auto-fit column threshold for narrow layout regions.
- `Select` fixes: the native `<select>` had `width: 100%` commented out, so it was content-sized while the wrapper and the absolutely-positioned chevron stretched to full width — leaving the chevron floating far from the control. Also replaced the nonexistent `--cds-color-border-interactive-hover` / `--cds-color-surface-interactive-hover` hover tokens and the raw `--cds-color-palette-blackberry-100` disabled color with real semantic tokens, and tokenized the border widths.
- `DataTable` referenced `--cds-radii-small`, which is not a token in `cadence-tokens` (the scale is `x-soft | soft | medium | hard | none`), so the pagination buttons, page-size select, filter clear button, and loading skeleton all rendered square. These now use `--cds-radii-hard`.
