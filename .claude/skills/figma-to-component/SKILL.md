---
name: figma-to-component
description: Turn a Figma design into Cadence code without hardcoding values — read the node, map every value onto an existing --cds-* token, map structure onto existing cadence-core components, and flag whatever has no token as a design decision. Use whenever work starts from a Figma frame, node, or link.
---

# Figma → Cadence

The Figma MCP server returns concrete values: a hex, a pixel padding, a shadow string, a
font size. Pasting those into a CSS Module produces code that looks correct, passes review,
and silently stops following the design system. Every hardcoded value is a component that
will not respond to a token change and will not survive theming.

**This skill exists to force the mapping step.** Do not write CSS from a Figma node
directly. Work the order below.

Read [`docs/design/design-language.md`](../../../docs/design/design-language.md) first —
mapping requires knowing what each token *means*, not just what it equals.

## 1. Read the node

Use the read-only Figma MCP tools:

- `get_metadata` — structure and node IDs first, before pulling anything large
- `get_design_context` — the node's properties
- `get_variable_defs` — any Figma variables it binds. A bound variable maps to a token by name; a raw value does not
- `get_screenshot` — to see what you are building

If a `figma.com` link was given, that is the node. If only a file was given, get metadata
and ask which frame rather than guessing.

## 2. Map structure to existing components

**Most designs are compositions of components that already exist.** There are 27 in
`cadence-core`. Check the barrel — `packages/cadence-core/src/index.ts` — and
[`docs/design/component-inventory.md`](../../../docs/design/component-inventory.md), which
maps each component's variant axes.

For each region of the design, name the component and the props that produce it. A
"card with a title, body text and a button" is `Card` + `Text` + `Button`, not new markup.

Only what genuinely has no existing component moves to step 5.

## 3. Map every value to a semantic token

For each color, spacing, radius, shadow, duration, and type size in the design, find the
token whose **meaning** matches — not merely the token whose value is closest.

- Color → the semantic role, using the five families in `design-language.md`. `--cds-color-foreground-strong`, never `--cds-color-palette-*`. A palette reference in component CSS is a defect.
- Spacing, gap, padding → a `scale` step. Never interpolate between steps.
- Radius → a `radii` step, chosen by how soft the component should feel.
- Shadow → an `elevation` step, chosen by what the element *is* (resting, lifted, out of flow), and paired with the matching `z-index` role.
- Type → the productive/expressive split first, then size. Productive has no fluid scale; if the design scales chrome type with the viewport, the design is wrong.
- Motion → a `transition` step, or a duration composed with an `easing` token for enter/exit.

Record the mapping as you go. It is the output of this step and the input to review.

## 4. Flag every value with no token — this is the important output

Do **not** pick "the nearest token" silently, and do **not** hardcode. List them
explicitly:

> `#4A5568` on the sidebar divider — no matching semantic token.
> Nearest is `--cds-color-border-faint`. Needs a decision.

A design that cannot be expressed in tokens is telling you something. Usually the design
drifted from the system; occasionally the system has a real gap. Both are conversations,
and neither is resolved by inlining a value.

Where the answer is a new token, propose it in [`docs/proposals/`](../../../docs/proposals/)
following `tokenization-proposal.md`. Where the answer is that the design should change,
say so.

**Stop here and report** if there is more than a handful of unmapped values. Building on an
unresolved mapping wastes the build.

## 5. Only now, build

- Composition of existing components → build it in the consuming app.
- Genuinely new reusable component → `/new-component`, which owns the scaffold, the barrel
  export, and the test conventions.
- New token → `packages/cadence-tokens/tokens/`, then `pnpm tokens:build && pnpm build:packages`.

## 6. Verify

```bash
pnpm verify
pnpm core:storybook      # or pnpm www:dev — look at it against the design
```

Check by hand: no hardcoded color, spacing, radius, or font stack in any new CSS Module;
semantic tokens only; correct type family for the surface; keyboard operable.

## Output format

Report the mapping, not just the code:

1. **Components used** — which existing ones, with which props
2. **Token mapping** — design value → token, per property
3. **Unmapped values** — each with the nearest token and a recommendation
4. **What was built**, and what still needs a decision

## Don't

- Don't write CSS containing a value read off a Figma node.
- Don't use a palette token because the design's hex matches one exactly. That is the most tempting way to break the semantic layer.
- Don't create a component that duplicates an existing one under a different name.
- Don't call a Figma **write** tool. This skill only reads. Creating files, generating designs, uploading assets, and publishing Code Connect mappings all need the user to ask for them.

## Related

- [`docs/design/design-language.md`](../../../docs/design/design-language.md) — what the tokens mean
- [`docs/design/figma-workflow.md`](../../../docs/design/figma-workflow.md) — direction of truth and plan tiers
- [`docs/design/component-inventory.md`](../../../docs/design/component-inventory.md) — component ↔ variant map
- [`DESIGN.md`](../../../DESIGN.md) — the decision ladder
- `/new-component` — the scaffold, once something new is genuinely needed
