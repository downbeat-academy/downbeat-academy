---
'cadence-core': patch
---

Backfills the test suite for `DropdownMenu` (Radix task 0.3, slice 6, the last one) and
fixes three decorative icons that reached the accessibility tree.

`DropdownMenu` is a **deliberate Tier C retention** recorded in
`docs/adr/0002-known-gaps.md`, not a migration target — so unlike the other slices these
tests exist to stop a Radix upgrade changing its semantics silently, rather than to prepare
a rewrite. That is not hypothetical: five of this component's files carried the
`displayName` regression that arrived in `@radix-ui/react-dropdown-menu` 1.1.24.

**Three nameless `role="img"` svgs.** The checkbox tick, the radio dot, and the sub-trigger
chevron are all decorative — `aria-checked` and `aria-haspopup` already carry the meaning —
but `cadence-icons` renders `role="img"` with an `aria-labelledby` React drops when no
title is passed. Three `svg-img-alt` violations in a single open menu. All three are now
`aria-hidden`.

**The tests.** 53 across `dropdown-menu.test.tsx` and `dropdown-menu-a11y.test.tsx`,
covering the trigger and menu wiring, roving focus, arrow navigation past disabled items,
typeahead, `Escape` and focus return, checkbox and radio items, submenus, and every styling
hook.

With this, all five components that task 0.3 found untested — `separator`, `dialog`,
`tabs`, `toast`, and `dropdown-menu` — have suites.
