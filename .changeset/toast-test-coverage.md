---
'cadence-core': patch
---

Backfills the test suite for `Toast` (Radix task 0.3, slice 5) and fixes two defects the
suite uncovered.

**`className` was silently dropped on five of six parts.** `ToastViewport`, `ToastTitle`,
`ToastDescription`, `ToastClose`, and `ToastAction` each destructured the prop and then
never applied it, while still declaring it in their public props type. Only `Toast` itself
honoured it. All five now merge it the way `Toast` already did. No consumer passes
`className` to these parts today, so nothing changes visually — the prop simply starts
working.

**The close button had no accessible name.** `ToastClose` renders only `<X />`, and
`cadence-icons`' `X` sets `role="img"` with `aria-labelledby={titleId}` — undefined unless a
`title` is passed, so React omits the attribute. That left the svg nameless under
`svg-img-alt` and the button nameless under `button-name`, across all 24 toast consumer
surfaces. This is the third instance of the same defect, after `Dialog` and `Drawer`. The
button now carries `aria-label="Close"` and the icon is `aria-hidden`.

**The tests.** 61 across three files — `use-toast.test.ts` covers the exported reducer as a
pure state machine, `toast.test.tsx` the rendered contract, and `toast-a11y.test.tsx` the
axe baseline. Written against the current Radix behaviour so they are the regression
contract a C.1 rewrite must satisfy.
