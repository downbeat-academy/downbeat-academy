# Cadence design system

Four packages, one pipeline: tokens define the values, components consume them, apps
consume the components.

This file covers the **mechanism** — what holds what, in which order it builds, and the
conventions for changing it. For the **intent** — which token to use and why — read
[`../design/design-language.md`](../design/design-language.md).

```
cadence-tokens ──▶ cadence-core ──▶ www / auth / cadence-links
      │                 ▲
      │                 └── cadence-icons
      └──────────▶ cadence-core-web-components   (Lit; no consumer yet)
```

## `cadence-tokens` — the values

style-dictionary v5. `config.js` (CommonJS) reads `tokens/**/*.json` and emits one `web`
platform with the `css` transform group, prefix **`cds`**, and transforms
`attribute/cti`, `name/kebab`, `color/hex`, `size/rem`.

Two outputs into `dist/web/`: `tokens.css` (custom properties) and `tokens.scss`
(SCSS variables). A `mixins.scss` sits alongside.

### Categories

`animation` (easing, transition), `border`, `breakpoint`, `color`, `content`,
`elevation`, `focus`, `radii`, `scale`, `size`, `state`, `typography` (font-family,
font-size, line-height), `z-index`.

### The color layering matters

`tokens/color/palette.json` holds raw numeric ramps — `blackberry.400`, `violet.700`, and
so on. The other five files (`foreground`, `surface`, `border`, `page`, `overlay`) are the
**semantic layer**, and reference the palette rather than restating hex values:

```json
"foreground": { "strong": { "value": "{color.palette.blackberry.800}" } }
```

**Always consume the semantic token, never the palette.** `var(--cds-color-foreground-strong)`
is correct; `var(--cds-color-palette-blackberry-800)` defeats the whole system and will
break when the palette is re-tuned or when theming lands.

### Consuming tokens

Apps import the built CSS by relative node_modules path — for example
`apps/www/src/styles/index.css`:

```css
@import '../../node_modules/cadence-tokens/dist/web/tokens.css';
@import '../../node_modules/cadence-core/dist/cadence-core.min.css';
/* then typefaces, then global.css */
```

The raw path is used because the package's `exports` map is wrong: the key
`"./dist/web.tokens.css"` points at the **`.scss`** file, and `.` also resolves to
`.scss`. Nobody can import the CSS through the export map, so everyone bypasses it. Noted
in [`../adr/0002-known-gaps.md`](../adr/0002-known-gaps.md).

### Changing a token

```bash
pnpm tokens:build && pnpm build:packages
```

Both steps. `cadence-core` inlines the token CSS at build time (below), so rebuilding
tokens alone leaves components carrying the old values.

## `cadence-core` — the components

27 top-level components, 235 exported identifiers (144 runtime values + 91 `*Props`
types), React 18/19 peer.

### Folder-per-component

```
src/components/button/
├── button.tsx           # implementation
├── button-wrapper.tsx   # optional composition layer
├── button.module.css    # CSS Module
├── types.ts             # ButtonProps etc.
├── index.ts             # re-exports
├── __test__/            # vitest
└── __docs__/            # *.stories.tsx and *.mdx
```

Compound components nest — `form/` contains `input/`, `select/`, `checkbox/`, `radio/`,
`radio-card/`, `switch/`, `textarea/`, `field/`, `layout/`, `primitives/`,
`horizontal-wrapper/`.

### The barrel is the public API

`src/index.ts` explicitly re-exports every component **and** every `*Props` type. There
are no subpath exports — consumers write `import { Button } from 'cadence-core'`.

**A component not listed in `src/index.ts` does not exist to consumers.** This is the
single most common reason a newly added component "isn't found".

### Styling

CSS Modules referencing `--cds-*` custom properties. Class names are hashed at build time
by the `generateScopedName` function in `vite.config.ts` into `cds-<component>-<name>--<hash>`.

Because names are hashed, **tests must assert against the imported CSS module binding**,
not a literal string:

```ts
import s from '../button.module.css'
expect(el).toHaveClass(s.root)      // correct
expect(el).toHaveClass('root')      // wrong — never matches
```

Many components wrap Radix UI primitives (dialog, drawer, dropdown-menu, tabs, toast,
tooltip, hover-card, switch, checkbox, radio-group, separator, collapsible, slot).
`DataTable` wraps `@tanstack/react-table` and supports manual/server-side sorting,
pagination, and filtering — use it for any list or table view rather than hand-rolling.

