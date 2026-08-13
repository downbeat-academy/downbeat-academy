---
'cadence-core': patch
---

Backfill `Drawer`'s test coverage to the standard the rest of the epic holds.

`Drawer` was not on task 0.3's list of untested components because it had a suite — three
tests, 58 lines, `fireEvent`-based, every query a `getByText`. No `getByRole`, no keyboard
coverage, no a11y file. It failed the epic's own success criterion while looking like it
passed, which is a worse signal than having no tests at all: `form/radio-card/` shipped
inaccessible with tests on it.

This is the gate B.2b needs before `Drawer` moves onto the native `<dialog>` base. Three
files, 61 tests, no source change:

- **`drawer.test.tsx`** (jsdom, 50 tests) — composition and roles, the `side` prop, the
  trigger's popup attributes including `asChild`, controlled and uncontrolled open state
  with non-drift, styling hooks, ref forwarding, `displayName`s, and the built-in close
  button. Plus the shipping consumer shape from `changelog-drawer.tsx`.
- **`drawer.browser.test.tsx`** (Chromium, 11 tests) — focus movement and return, `Escape`,
  focus containment, overlay-versus-content clicks, reopening, and which side the drawer
  actually lands on.
- **`drawer-a11y.browser.test.tsx`** (Chromium, 5 tests) — axe across both sides, with and
  without a description, with interactive content, and while closed.

**The browser tests are written behaviourally on purpose.** The obvious way to pin Radix's
background inerting is `trigger.closest('[aria-hidden="true"]')`, because that is its
mechanism — and that is exactly the assertion that had to be discarded and rewritten when
`Dialog` migrated, since a native modal inerts through the top layer and sets no attribute
anywhere. Asserting what a user can reach, rather than how the library achieves it, means
these survive B.2b instead of being rewritten by the change they exist to protect.

The a11y suite goes straight into the browser project for the same reason: jsdom hides an
unopened `<dialog>` through its UA stylesheet and offers no `showModal()` to open it, so
after B.2b axe would walk a hidden subtree and return a clean result for a drawer it never
inspected.

Verified as a real gate rather than decoration — six naive regressions were introduced and
each was caught: dropping the close button's `aria-label` (3 failures), exposing its icon
to assistive technology (1), ignoring the `side` prop (2), dropping the base content class
(3), breaking a `displayName` (1), and dropping `className` forwarding on the trigger (1).
