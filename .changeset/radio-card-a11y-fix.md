---
'cadence-core': major
---

Fixes the `RadioCardItem` accessibility defect recorded in `docs/adr/0002-known-gaps.md`
and removes all 14 `it.skip` markers from its test file.

`RadioCardItem` rendered the real radio with `aria-hidden="true"` and `tabIndex={-1}`, and
moved selection onto a bare `<div role="radio" onClick>`. The control was therefore
invisible to assistive technology and unreachable by keyboard — a shipped defect every
consumer inherited.

**The card is now a `<label>` wrapping a real `<input type="radio">`.** That single change
is the whole fix: a click anywhere on the card activates the input natively, the input
stays in the tab order, and arrow keys move between cards because the inputs share a
`name`. There is no click handler, no key handler, no `tabIndex`, and no `role` asserted by
hand — all of it is browser behaviour, unlocked by the native-input migration in A.3.

Selected, focused and disabled styling is expressed with `:has()` against that input
(`.itemRoot:has(input:checked)`) rather than mirrored onto `data-state` / `data-disabled`
attributes, so the card cannot drift out of sync with the control it describes. `:has()`
has been Baseline Widely Available since December 2023, comfortably inside the
Baseline Newly Available floor set by `docs/adr/0003-browser-support-floor.md`.

**Breaking.** `RadioCardItemProps` now extends `ComponentPropsWithoutRef<'label'>` rather
than `<'div'>`, and its ref is `HTMLLabelElement`. The internal `_groupValue`,
`_groupOnValueChange` and `_groupName` props are gone — selection, the shared `name` and
the change callback travel through `RadioGroup`'s context to the input, so the card no
longer mirrors group state in JavaScript. `RadioCardGroup`'s public API is unchanged.

Accessibility improvements beyond the defect itself: the card's visible title now supplies
the control's accessible name through the wrapping label, with no `aria-label` to keep in
sync, and `required` is a real form constraint rather than `aria-required` on a div.

### On the 14 quarantined tests

Twelve documented the defect and now pass. Two mechanical translations were needed, neither
of which weakens them: they asserted `aria-checked` and `data-disabled`, which a native
input does not expose, and they asserted card modifier classes on the `role="radio"`
element, which is now the `<input>` and cannot carry them.

Two were **dropped**, because they were mis-specified from the start and never described
the accessibility defect:

- `applies variant classes` asserted `s.itemVariantOutlined` for a `variant` prop that has
  never existed on `RadioCardItem` — no prop, no stylesheet rule.
- `has proper indicator element` queried a hard-coded `.cds-radio-card-item--indicator`
  that cannot match the hashed class name, and asserted `toBeDefined()`, which passes on
  `null`. It is rewritten to assert the indicator actually renders.

The register's claim that all 14 were correct was therefore not quite right, and the
guidance derived from it has been corrected. Net: 29 behaviour tests, none skipped, plus 7
new axe tests — `radio-card` had no a11y coverage at all.

Documentation updated: the `RadioCardItem` entry is deleted from `0002-known-gaps.md` per
the register's own convention, and both `AGENTS.md` files, the `new-component` skill, and
the design-system, accessibility and test-engineer agent guides now point at `radio-card`
as the reference for a selectable card rather than as the anti-pattern. `checkbox-card`
still carries the same defect and is now named as the anti-pattern in its place; it is
commented out of the form barrel and does not ship.
