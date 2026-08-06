# Component inventory

The map between `cadence-core` components and their Figma counterparts, and the prop ↔
variant axes for each.

Components are **drawn in Figma**, not generated from code — see
[`../adr/0003-design-source-of-truth.md`](../adr/0003-design-source-of-truth.md). None of
the 27 has a Figma counterpart yet. This file is what lets the two be matched up as the
library fills in: it records what each code component's variant surface actually is, so a
newly drawn Figma component can be mapped to the code it corresponds to rather than
re-derived from scratch.

It is also the interim stand-in for Code Connect, which needs an Organization plan (see
[`figma-workflow.md`](./figma-workflow.md)), and is deliberately written in the shape Code
Connect consumes — component, variant axes, prop mapping.

**What each column means:**

- *Variant axes* — the component's current variant surface **in code**. This is the record of what ships today.
- *Figma node* — filled in when that component is drawn. `_tbd_` means it does not exist in Figma yet, which is expected.

**Source of truth for the axes is the component's `types.ts`.** When one changes there,
this file is wrong until updated. Update it in the same PR.

A newly drawn Figma component may deliberately carry variants the code does not. That is a
design not yet built, not a discrepancy to reconcile — note it in the row and leave the
code column describing what ships.

---

## How variants are expressed in code

Two patterns, both in `packages/cadence-core/src/components/`:

1. **Exported union types** in `types.ts` — `ButtonVariant`, `ButtonSize`, `ToastVariant`, `DrawerSide`, `DataTableAlignment`, `DataTableBackgroundColor`.
2. **Inline unions** on the props interface — the majority. Functionally identical; the axis is the union.

Either way the runtime mapping is a hand-written object literal keyed by the union member:

```ts
const variantMap = { primary: s.primary, secondary: s.secondary } as const
```

`packages/cadence-core/src/components/text/text.tsx` has five such maps and is the
canonical example. **These maps are the Figma variant table.** A union member with no entry
in the map is a variant that renders nothing — worth checking when a Figma variant appears
to do nothing in code.

---

## Primitives — the highest-value ones to draw first

These carry real variant surface and are what most designs are composed from, so drawing
them first makes every later design cheaper to map.

| Component | Variant axes (prop → values) | Figma node |
| --- | --- | --- |
| `text` | `type` → productive-body, productive-headline, expressive-body, expressive-headline · `size` → mega, h1–h6, body-large, body-base, body-small, body-x-small · `color` → the ten `color.foreground.*` roles · `background` → the eight `color.surface.*` roles · `align` → left, center, right, justify · `isFluid` → boolean | _tbd_ |
| `button` | `variant` → primary, secondary, ghost, destructive · `size` → x-small, small, medium, large · `iconPosition` → leading, trailing | _tbd_ |
| `badge` | `type` → neutral, info, success, highlight, warning, error · `size` → small, medium, large · `style` → filled, outlined, light | _tbd_ |
| `banner` | `type` → primary, secondary, tertiary | _tbd_ |
| `card` | `borderColor` → none, primary, faint | _tbd_ |
| `avatar` | `size` → small, medium, large · `spacing` → large, small, overlap-small, overlap-large · `direction` → vertical, horizontal | _tbd_ |
| `summary` | `type` → contained, flush · `size` → small, medium, large | _tbd_ |
| `link` | `type` → primary, secondary, brand, inherit (`LinkType`) · `isUnderline` → boolean · polymorphic via `as` | _tbd_ |
| `separator` | `color` → primary, faint, brand, interactive, success, warning, critical, high-contrast (`SeparatorColor`) · `orientation` from Radix | _tbd_ |
| `skeleton-loader` | `direction` → ltr, rtl | _tbd_ |
| `blockquote` | no variant axis. Content slots: `quote`, `attribution`, `link` | _tbd_ |
| `audio-player` | `size` → small, medium, large | _tbd_ |

### Form controls

`form/` is a compound directory. Each of these is its own component set.

