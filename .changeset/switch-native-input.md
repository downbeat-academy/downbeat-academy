---
'cadence-core': major
---

`Switch` is now a native `<input type="checkbox" role="switch">` instead of
`@radix-ui/react-switch`. Radix rendered a `<button role="switch">` and bubbled a hidden
input in for form participation; that workaround is gone, and there is now exactly one
input in the DOM. A checkbox carrying `role="switch"` is the standard native switch — it
keeps form participation, label association and Space-to-toggle, while still being
announced as an on/off control rather than a checkbox.

**Breaking**, matching the Checkbox migration in A.2:

| Before (Radix) | After (native) |
| --- | --- |
| `onCheckedChange={(checked) => …}` | `onChange={(e) => … e.target.checked}` |
| `SwitchProps extends ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>` | `extends Omit<ComponentPropsWithoutRef<'input'>, 'type' \| 'role'>` |
| ref is `HTMLButtonElement` | ref is `HTMLInputElement` |

`Switch` has no external consumers — it appears only in stories — so nothing outside the
package changes.

One deliberate behaviour change: **Enter no longer toggles the switch.** Radix's
button-based control activated on Enter for free; a native checkbox does not, because
Enter submits the form. Space toggles, which is the platform behaviour for this control.

The track is the input itself, styled with `appearance: none`. The thumb and check mark
cannot be children of a void element, so they are `aria-hidden` siblings positioned over
it. Styling moved off `[data-state]` and `[data-disabled]` onto `:checked` and
`:disabled`.

That fixes a latent bug in passing: the thumb's position and the check mark's visibility
were previously driven by `thumbChecked` and `checkIconVisible` classes computed from the
`checked` **prop**, so an uncontrolled switch never moved its thumb — React never learned
the value had changed. Both are now sibling selectors off `:checked`, so uncontrolled
switches animate correctly. The `thumbChecked` and `checkIconVisible` classes are gone.

`.thumb:hover` became `.root:hover:not(:disabled) ~ .thumb`, since the thumb is no longer
a child of the control and cannot be hovered directly. Its specificity is deliberately
left higher than the `:checked` rule, exactly as `.thumb:hover` outranked `.thumbChecked`
before, so hover behaviour is unchanged.

Testing: the previous 8 tests asserted `aria-checked` and `onCheckedChange`. Replaced with
24 tests on the native contract — `FormData` participation, `role="switch"` without also
being exposed as a checkbox, Space but not Enter, label association — plus 7 new axe
tests; `Switch` had none.

`@radix-ui/react-switch` is dropped from `dependencies` and the Rollup `external` array,
and leaves `pnpm-lock.yaml` entirely. `cadence-core` now declares **8 Radix packages,
down from 12** at the start of the epic.
