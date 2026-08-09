---
name: new-component
description: Scaffold a new component in packages/cadence-core following the Cadence conventions — folder layout, CSS Modules over design tokens, barrel export, test, and story. Use when adding any reusable UI component to the design system.
---

# New Cadence component

The layout is mechanical and the failure modes are consistent, so follow this exactly.

## Before scaffolding

**Check it does not already exist.** Search `packages/cadence-core/src/index.ts` for the
name and for near-synonyms — there are 27 components and 235 exports, and the barrel is
the authoritative list.

**Check it belongs here.** `cadence-core` owns anything reusable across apps. A one-off
composition specific to a single app belongs in that app's `src/components/`. If in
doubt, it belongs here — app-local UI has a habit of being copy-pasted.

**Decide what implements the interaction.** In order of preference:

1. **The native element, where one exists.** Form controls, `<dialog>` with `showModal()`,
   `<details>`, the Popover API, CSS anchor positioning. Native gives you form
   participation, focus trapping, top-layer placement, and keyboard behavior for free —
   usually with *less* code than a wrapper, not more.
2. **Hand-rolled against the WAI-ARIA APG**, for well-specified patterns the platform does
   not cover — tabs with roving tabindex, for instance. Only with tests written first.
3. **A dependency**, only for patterns the platform genuinely does not cover and the APG
   does not make safe to hand-roll. Right now that means menus, with typeahead, submenu
   safe-triangle tracking, and collision-aware positioning.

The browser-support floor is **Baseline Newly Available**, with progressive enhancement
below it — see [`docs/adr/0003-browser-support-floor.md`](../../../docs/adr/0003-browser-support-floor.md).
That is what makes option 1 viable for overlays and positioning.

**Do not add a new Radix dependency.** `cadence-core` is actively removing them; see the
Remove Radix Dependencies epic. `dropdown-menu` is the one deliberate retention, recorded
in [`docs/adr/0002-known-gaps.md`](../../../docs/adr/0002-known-gaps.md).

## Scaffold

```
packages/cadence-core/src/components/<name>/
├── <name>.tsx           implementation
├── <name>.module.css    styles
├── types.ts             <Name>Props
├── index.ts             re-exports
├── __test__/
│   └── <name>.test.tsx
└── __docs__/
    └── <name>.stories.tsx
```

Copy the shape of an existing component of similar complexity. `badge/` is a good simple
reference, and `form/select/` and `summary/` are the references for building on a native
element — a styled `<select>` and a native `<details>` respectively.

Do **not** copy `form/checkbox-card/`, which has a known accessibility defect, and do not
copy the Radix-wrapping components as a pattern — they are what this package is migrating
away from. For a selectable card, copy `form/radio-card/`: a `<label>` around a real
input, styled off `:has()`.

### `<name>.tsx`

- `forwardRef` unless there is a reason not to.
- Destructure props explicitly; spread the rest onto the root element.
- Compose class names with `classnames`.
- `<Name>.displayName = '<Name>'`.

### `<name>.module.css`

- **Every value comes from a `--cds-*` token.** No hardcoded colors, spacing, radii,
  font stacks, or durations.
- Use **semantic** color tokens (`--cds-color-foreground-strong`), never palette tokens
  (`--cds-color-palette-blackberry-800`).
- Pick the right type family: **productive** for traditional web application elements
  (forms, buttons, tables, navigation, settings), **expressive** for brand-oriented and
  editorial surfaces (marketing headlines, heroes, long-form bodies). Productive is the
  default for UI. See the root [`AGENTS.md`](../../../AGENTS.md).

### `types.ts`

Export `<Name>Props`. Extend the appropriate `React.ComponentPropsWithoutRef<'element'>`
so consumers get native props for free.

## Export it — the step that gets missed

Add **both** the component and its props type to
`packages/cadence-core/src/index.ts`:

```ts
export { Badge } from './components/badge'
export type { BadgeProps } from './components/badge'
```

There are no subpath exports. **A component absent from that barrel does not exist to
consumers**, and the error they see is an unhelpful module resolution failure.

## Test

vitest + Testing Library, jsdom.

**Use the shared helpers in `src/test-utils/`** rather than writing your own:

| Helper | Use |
| --- | --- |
| `axeViolations(container, rules?)` | Runs axe; assert `toEqual([])` so a failure names the rule and node |
| `declaredRule(className)` | Declared `cssText` for one class |
| `declaredRules(className)` | Every rule containing the class — `:hover`, `[data-state]`, other modifiers |
| `formatViolations(violations)` | Readable output when the raw array is too noisy |

Import by relative path (`../../../test-utils`). They are deliberately **not** exported
from `src/index.ts` — the barrel is the public API.

Two rules specific to this package:

**Class names are hashed at build time.** Assert against the imported module binding:

```ts
import s from '../<name>.module.css'
expect(el).toHaveClass(s.root)   // correct
expect(el).toHaveClass('root')   // never matches
```

**jsdom does not resolve `var()`.** `getComputedStyle` on any token-driven property
returns the CSS initial value — `border: 1px solid var(--cds-color-border-faint)` reads
back as `borderStyle: 'none'`. To assert token-driven styling, inspect the *declared* rule
with `declaredRule(s.root)`. `src/components/sidebar/__test__/sidebar-styles.test.tsx` is
the worked example.

Cover: renders, variants and sizes apply the right classes, disabled/invalid states,
`className` passthrough, ref forwarding, and — for anything interactive — **a real
`getByRole` query and keyboard operation**. That last one is not optional; it is exactly
what was missing when `radio-card` shipped inaccessible.

For anything interactive, add an `-a11y.test.tsx` alongside it using `axeViolations()`.
Note that `color-contrast` cannot run under jsdom and is disabled — check contrast in the
Storybook a11y addon panel instead.

## Story

`__docs__/<name>.stories.tsx`. Storybook globs `src/**/*.stories.*` automatically. Include
a default story and one per meaningful variant.

## Verify

```bash
pnpm core:build
pnpm --filter cadence-core test
pnpm core:storybook            # look at it — render it, tab through it
pnpm verify                    # from the repo root
```

Then add a changeset:

```md
---
'cadence-core': minor
---

Add <Name> — one line on what it is for.
```

`minor` for a new component, `patch` for a fix to an existing one.

## Checklist

- [ ] Built on the native element where one exists; no new Radix dependency
- [ ] Anything below the browser-support floor degrades to a working fallback
- [ ] Folder layout complete, including `__test__/` and `__docs__/`
- [ ] Exported from `src/index.ts` — component **and** `*Props`
- [ ] Every CSS value is a `--cds-*` token; semantic, not palette
- [ ] Correct type family for the surface
- [ ] Keyboard operable and announced correctly, asserted by role in the test
- [ ] `pnpm core:build` clean, story renders
- [ ] Changeset added

## Related

- [`packages/cadence-core/AGENTS.md`](../../../packages/cadence-core/AGENTS.md)
- [`docs/architecture/design-system.md`](../../../docs/architecture/design-system.md)
