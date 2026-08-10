---
name: radix-migrate
description: Migrate a cadence-core component off a @radix-ui/* primitive onto the platform — restructure, rewrite the Radix-shaped tests to the native contract, drop the dependency, and prove no Radix type reaches dist. Use for any task in the "Remove Radix Dependencies" epic, or any time a component stops wrapping a Radix primitive.
---

# Migrate a component off Radix

The recipe behind Radix A.1–A.7. Six components remain (`dialog`, `drawer`, `tabs`,
`toast`, `tooltip`, `hover-card`), and they fail in the same places.

Read the epic and the task in Notion first via `sync-notion` — the epic records _why_ each
component is tiered where it is, and Tier C retentions are deliberate, not oversights.

## 0. The gate

**A component does not get migrated until it has tests written against its current Radix
behaviour.** That is task 0.3, and it is a hard gate. The precedent is `form/radio-card/`,
which shipped inaccessible precisely because it was written without them.

If the component has no `__test__/` directory, stop and write that first as its own PR.

## 1. Establish the real contract before touching anything

Read, in this order:

1. The component, its `types.ts`, its CSS module, its `index.ts`
2. **Every consumer** — `grep -rn "<Name" apps packages --include=*.tsx` — and whether any
   is a shipping app surface rather than a story
3. The existing tests, asking of each one: _is this asserting behaviour, or is it
   asserting Radix?_

That third question is the whole job. Expect to find:

- `aria-checked`, `aria-required`, `data-state`, `data-disabled` — Radix's surface. A
  native control exposes **none** of these; state lives in DOM properties and real
  attributes.
- A `value` **attribute** asserted on a `<button role="…">`
- Tests that assert nothing: `expect(container.querySelector(…)).toBeDefined()` **passes on
  `null`**. Grep for `toBeDefined()` and treat every hit as suspect.
- Tests for props that were never implemented. Check the prop exists in `types.ts` and the
  class exists in the stylesheet before assuming a failing test is the component's fault.

**A quarantined or failing test is not automatically a correct test.** Read it against the
migrated component rather than assuming the skip was the only problem.

## 2. Structure: the void-element problem

Every form control migration hits this. `<input>` is a void element — it cannot contain
the check mark, the radio dot, or the switch thumb. So:

```tsx
// wrapper: position: relative · input: the styled control · indicator: overlaid sibling
<span className={s.wrapper}>
  <input type="…" className={s.root} {...props} />
  <span className={s.indicator} aria-hidden="true" />
</span>
```

- The **input** keeps `className` and the ref, so `getByRole()` and className passthrough
  behave as before.
- The indicator is `aria-hidden` and `pointer-events: none` — it must never intercept a
  click or reach the accessibility tree.
- Show and hide it in **CSS**, via `.root:checked ~ .indicator`, never with a JS-computed
  class. A class derived from the `checked` **prop** silently does nothing in uncontrolled
  usage, because React never learns the value changed. That was a real latent bug in
  `Switch`.

For a **selectable card**, wrap the whole card in a `<label>` around a real input, and
style it with `:has(input:checked)`. See `form/radio-card/`. Never put `role="radio"` on a
div with an `onClick` and hide the real control — that is the defect A.4 existed to fix,
and `form/checkbox-card/` still has it.

## 3. CSS: swap the state hooks

| Radix                               | Native                               |
| ----------------------------------- | ------------------------------------ |
| `[data-state='checked']`            | `:checked`                           |
| `[data-state='indeterminate']`      | `:indeterminate`                     |
| `[data-disabled]`                   | `:disabled`                          |
| `[data-state='open']` on a card/row | `:has(input:checked)` on the wrapper |

Add `appearance: none` to any input you style directly, or the browser's own control
renders underneath yours.

**Reproduce existing dimensions exactly**, even when they look wrong — the epic's
non-goals say Chromatic diffs should be empty. If you find a genuine visual defect (the
radio dot is an 8×6 ellipse), keep it, note it in the PR, and file it separately.

## 4. Types: this is the breaking part

```ts
// before
interface XProps extends ComponentPropsWithoutRef<typeof XPrimitive.Root> {}
// after
interface XProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {}
```

Declare explicitly whatever Radix used to contribute (`checked`, `orientation`,
`decorative`, `indeterminate`). Consumers lose `asChild` — that is the intended major bump.

Watch for **prop collisions through the spread**: if the element's own `onChange` collides
with a group-level callback of the same name, `Omit` it at the type level. That bit
`RadioCardGroupProps`.

`Omit<…, 'onChange'>` is also needed on any group component taking `onChange(value: string)`
rather than a DOM event.

## 5. Tests: write the native contract

Cover, at minimum:

- A real `getByRole()` query — never a test-id or class lookup
- **Keyboard**: Space toggles a checkbox/switch but **Enter does not** (Enter submits the
  form — Radix's `<button>` got Enter for free, which was wrong). Arrow keys and wrapping
  for radios. Tab reaching the control, and skipping it when disabled.
- **Form participation via real `FormData`**, and that there is exactly one `<input>` —
  the hidden bubble input Radix added is what you are deleting
- Controlled _and_ uncontrolled, including that a controlled input does not drift when the
  owner ignores the change
- Ref forwarding to the real control
- An `-a11y.test.tsx` using `axeViolations()` from `src/test-utils`

Two helpers, and the difference matters:

- `declaredRule(class)` / `declaredRules(class)` → rule **bodies**
- `declaredSelectors(class)` → rule **selectors**. This is the one that proves styling
  moved from `[data-state]` to `:checked`. Reaching for `declaredRules` there fails
  confusingly.

jsdom has no layout engine and does not resolve `var()`, so `getComputedStyle` assertions
on token-driven properties are vacuous, and `axeViolations` disables `color-contrast`
permanently. Contrast is a Storybook a11y panel job.

**Native elements have implicit roles.** `getByRole('radio')` finds an
`<input type="radio">`, but `querySelectorAll('[role="radio"]')` returns **zero** — there
is no attribute. Assert with `getAllByRole`, and use the attribute query only to prove
nothing asserts the role by hand.

## 6. Drop the dependency — both places

```bash
# 1. packages/cadence-core/package.json  — dependencies
# 2. packages/cadence-core/rollup.config.js — the `external` array   ← easy to miss
pnpm install
grep -c "react-<name>" pnpm-lock.yaml
```

A package only leaves the lockfile if nothing else pulls it. `react-slot` stays, because
the remaining Radix packages depend on it — say so honestly rather than claiming a
removal you did not make.

## 7. Prove it

```bash
pnpm core:build --force          # --force: turbo will happily serve a stale cached build
grep -rn "react-<name>" packages/cadence-core/dist/   # expect nothing but comments
cat packages/cadence-core/dist/components/<path>/types.d.ts
pnpm verify
```

**Zero Radix types in `dist/*.d.ts` is a success criterion of the epic**, not a nicety —
check the emitted file, not the source.

`pnpm --filter www typecheck` runs against `cadence-core`'s built `dist/`, so rebuild
before believing a consumer type error.

## 8. Update the stories

Stories are the most-missed step. They use the old API and will not fail `verify` — they
fail at runtime in Storybook. Grep for the removed prop names (`onCheckedChange`,
`onValueChange`, `loop`, `checked="indeterminate"`) and for `argTypes` entries describing
props that no longer exist. A `checked` prop with no handler becomes `defaultChecked`.

## 9. Ship

Follow the `ship` skill. The changeset is `major` for any component whose types change, and
should state the before/after API as a table. Then do its retrospective step.

## Related

- `sync-notion` — the epic and its tasks
- `ship` — verification, changeset, PR, retrospective
- `stack` — these migrations usually stack
- [`docs/adr/0003-browser-support-floor.md`](../../../docs/adr/0003-browser-support-floor.md)
  — Baseline Newly Available; `:has()` is fine, `::details-content` is not
