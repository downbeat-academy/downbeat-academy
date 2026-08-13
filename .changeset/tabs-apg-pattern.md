---
'cadence-core': minor
---

Rebuild `Tabs` on the WAI-ARIA APG roving-tabindex pattern, removing
`@radix-ui/react-tabs`.

No native element exists for tabs, so this is a real reimplementation rather than a
handover to the platform — but the APG pattern is precisely specified and highly
testable, and the 52 tests backfilled in #313 carried through it almost unchanged.

**Not a breaking type change.** `tabs/types.ts` was already hand-written and Radix-free,
so no consumer loses a prop. `Tabs`, `TabsList`, `TabsTrigger` and `TabsContent` keep
their entire surface: `value`/`defaultValue`/`onValueChange`, `orientation`, `dir`,
`activationMode`, `loop`, `isContained`, `disabled`, `icon`, `padding`, `background`.

Two behaviour changes, both deliberate, both decisions the backfill left open:

- **The roving tabindex is now eager.** Radix left every tab at `tabindex="-1"` and put
  the tab stop on the `tablist` itself, handing off on the first keypress. The selected
  tab now carries the stop from first render and the tablist is not focusable — a
  focusable non-interactive container is a defect in its own right. Keyboard entry is
  unchanged. The one exception is a `Tabs` with no selection at all, where the list still
  takes the stop and forwards focus to the first enabled tab, because otherwise the whole
  group drops out of the tab order.
- **`forceMount` no longer un-hides the panel.** It previously dropped the `hidden`
  attribute too, leaving an unselected panel in the accessibility tree so two `tabpanel`s
  were reachable at once. It now means what it says and nothing more: keep the children
  mounted. `hidden` tracks selection alone.

Three latent bugs fixed while the files were open: the `padding` union omitted
`'2x-small'` although `.tabs--content--padding--2x-small` exists in the stylesheet;
`TabsContent` referenced a `tabs--content` class the stylesheet has never defined; and it
emitted `tabs--content--padding--undefined` / `--background--undefined` classes when
those props were unset. The `@ts-ignore` over `forceMount` is gone with the Radix types
that required it, and all four files gained the `'use client'` directive they were
missing.

`data-state="active" | "inactive"` is still emitted on triggers and panels. It is this
component's own attribute now rather than Radix's, kept because `tabs.module.css` styles
the active trigger through it and consumers may have done the same — so the stylesheet is
untouched and there is no visual change.

**`@radix-ui/react-tabs` does not leave `pnpm-lock.yaml`.** `apps/auth` declares it
independently for its own duplicate tabs component, which is tracked separately as
`Radix C.5`. What this removes is `cadence-core`'s declaration, its Rollup `external`
entry, and every Radix type from the emitted `dist/components/tabs/*.d.ts` — verified
against the built output, not the source.
