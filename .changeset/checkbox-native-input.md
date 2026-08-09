---
'cadence-core': major
---

`Checkbox` is now a native `<input type="checkbox">` instead of
`@radix-ui/react-checkbox`. Radix rendered a `<button role="checkbox">` plus a second,
hidden `<input>` bubbled in purely so the control would participate in form submission;
that hack is gone, and there is now exactly one input in the DOM. Form participation,
label association, `required` validity, and Space-to-toggle all come from the platform.

**Breaking.** The change API is now native:

| Before (Radix) | After (native) |
| --- | --- |
| `onCheckedChange={(checked) => …}` | `onChange={(e) => … e.target.checked}` |
| `checked="indeterminate"` | `indeterminate={true}`, independent of `checked` |
| `CheckboxProps extends ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>` | `extends Omit<ComponentPropsWithoutRef<'input'>, 'type'>` |
| ref is `HTMLButtonElement` | ref is `HTMLInputElement` |

`onCheckedChange` is removed rather than kept as a shim — the point of the migration is to
own a native surface, and a Radix-shaped callback name would outlive the dependency.
`indeterminate` is a DOM property with no HTML attribute, so it is set imperatively via
ref; it is orthogonal to `checked`, which is what the DOM has always modelled and what
`checked="indeterminate"` obscured.

`Checkbox` has no external consumers — it is used only by `form/checkbox-card/`, which is
commented out of the form barrel and does not ship. That call site is updated.

Styling moved off Radix's `[data-state]` and `[data-disabled]` attributes onto the native
`:checked`, `:indeterminate` and `:disabled` pseudo-classes, with `appearance: none` on
the input. Because a checkbox is a void element and cannot contain the check mark, the
icon is now an `aria-hidden` sibling overlaid on the input and revealed by CSS — which
keeps uncontrolled (`defaultChecked`) usage working, since React never learns the value in
that case. Visual output is unchanged.

Testing: the previous 13 tests asserted the Radix surface and two of them were vacuous
(`expect(querySelector(…)).toBeDefined()` passes on `null`). Replaced with 29 tests
covering the native contract — form participation via `FormData`, the `indeterminate` DOM
property, Space toggling but not Enter, and label association — plus 7 new axe tests.
Adds a `declaredSelectors()` helper to `src/test-utils/`, since asserting that styling
moved from `[data-state]` to `:checked` needs rule selectors, and `declaredRules()`
returns only rule bodies.

`@radix-ui/react-checkbox` is dropped from `dependencies` and the Rollup `external` array,
and leaves `pnpm-lock.yaml` entirely.