| Component | Variant axes | Figma node |
| --- | --- | --- |
| `form/input` | `type` → text, email, number, tel, url, password | _tbd_ |
| `form/field` | `orientation` → vertical, horizontal | _tbd_ |
| `form/layout` | `spacing` → none, small, medium, large · `method` → POST, GET | _tbd_ |
| `form/horizontal-wrapper` | `gap` → none, small, medium, large | _tbd_ |
| `form/radio-card` | `orientation` → horizontal, vertical · `gap` → small, base, large · `size` → small, medium, large · `alignment` → left, center | _tbd_ |
| `form/checkbox-card` | same axes as `radio-card` | _tbd_ |
| `form/primitives` | `type` → success, warning, error (validation messaging) | _tbd_ |
| `form/select`, `form/checkbox`, `form/radio`, `form/switch`, `form/textarea` | state axes only (checked, disabled, invalid) | _tbd_ |

> `form/radio-card` has a known accessibility defect with 14 quarantined tests. Do not
> treat its current behavior as the specification — see
> [`../adr/0002-known-gaps.md`](../adr/0002-known-gaps.md).

---

## Layout components — do not draw as Figma components

| Component | Why |
| --- | --- |
| `flex` | `direction`, `alignItems`, `alignContent`, `justifyItems` — these are Figma auto-layout properties, not variants. Modeling them as a component set produces a combinatorial explosion that describes nothing |
| `grid` | Same |
| `section-container`, `section-title` | Page-composition wrappers. Use them in Figma page layouts; do not make them library components |

---

## Overlays and interactive surfaces

Worth drawing as component sets only when a static representation is genuinely useful.
Their value in Figma is the *content* frame, not the trigger behavior.

| Component | Variant axes | Note |
| --- | --- | --- |
| `dialog` | width from `content.width.dialog` | `overlay` elevation and z-index |
| `drawer` | `side` → right, left (`DrawerSide`) | `overlay` elevation |
| `toast` | `variant` → default, success, error, warning · `direction` → from-right, from-bottom | Note: `variant` uses `error`, while the color system's role is `critical` |
| `dropdown-menu` | item states only | `dropdown` z-index |
| `hover-card`, `tooltip` | none | `popover` elevation |
| `tabs` | `orientation` → vertical, horizontal · `dir` → ltr, rtl · `activationMode` → automatic, manual | `activationMode` is behavior, not a visual variant — omit from Figma |
| `sidebar` | width from `content.width.sidebar` | |
| `data-table` | `alignment` → start, center, end · `backgroundColor` → none, primary | Wraps `@tanstack/react-table`; the Figma version is presentational only |
| `brand` | none — SVG logo components | Ship as Figma assets, not a variant set |

---

## Watch out: 21 components reference palette tokens directly

`--cds-color-palette-*` appears 162 times across 21 of the 51 CSS Modules in
`cadence-core`, against the rule that components consume semantic tokens only. Affected:
`audio-player` (3 files), `badge`, `blockquote`, `button`, `data-table`, `dialog`,
`drawer`, `dropdown-menu`, `hover-card`, `link`, `sidebar`, `summary`, `tabs`, `toast`,
and five `form/` controls (`checkbox`, `checkbox-card`, `radio`, `radio-card`, `switch`).

This matters when drawing any of these: **the shipped component is bound to a raw color,
not to a semantic role.** If the Figma version is drawn to match what currently renders,
it inherits the drift and makes it look intentional.

**Draw against the semantic variable the component should be using**, not the palette
value it currently resolves to, and note the divergence in that component's row. The Figma
version is the intent; the palette reference in code is a defect awaiting a fix. Tracked in
[`../adr/0002-known-gaps.md`](../adr/0002-known-gaps.md).

## Naming mismatches to preserve

When mapping, keep the **code** name and note the divergence rather than renaming either
side. Renaming to make the map tidy breaks the mapping it exists to record.

- `toast` uses `variant="error"`; the color system's semantic role is `critical`. Both are correct in their own layer.
- `badge` uses `type="info"` and `type="highlight"`; neither is a `color.foreground.*` role. They map to `interactive` and `brand` respectively.
- `button` uses `variant="destructive"`; the color role is `critical`.

## Related

- [`figma-workflow.md`](./figma-workflow.md) — how this file becomes Code Connect
- [`design-language.md`](./design-language.md) — what the color roles referenced above mean
- [`../architecture/design-system.md`](../architecture/design-system.md) — the barrel export rule and component anatomy
