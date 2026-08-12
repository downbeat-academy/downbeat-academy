---
'cadence-core': patch
---

Backfills the test suite for `Dialog` (Radix task 0.3, slice 3) and fixes two defects the
suite uncovered.

**An unnamed close button.** `DialogContent` renders its own close button containing nothing
but `<X />`, and `cadence-icons`' `X` sets `role="img"` with `aria-labelledby={titleId}` —
undefined unless a `title` is passed, so React omits the attribute entirely. The svg was
therefore a nameless `role="img"` (`svg-img-alt`) and the button that contained only it was a
nameless button (`button-name`). Both fire on all six shipping consumer surfaces. It matters
more than the rule names suggest: initial focus lands on that button, so opening any dialog
announced an unnamed control. `DrawerContent` carried the identical defect and is fixed
alongside. The close button now has `aria-label="Close"` and the icon is `aria-hidden`.

**Thirteen `undefined` display names.** `@radix-ui/react-dialog` 1.1.23 — arriving in the
dependabot bump #310 — stopped setting `displayName` on its primitives. Thirteen components
across `dialog`, `tooltip`, `hover-card`, and `dropdown-menu` assigned theirs by copying
(`DialogContent.displayName = DialogPrimitive.Content.displayName`), so every one silently
became `undefined`, shifting Storybook's docgen output. All are now hand-set to the strings
they previously resolved to.

Also pinned: the closed `DialogTrigger` no longer carries `aria-controls` as of 1.1.23. That
is Radix removing a dangling IDREF, so the new behaviour is asserted rather than restored.

**The tests.** 54 across `dialog.test.tsx` and `dialog-a11y.test.tsx`, written against the
current Radix behaviour so they are the regression contract the B.1 rewrite onto native
`<dialog>` must satisfy. No visual change, no API change.
