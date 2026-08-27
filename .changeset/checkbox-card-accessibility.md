---
'cadence-core': minor
---

Fix the `CheckboxCardItem` accessibility defect and export the component.

`CheckboxCardItem` put selection on a bare `<div role="checkbox" onClick tabIndex={0}>`
while the real input beneath it was `aria-hidden="true"` and `tabIndex={-1}` — so the
control was invisible to assistive technology and unreachable by keyboard. This is the
identical defect `RadioCardItem` carried until Radix A.4, and it is fixed the same way:
the card is now a `<label>` wrapping a real `<input type="checkbox">`.

The wrapper's `onClick`, `onKeyDown`, `tabIndex`, `role`, `aria-checked`, `aria-disabled`,
`data-state` and `data-disabled` are gone. Selected, indeterminate, focused and disabled
styling is expressed with `:has()` against the input rather than mirrored onto data
attributes, so the DOM cannot drift out of sync with the control. A click anywhere on the
card toggles the input natively, Space operates it, and the card sits in the tab order.

Two consequences of using a real input:

- `CheckboxCardGroup` now holds its own selected set when uncontrolled. `defaultValue` was
  previously cloned down to each item as `_groupDefaultValue`, which no item ever read, so
  an uncontrolled group rendered unchecked and could never change.
- A standalone `CheckboxCardItem` with no `checked` prop is genuinely uncontrolled instead
  of pinned unchecked by React.

`CheckboxCardGroup`, `CheckboxCardItem` and their prop types are now exported from
`cadence-core`. They were commented out of the barrel because of this defect, so nothing
could have consumed them before.

`CheckboxCardItemProps` now extends the props of `label` rather than `div`, and the ref is
an `HTMLLabelElement`. The internal `_groupDefaultValue` prop is removed.
