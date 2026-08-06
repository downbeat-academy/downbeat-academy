# AGENTS.md — `packages/cadence-tokens`

Design tokens for Cadence, built with style-dictionary v5. The root of the design system:
every color, space, radius, and type value in the product originates here.

Repo-wide rules live in [`../../AGENTS.md`](../../AGENTS.md). Pipeline context is in
[`../../docs/architecture/design-system.md`](../../docs/architecture/design-system.md).

## Commands

```bash
pnpm tokens:build                 # style-dictionary build — the only script
pnpm build:packages               # rebuild everything downstream after a token change
```

There is no dev server, no test, no lint, and no typecheck here — it is JSON in, CSS out.

## Layout

```
config.js              style-dictionary config (CommonJS)
mixins.scss
tokens/
├── color/             palette.json + foreground, surface, border, page, overlay
├── typography/        font-family.json, font-size.json, line-height.json
├── animation/         easing, transition
├── border/  breakpoint/  content/  elevation/  focus/
├── radii/  scale/  size/  state/  z-index/
dist/web/
├── tokens.css         CSS custom properties  ← what apps actually import
└── tokens.scss        SCSS variables
```

## How it builds

`config.js` reads `tokens/**/*.json`, emits one `web` platform using the `css` transform
group with prefix **`cds`**, and the transforms `attribute/cti`, `name/kebab`,
`color/hex`, `size/rem`.

So `tokens/color/foreground.json` → `--cds-color-foreground-strong`.

`@divriots/style-dictionary-to-figma` is a devDependency but is **not wired into
`config.js`** — there is currently no Figma export.

## The two-layer color model

This is the most important convention in the package.

`tokens/color/palette.json` holds raw numeric ramps — `blackberry.400`, `violet.700`.
The other five color files are the **semantic layer** and reference the palette rather
than restating values:

```json
"foreground": {
  "strong": { "value": "{color.palette.blackberry.800}", "type": "color" }
}
```

**Consumers must use semantic tokens.** `var(--cds-color-foreground-strong)` is correct.
`var(--cds-color-palette-blackberry-800)` bypasses the abstraction, and will break when
the palette is re-tuned or when theming lands.

When adding a color: add the raw value to `palette.json` **only** if it is genuinely a
new hue or step, then expose it through a semantic name. A semantic token with a
hardcoded hex is a bug.

## Changing a token

```bash
pnpm tokens:build && pnpm build:packages
```

**Both steps.** `cadence-core`'s rollup inlines the compiled token CSS into its own
`dist/cadence-core.min.css` at build time, so rebuilding tokens alone leaves every
component carrying stale values. This is the usual explanation for "I changed the token
and nothing happened".

## Gotchas

- **The `exports` map is wrong.** The key `"./dist/web.tokens.css"` resolves to the
  **`.scss`** file, and `.` does too. There is no way to import the compiled CSS through
  the package's public API, which is why all four consumers use a raw
  `node_modules/cadence-tokens/dist/web/tokens.css` path instead. See
  [`../../docs/adr/0002-known-gaps.md`](../../docs/adr/0002-known-gaps.md).
- **`dist/` is committed build output**, not source. Never hand-edit it.
- The package is `private`, so it is never published; consumers use `workspace:^`.

## Related

- [`../../docs/architecture/design-system.md`](../../docs/architecture/design-system.md)
- [`../../docs/proposals/tokenization-proposal.md`](../../docs/proposals/tokenization-proposal.md) —
  planned shadow, border-width, easing, overlay, icon-size, breakpoint and z-index tokens,
  plus theming architecture
- [`../cadence-core/AGENTS.md`](../cadence-core/AGENTS.md)
