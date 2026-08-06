# Design

How Cadence looks and why, and how design and code stay in sync.

This directory is the **intent** half of the design system.
[`../architecture/design-system.md`](../architecture/design-system.md) is the **mechanism**
half — which package holds what, the build order, the styling conventions. Read that one
to find out how a token reaches a component; read these to find out which token to use.

| Document | Covers |
| --- | --- |
| [`design-language.md`](./design-language.md) | The six palette ramps and what each means, the five semantic colour families and where a new need belongs, contrast targets, spacing rhythm, layout and breakpoints, elevation, motion, typography beyond the productive/expressive split, iconography rules |
| [`figma-workflow.md`](./figma-workflow.md) | The design ↔ code pipeline: direction of truth, what Figma is allowed to be authoritative about, the design → code and code → design paths, and what plan tier gates what |
| [`component-inventory.md`](./component-inventory.md) | The `cadence-core` component ↔ Figma component map and the prop ↔ variant axes for each. The interim stand-in for Code Connect |

The decision underpinning all three is
[`../adr/0003-design-source-of-truth.md`](../adr/0003-design-source-of-truth.md).

## Where design information lives

Three systems, three jobs. Nothing is duplicated between them, and each cites the others
rather than restating them.

| System | Holds | Authoritative for |
| --- | --- | --- |
| **This repo** | `packages/cadence-tokens/tokens/**`, `packages/cadence-core`, and these docs | Every design *value*, every component contract, and the rules governing both |
| **Figma** | Composition, exploration, unbuilt work, and a library generated from the tokens | Nothing the repo defines. Layouts and ideas only |
| **Notion** | Company → Brand (mission, positioning, voice), Inspiration (the reference library), Content (editorial strategy) | Brand strategy and taste — the *why* behind decisions this repo records the *what* of |

The practical rule: if it has a value, it is in the repo. If it has a rationale that is not
about implementation, it may be in Notion, and this directory should cite it rather than
paraphrase it. If it is a picture, it is in Figma and it is not authoritative.

## Writing docs here

Same rules as [`../README.md`](../README.md), plus one:

**No file in this directory restates a token value.** Cite the token name and the file it
lives in. A colour, size, duration, or font stack written here is a second source of truth
that will drift silently — see the ADR. If you need to show a value to make a point, link
to the token file instead.

## Related

- [`../../DESIGN.md`](../../DESIGN.md) — the root router, for agents arriving cold
- [`../architecture/design-system.md`](../architecture/design-system.md) — the mechanism
- [`../workflows/sdlc.md`](../workflows/sdlc.md) — where design work fits in the development loop
- [`../proposals/`](../proposals/) — design work not yet decided
