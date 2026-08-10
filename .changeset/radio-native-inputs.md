---
'cadence-core': major
'www': patch
---

`Radio` and `RadioGroup` are now native `<input type="radio">` elements instead of
`@radix-ui/react-radio-group`. This is the clearest case in the Radix removal for the
platform being better than the library: radios that share a `name` get arrow-key
navigation, single selection, wrapping, roving tabindex and form participation **from the
browser**, with no JavaScript. `@radix-ui/react-roving-focus` was reimplementing all of it.

**Breaking.**

| Before (Radix) | After (native) |
| --- | --- |
| `<RadioGroup onValueChange={(v) => …}>` | `<RadioGroup onChange={(v) => …}>` — same `(value: string) => void` signature |
| `<RadioGroup loop>` | removed; native radios always wrap |
| `RadioGroupProps extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>` | `extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange' \| 'defaultValue'>` |
| `RadioProps extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>` | `extends Omit<ComponentPropsWithoutRef<'input'>, 'type'>` |
| `Radio` ref is `HTMLButtonElement` | ref is `HTMLInputElement` |
| `RadioCardGroupProps.loop` | removed for the same reason |

`onValueChange` is renamed rather than removed. A radio group is the one abstraction the
platform genuinely lacks — HTML has no group element and no group change event — so a
group-level callback stays, but it no longer carries a Radix-shaped name. `Radio` still
accepts its own DOM `onChange`, which fires alongside the group callback.

`RadioGroup` now generates a shared `name` with `useId()` when none is given. This is not
cosmetic: the shared `name` is the only thing that makes the browser treat the inputs as
one group, and therefore the only reason keyboard navigation works at all. Two groups on
one page stay independent without any wiring.

`value` is now typed `string` rather than Radix's looser type, and `RadioGroupOrientation`
is newly exported. `orientation` sets both `aria-orientation` and the `data-orientation`
styling hook the stylesheet already used.

Styling moved off `[data-state]` and `[data-disabled]` onto `:checked` and `:disabled`,
with `appearance: none` on the input. Because a radio is a void element and cannot contain
its own dot, the indicator is now an `aria-hidden` sibling revealed by CSS — which keeps
uncontrolled groups working, since React never learns which radio the browser selected.
The dot's existing 8×6 dimensions are reproduced exactly, so there is no visual change.

Consumers updated: `radio-card` internally (its own public `onValueChange` is unchanged),
and `www`'s admin role-change dialog, which is a one-word rename.

Testing: the previous 15 tests asserted the Radix surface — `aria-checked`,
`data-disabled`, and a `value` *attribute* on a `<button role="radio">`. Replaced with 37
tests on the native contract, including a full keyboard block covering arrow keys in both
axes, wrapping at both ends, single-tab-stop entry at the selected radio, and Space
selection — none of which the component implements. Adds 7 axe tests; `Radio` had none.

`@radix-ui/react-radio-group` is dropped from `dependencies` and the Rollup `external`
array, and leaves `pnpm-lock.yaml` entirely.

The `RadioCardItem` accessibility defect is **not** fixed here — that is task A.4, which
this unblocks. It now carries a comment pointing at its 14 quarantined tests so its
passing suite is not mistaken for correctness.
