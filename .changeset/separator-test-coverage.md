---
'cadence-core': patch
---

Adds the first test coverage for `Separator`, which shipped untested. Records the current
`@radix-ui/react-separator` behavior as a regression contract: `role="none"` by default and
`role="separator"` when `decorative` is false, `aria-orientation` emitted only for the
vertical non-decorative case, and `data-orientation` present regardless — the attribute the
stylesheet keys off. Adds an axe suite covering both roles, both orientations, and the
in-list position.

Tests only — no component, API, or bundle change.
