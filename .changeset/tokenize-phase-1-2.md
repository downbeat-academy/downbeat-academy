---
"cadence-tokens": minor
"cadence-core": patch
---

Add shadow, border width, overlay, easing, and disabled opacity tokens (Phase 1–2 tokenization)

New tokens:
- `--cds-elevation-box-shadow-{raised,floating,overlay,popover,inset}` — named shadow scale
- `--cds-border-width-{thin,medium}` — 1px and 2px border widths
- `--cds-color-overlay-scrim` — modal/drawer backdrop color
- `--cds-animation-easing-{standard,enter,exit,linear}` — named easing curves
- `--cds-state-disabled-opacity` — shared disabled state opacity

Updated cadence-core components to use new tokens in place of hardcoded values:
dialog, drawer, dropdown-menu, hover-card, button, checkbox, checkbox-card, radio-card, input, switch
