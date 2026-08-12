---
'cadence-core': patch
---

Backfills the test suite for `Dialog` (Radix task 0.3, slice 3) and fixes an accessibility
defect the suite uncovered.

**The defect.** `DialogContent` renders its own close button containing nothing but `<X />`,
and `cadence-icons`' `X` sets `role="img"` with `aria-labelledby={titleId}` — undefined
unless a `title` is passed, so React omits the attribute entirely. The svg was therefore a
nameless `role="img"` (`svg-img-alt`) and the button that contained only it was a nameless
button (`button-name`). Both fire on all six shipping consumer surfaces. It matters more
than the rule names suggest: initial focus lands on that button, so opening any dialog
announced an unnamed control. `DrawerContent` carried the identical defect and is fixed
alongside. The close button now has `aria-label="Close"` and the icon is `aria-hidden`.

**The tests.** 53 across `dialog.test.tsx` and `dialog-a11y.test.tsx`, written against the
current Radix behaviour so they are the regression contract the B.1 rewrite onto native
`<dialog>` must satisfy. No visual change, no API change.
