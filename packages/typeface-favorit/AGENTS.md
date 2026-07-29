# AGENTS.md — `packages/typeface-favorit`

Font files and `@font-face` declarations for **ABC Favorit**, the *productive* typeface in
Cadence.

Repo-wide rules live in [`../../AGENTS.md`](../../AGENTS.md).

## What it is

A plain CSS package. No build step, no scripts, no dependencies. `"main": "index.css"`.

```
index.css     @font-face declarations
files/        the font binaries
scss/         SCSS partials
```

Consumed by `cadence-core`, `www`, `auth`, and `cadence-links`, all of which import it
through their style entry chain (for example `apps/www/src/styles/index.css`).

## Where it is used

Favorit backs the **productive** family —
`--cds-typography-font-family-productive-body` and `-productive-headline` in
`packages/cadence-tokens/tokens/typography/font-family.json`.

Productive type is for app chrome: dashboards, forms, buttons, tables, navigation, admin
surfaces, settings, microcopy. Content and marketing use *expressive* type, which is
[`../typeface-tiempos-text/`](../typeface-tiempos-text/). See
[`../../AGENTS.md`](../../AGENTS.md) for the full rule.

## Licensing

ABC Favorit is a **commercial typeface from Dinamo**. The binaries in `files/` are
licensed, not free. Do not copy them into another project, publish this package, or serve
the files from a public URL outside the licensed domains.

## Changing anything here

Rarely necessary. If you add a weight or style:

1. Add the binary to `files/`.
2. Add the matching `@font-face` block to `index.css` (and the SCSS partial if used).
3. Confirm the licence covers the new cut.
4. Add a changeset.

No rebuild is needed — consumers import the CSS directly.

## Related

- [`../typeface-tiempos-text/AGENTS.md`](../typeface-tiempos-text/AGENTS.md) — the expressive counterpart
- [`../../docs/architecture/design-system.md`](../../docs/architecture/design-system.md)
