---
'cadence-core': patch
---

Replaces `@radix-ui/react-slot` with an in-house `Slot` and `Slottable` in
`src/components/slot/`. **No public API change** — neither was ever re-exported from
`src/index.ts`, and the one consumer, `sidebar/sidebar-link.tsx`, behaves identically. The
existing sidebar suite, including `renders through Slot when asChild is true`, passes
untouched.

The motivation is coupling rather than dependency count. `sidebar-link.tsx` carried a
comment explaining that its children had to be spread as siblings rather than wrapped in a
Fragment *because of how Radix's `SlotClone` used `cloneElement` internally* — that is a
dependency on a library's implementation detail, not on its public API. The behaviour is
now specified by this package's own tests.

The implementation is about 90 lines: merge props onto the single child element, compose
refs, and support `Slottable` to mark which child gets promoted. Merge semantics match
what the sidebar relied on — event handlers compose child-first then slot, `style` merges
with the child winning, `className` concatenates, and every other prop lets the child win.
Ref extraction handles both React conventions, since the package's peer range still allows
18 alongside 19: React 19 moved `ref` into props, and reading `element.ref` under 19 logs
a deprecation warning, so it branches on `React.version` rather than probing.

24 tests specify it, including the two misuse cases that should throw rather than silently
pick a child, and the ref-composition case where the slot and the child each carry a ref.

`@radix-ui/react-slot` is removed from `dependencies` and the Rollup `external` array.
Unlike the earlier Tier A migrations it does **not** leave `pnpm-lock.yaml` — the remaining
Radix packages (`dialog`, `dropdown-menu`, `tabs`, `tooltip`, `hover-card`, `toast`,
`collapsible`) all depend on it transitively, so it will only disappear when the last of
them does. What changes here is that `cadence-core` no longer declares or bundles it
itself.

`cadence-core` now declares **7 Radix packages, down from 12** at the start of the epic.
