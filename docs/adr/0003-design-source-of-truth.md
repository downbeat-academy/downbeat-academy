# 3. Design source of truth

**Status:** Accepted
**Date:** 2026-08-05

## Context

Cadence began in code. `packages/cadence-tokens` holds 182 hand-authored tokens built by
style-dictionary; `packages/cadence-core` holds 27 components whose variant axes are
TypeScript string-literal unions. None of it originated in a design tool — the last Figma
design system of record was retired in 2021.

That is now changing. Design work — brainstorming, scaffolding, UI, components, and the
raw color and type values themselves — will happen in Figma, and reach the repo through
the Figma MCP server. So the repo is no longer the origin of design decisions, and
pretending otherwise would produce documentation that describes a workflow nobody follows.

But "Figma is the source of truth" is also wrong, and in a way that causes real damage.
Figma will always contain unbuilt explorations. If every divergence between a Figma file
and `main` is treated as a code defect, an agent cannot tell a redesign-in-progress from a
bug, and will "fix" the former. Something has to be authoritative about **what currently
ships**, and it cannot be a design file.

There is a second question about tokens. The color system is two-layered: a raw palette of
six ramps, and a semantic layer (`foreground`, `surface`, `border`, `page`, `overlay`) that
references it. Those two layers are not the same kind of artifact. The palette is a design
decision. The semantic layer is a mapping that carries obligations code has to keep —
theming, and WCAG contrast compliance, which is currently failing in six pairings. Treating
both as one thing forces a single authorship direction on two different problems.

There is also a question about markdown. `DESIGN.md` has become a common convention for
handing a design system to an AI agent — a root file enumerating the palette, type scale,
and spacing scale. That convention exists for projects with no design system in code. This
repo has one, and a markdown file restating those values would drift from
`packages/cadence-tokens/tokens/**` the first time `pnpm tokens:build` runs, and would be
trusted anyway because it is easier to read.

## Decision

**Figma is the intent. The repo is the record.**

Design is decided in Figma — that is upstream, and it is where exploration, composition,
UI, components, and new visual values originate. Once a change merges, the repo is what
ships and what every agent reads. A Figma file that has drifted from `main` is a design
**not yet built**, not a defect in the code.

The merge is the ratification point. Nothing is part of the system because it exists in
Figma; it is part of the system when it is in `main`.

### Tokens flow in both directions, split by layer

This is the part that is easy to get wrong, so it is stated explicitly:

| Layer | Authored in | Reaches the other side by |
| --- | --- | --- |
| **Palette** — the six raw ramps, and any new primitive value | **Figma** | Export from Figma, transcribe into `tokens/color/palette.json`, review as a PR diff |
| **Semantic** — `foreground`, `surface`, `border`, `page`, `overlay` | **Code** | Built into the Figma variable set so designs bind to semantic variables |

The palette is a design decision and belongs to the designer. The semantic layer is a
mapping with engineering obligations attached — it is what theming will switch, and what
contrast compliance is measured on — so it is authored where those obligations can be
verified and tested.

Both layers are present as Figma variables. **Design against the semantic variables**, the
same rule that applies in code.

The transcription step is deliberately manual and reviewed. It is the point at which a new
value gets a name, a place in a family, and a contrast check. An automatic sync would skip
all three.

### Components are drawn in Figma

The 27 components already in `cadence-core` have no Figma counterpart and will not be
generated from code. They are drawn fresh as design work reaches them.

Until a component has been drawn, code is the only description of it, and that is fine.
[`../design/component-inventory.md`](../design/component-inventory.md) maps Figma
components to their code counterparts so the two can be matched as the library fills in.

### Notion holds brand strategy

Mission, positioning, voice, and the inspiration library stay in Notion, where they are
already maintained and reachable by non-engineers. The repo cites them rather than
restating them.

### No file in this repo restates a token value

`DESIGN.md` at the root is a router: it names where values live and how to decide between
them, and contains no colors, sizes, or font stacks.
[`../design/design-language.md`](../design/design-language.md) records design *intent* by
referencing token paths rather than reproducing them.

### Alternatives rejected

**Fully automatic token sync** (Tokens Studio plugin committing to a branch). Rejected for
now: it removes the review step that is doing the useful work, and puts a third-party
plugin in the release path of a solo-maintained repo. Revisit if manual transcription
becomes the bottleneck.

**Generating the Figma library from code.** Rejected: it produces a mechanical
approximation of components that need design attention anyway, and it would establish
code→design as the component direction, which is backwards.

**Code as the source of truth for everything.** Rejected: it does not describe how the work
actually happens, and documentation that describes a fictional workflow is worse than none.

## Consequences

Design work is not blocked on engineering. New values originate where they are being
decided, and the repo catches up through a reviewed PR.

**Figma and `main` will diverge, routinely and correctly.** That is what an unbuilt design
looks like. The cost is that "is this a bug or a plan?" is no longer answerable from the
Figma file alone — it is answerable from `main`, which is why the record has to live there.

The split token authorship is the subtlest part of this and the most likely to be
mis-followed. A new color added straight to the semantic layer, or a semantic role invented
in Figma, will look reasonable and quietly break the layering. The
`figma-to-component` skill and the `cadence-design-system` agent both carry the rule.

Manual transcription will occasionally lag. That is preferable to a value reaching `main`
without a name, a family, and a contrast check — particularly given six status pairings
currently fail AA (see [`0002-known-gaps.md`](./0002-known-gaps.md)).

Agents lose the cold-start convenience of a single markdown file containing the whole
palette. They gain the guarantee that whatever they read is current, because the only place
values live is the place the build reads.

## Related

- [`../design/figma-workflow.md`](../design/figma-workflow.md) — how the pipeline runs in practice
- [`../design/design-language.md`](../design/design-language.md) — what the values mean
- [`../design/component-inventory.md`](../design/component-inventory.md) — Figma ↔ code component map
- [`../architecture/design-system.md`](../architecture/design-system.md) — the build mechanism
