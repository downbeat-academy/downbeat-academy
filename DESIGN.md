# DESIGN.md

Entry point for visual and design decisions in this repo.

**This file contains no design values.** No colors, no sizes, no font stacks. Every value
lives in [`packages/cadence-tokens/tokens/`](./packages/cadence-tokens/tokens/) and is
built to `--cds-*` custom properties by style-dictionary. A markdown copy of those values
would drift the first time `pnpm tokens:build` runs, and would be trusted anyway — see
[`docs/adr/0004-design-source-of-truth.md`](./docs/adr/0004-design-source-of-truth.md).

## Making a visual decision

Work down this ladder. Stop at the first step that answers the question.

1. **Is there a `cadence-core` component for this?** Prefer one over hand-rolled markup,
   always. 27 components — check
   [`packages/cadence-core/src/index.ts`](./packages/cadence-core/src/index.ts) and
   Storybook (`pnpm core:storybook`, port 6006).
2. **Is there a semantic token for this value?** Use it. Semantic tokens only —
   `--cds-color-foreground-strong`, never `--cds-color-palette-blackberry-800`. Reaching
   into the palette defeats the layer that makes theming possible.
3. **Does [`docs/design/design-language.md`](./docs/design/design-language.md) say which
   token?** It covers what each palette ramp means, where a new color need belongs among
   the five semantic families, contrast targets, spacing rhythm, layout, elevation,
   motion, typography, and iconography.
4. **None of the above?** Then this is a design decision, not an implementation detail.
   Record it in [`docs/proposals/`](./docs/proposals/) and propose the token.
   [`docs/proposals/tokenization-proposal.md`](./docs/proposals/tokenization-proposal.md)
   is the exemplar.

Inventing a value inline is the one option that is never correct.

## Two rules that are not negotiable

- **Semantic tokens, never palette tokens.** See step 2.
- **Productive type for chrome, expressive type for content**, and never both inside one
  surface. See [`AGENTS.md`](./AGENTS.md#typography-productive-vs-expressive).

## Where to read further

| For | Read |
| --- | --- |
| Which token to use and why | [`docs/design/design-language.md`](./docs/design/design-language.md) |
| How tokens reach components reach apps | [`docs/architecture/design-system.md`](./docs/architecture/design-system.md) |
| How Figma and this repo stay in sync | [`docs/design/figma-workflow.md`](./docs/design/figma-workflow.md) |
| Component ↔ Figma variant mapping | [`docs/design/component-inventory.md`](./docs/design/component-inventory.md) |
| Everything else about working here | [`AGENTS.md`](./AGENTS.md) |
