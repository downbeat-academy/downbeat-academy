# Design

How Cadence looks and why, and how design and code stay in sync.

This directory is the **intent** half of the design system.
[`../architecture/design-system.md`](../architecture/design-system.md) is the **mechanism**
half — which package holds what, the build order, the styling conventions. Read that one
to find out how a token reaches a component; read these to find out which token to use.

| Document | Covers |
| --- | --- |
| [`design-language.md`](./design-language.md) | The six palette ramps and what each means, the five semantic color families and where a new need belongs, contrast targets, spacing rhythm, layout and breakpoints, elevation, motion, typography beyond the productive/expressive split, iconography rules |
| [`figma-workflow.md`](./figma-workflow.md) | The design ↔ code pipeline: direction of truth, what Figma is allowed to be authoritative about, the design → code and code → design paths, and what plan tier gates what |
| [`component-inventory.md`](./component-inventory.md) | The `cadence-core` component ↔ Figma component map and the prop ↔ variant axes for each. The interim stand-in for Code Connect |

The decision underpinning all three is
[`../adr/0003-design-source-of-truth.md`](../adr/0003-design-source-of-truth.md).

## Where design information lives

Three systems, three jobs. Nothing is duplicated between them, and each cites the others
rather than restating them.

| System | Holds | Authoritative for |
| --- | --- | --- |
| **Figma** | Brainstorming, scaffolding, UI and component design, composition, the raw palette | **Design intent.** What something *should* be. Where new visual decisions are made |
| **This repo** | `packages/cadence-tokens/tokens/**`, `packages/cadence-core`, and these docs | **The record.** What currently ships, and the semantic layer that theming and contrast depend on |
| **Notion** | Company → Brand (mission, positioning, voice), Inspiration (the reference library), Content (editorial strategy) | Brand strategy and taste — the *why* behind decisions this repo records the *what* of |

The practical rule: **Figma is the intent, the repo is the record.** Design is decided in
Figma and reaches the repo through a reviewed PR; once merged, the repo is what ships and
what agents read. A Figma file that has drifted from `main` is a design not yet built, not
a defect.

Tokens are the exception worth knowing: the **palette** is authored in Figma and
transcribed into code, while the **semantic layer** is authored in code and mirrored into
Figma as variables. [`figma-workflow.md`](./figma-workflow.md) explains why.

Brand rationale stays in Notion — cite it here rather than paraphrasing it.

## Writing docs here

Same rules as [`../README.md`](../README.md), plus one:

**No file in this directory restates a token value.** Cite the token name and the file it
lives in. A color, size, duration, or font stack written here is a second source of truth
that will drift silently — see the ADR. If you need to show a value to make a point, link
to the token file instead.

## Related

- [`../../DESIGN.md`](../../DESIGN.md) — the root router, for agents arriving cold
- [`../architecture/design-system.md`](../architecture/design-system.md) — the mechanism
- [`../workflows/sdlc.md`](../workflows/sdlc.md) — where design work fits in the development loop
- [`../proposals/`](../proposals/) — design work not yet decided
