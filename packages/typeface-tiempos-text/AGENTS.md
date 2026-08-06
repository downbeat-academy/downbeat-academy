# AGENTS.md — `packages/typeface-tiempos-text`

Font files and `@font-face` declarations for **Tiempos Text**, the *expressive* typeface in
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

Tiempos Text backs the **expressive** family —
`--cds-typography-font-family-expressive-body` and `-expressive-headline` in
`packages/cadence-tokens/tokens/typography/font-family.json`.

Expressive type is for brand and editorial surfaces: marketing headlines, hero sections,
long-form article / handbook / lexicon bodies, and quotes — anywhere voice and craft
matter more than density. App chrome uses *productive* type, which is
[`../typeface-favorit/`](../typeface-favorit/). See [`../../AGENTS.md`](../../AGENTS.md)
for the full rule.

## Licensing

Tiempos Text is a **commercial typeface from Klim Type Foundry**. The binaries in
`files/` are licensed, not free. Do not copy them into another project, publish this
package, or serve the files from a public URL outside the licensed domains.

## Changing anything here

Rarely necessary. If you add a weight or style:

1. Add the binary to `files/`.
2. Add the matching `@font-face` block to `index.css` (and the SCSS partial if used).
3. Confirm the license covers the new cut.
4. Add a changeset.

No rebuild is needed — consumers import the CSS directly.

## Related

- [`../typeface-favorit/AGENTS.md`](../typeface-favorit/AGENTS.md) — the productive counterpart
- [`../../docs/architecture/design-system.md`](../../docs/architecture/design-system.md)
