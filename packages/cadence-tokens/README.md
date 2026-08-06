# Cadence Design System Tokens

Design tokens for the Cadence Design System, built with
[style-dictionary](https://styledictionary.com). Every color, space, radius, and type
value used across Downbeat Academy originates here.

Tokens are emitted as CSS custom properties with a `--cds-` prefix, plus an SCSS variant:

```
dist/web/tokens.css     --cds-color-foreground-strong, --cds-scale-small, …
dist/web/tokens.scss
```

## Usage

```bash
pnpm tokens:build && pnpm build:packages
```

Both steps. `cadence-core` inlines the compiled token CSS into its own bundle at build
time, so rebuilding tokens alone leaves components carrying stale values.

Consumers import the compiled CSS by path:

```css
@import '../../node_modules/cadence-tokens/dist/web/tokens.css';
```

## Color is two-layered

`tokens/color/palette.json` holds raw ramps. The other color files are the semantic
layer and reference the palette. **Always consume the semantic token** —
`var(--cds-color-foreground-strong)`, never `var(--cds-color-palette-blackberry-800)`.

## Documentation

- [`AGENTS.md`](./AGENTS.md) — conventions, build details, and gotchas
- [`../../docs/architecture/design-system.md`](../../docs/architecture/design-system.md)
