---
'cadence-core': patch
---

Backfills the test suite for `Tabs` (Radix task 0.3, slice 4), unblocking the B.3 rewrite
onto the WAI-ARIA APG roving-tabindex pattern.

52 tests across `tabs.test.tsx` and `tabs-a11y.test.tsx`, written against the current Radix
behaviour so they are the regression contract the replacement has to satisfy. Covers the
role and id wiring in both directions, the lazy roving tabindex, arrow/`Home`/`End`
navigation in both orientations, `loop`, disabled-tab skipping, both activation modes,
controlled and uncontrolled `value`, `forceMount`, and every styling hook.

No source change — `Tabs` is untouched. Unlike the rest of this epic, B.3 is not a breaking
type change, because `tabs/types.ts` is already hand-written and Radix-free.
