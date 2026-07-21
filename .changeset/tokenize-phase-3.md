---
"cadence-tokens": minor
"cadence-core": patch
"www": patch
---

Phase 3 tokenization: z-index, content widths, breakpoints, icon sizes, and SCSS mixins.

New tokens added to cadence-tokens:
- `--cds-z-index-{base,raised,dropdown,overlay,sticky}` — semantic z-index scale
- `--cds-content-width-{sidebar,dialog,form}` — common layout widths
- `--cds-breakpoint-{sm,md,lg,xl}` — responsive breakpoints (SCSS use only)
- `--cds-size-icon-{small,medium,large}` — icon sizing scale

New `mixins.scss` exported from cadence-tokens providing SCSS breakpoint helpers (`bp-sm-up`, `bp-md-down`, etc.).

cadence-core components updated to use `--cds-z-index-overlay` and `--cds-z-index-dropdown` tokens in dialog, drawer, dropdown-menu, hover-card, and toast. Restored accidentally removed `max-width: 450px` on dialog content.

www app updated to replace hardcoded `600px` form widths, `400px` dialog widths, `300px` sidebar widths, and `1px` border declarations with their corresponding design tokens.