### Build

`pnpm core:build` = `clean && build:js && build:types`.

- `build:js` — rollup, emitting `dist/index.esm.js` and `dist/index.cjs.js`, both with a
  `'use client'` banner.
- `build:types` — a separate `tsc --emitDeclarationOnly`.
- CSS: rollup extracts **all** styles, including `cadence-tokens`' compiled CSS, into a
  single `dist/cadence-core.min.css`, exposed as the `./styles.css` subpath export. This
  is why importing `cadence-core/styles.css` also gives you the tokens — and why token
  changes require a `cadence-core` rebuild.

### Storybook

Storybook 10 + react-vite, port 6006. `.storybook/main.ts` globs `../src/**/*.stories.*`
and `**/*.mdx`, so `__docs__/` folders are picked up automatically. Its `viteFinal`
aliases `cadence-icons` to its `dist/` — falling back to source if unbuilt — and
`cadence-tokens` to its `dist/`. Published via Chromatic and served on Railway from
`storybook-static`.

## `cadence-icons` — the icons

79 icons. SVG files live in `src/assets/`; `pnpm icons:build` runs SVGR
(`clean && svgr`) to regenerate `src/components/*.tsx`, then `pnpm build` runs
`tsc --noEmit && vite build`.

**`src/components/` is generated output.** Edit the SVG, not the component. A
`scripts/ensure-icons.js` prebuild guard checks the generation step has run.

Consumed as named imports: `import { ChevronDown } from 'cadence-icons'`.

## `cadence-core-web-components` — the Lit port

13 components (badge, banner, blockquote, button, flex, grid, link, section-container,
section-title, separator, skeleton-loader, summary, text) mirroring a subset of
`cadence-core`, built on Lit and depending only on `cadence-tokens`.

Same folder convention, `@open-wc/testing`, Storybook on port 6007, ESM-only output.

**Nothing in this repo consumes it.** It exists to keep the option of using Cadence
outside React open. Treat it as exploratory: do not let it block work, and do not assume
a change in `cadence-core` needs mirroring here.

## Typography: productive vs expressive

Two families. Choose by asking **"is this application UI, or is this brand and
editorial?"**

| | Productive | Expressive |
| --- | --- | --- |
| Token | `--cds-typography-font-family-productive-{body,headline}` | `--cds-typography-font-family-expressive-{body,headline}` |
| `<Text type>` | `productive-body`, `productive-headline` | `expressive-body`, `expressive-headline` |
| Use for | Traditional web application elements — forms, buttons, tables, navigation, dashboards, settings, admin, microcopy | Brand-oriented and editorial — marketing headlines, heroes, article/handbook/lexicon bodies, quotes |
| Optimized for | Density and legibility | Voice and craft |

Productive is the default for anything utilitarian. **Never mix the two inside one
surface** — an expressive headline over productive-body form labels in a settings panel
is a bug, not a style choice.

## Conventions checklist

When adding or changing a component:

- [ ] Folder-per-component layout, including `__test__/` and `__docs__/`
- [ ] Exported from `src/index.ts` — component *and* `*Props` type
- [ ] CSS Module only; every value a `--cds-*` token, no hardcoded colors or spacing
- [ ] Semantic color tokens, never palette tokens
- [ ] Correct type family for the surface
- [ ] Keyboard accessible and announced correctly — verify with a real role query in the test
- [ ] `pnpm core:build` and check it in Storybook
- [ ] Changeset added

## Related

- [`../design/design-language.md`](../design/design-language.md) — what each ramp and
  semantic family *means*, and how to choose between them
- [`../design/figma-workflow.md`](../design/figma-workflow.md) — the design ↔ code pipeline
- [`../adr/0003-design-source-of-truth.md`](../adr/0003-design-source-of-truth.md) — why
  the token files are authoritative and Figma is generated
- [`monorepo.md`](./monorepo.md) — build order and why tokens must precede core
- [`../proposals/tokenization-proposal.md`](../proposals/tokenization-proposal.md) —
  planned shadow, border-width, easing, overlay, icon-size, breakpoint and z-index tokens
- [`../adr/0002-known-gaps.md`](../adr/0002-known-gaps.md) — the `radio-card` accessibility
  defect, the missing lint setup, the broken tokens export map
