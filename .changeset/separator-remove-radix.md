---
'cadence-core': major
---

`Separator` no longer wraps `@radix-ui/react-separator`. It renders a plain `<div>` that
carries `role="separator"` (or `role="none"` when `decorative`, which remains the
default), `aria-orientation` only for the vertical non-decorative case, and
`data-orientation` always — the stylesheet sizes the separator off that attribute rather
than off a class. The rendered markup is unchanged in every case, so there is no visual
or accessibility difference; the 30 tests backfilled in Radix 0.3 pass untouched. A dead
`orientation--${orientation}` class lookup was dropped along the way — the stylesheet
never declared those rules, so `classnames` had always been discarding it.

**Breaking, for types only.** `SeparatorProps` previously extended
`ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>`, so consumers inherited Radix's
props — most notably `asChild`. It now extends `ComponentPropsWithoutRef<'div'>` and
declares `color`, `orientation`, and `decorative` explicitly. `asChild` is gone; compose
by rendering the separator alongside your element instead of merging into it. `SeparatorElement`
is now `HTMLDivElement` rather than `ElementRef<typeof SeparatorPrimitive.Root>`, so no
Radix type reaches `dist/index.d.ts`. `SeparatorOrientation` is newly exported.

`@radix-ui/react-separator` is dropped from `dependencies` and from the Rollup `external`
array. Nothing else in the workspace depended on it, so it leaves `pnpm-lock.yaml`
entirely.

Also adds the `'use client'` directive that `separator.tsx` was missing — previously
masked by the whole-bundle Rollup banner.
