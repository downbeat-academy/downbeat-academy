# 3. Design source of truth

**Status:** Accepted
**Date:** 2026-08-05

## Context

Cadence is a code-first design system. `packages/cadence-tokens` holds 182 hand-authored
tokens built by style-dictionary; `packages/cadence-core` holds 27 components whose
variant axes are TypeScript string-literal unions. Both are versioned, built, and consumed
by three Next apps. None of it originated in a design tool — the last Figma design system
of record was retired in 2021.

Design tooling is now being added: a Figma account, the Figma MCP server, and eventually
Code Connect. That introduces a second place where a colour, a spacing step, or a
component variant can be *defined*, and therefore a second place it can be *wrong*.

The industry default for a design system that starts in Figma is design-first: variables
are authored in Figma and synced out to code, usually through the Tokens Studio plugin and
a git branch. Adopting that here would invert a pipeline that already works, and put a
third-party plugin in the release path of a solo-maintained repo.

There is a related question about markdown. `DESIGN.md` has become a common convention for
handing a design system to an AI agent — a root file enumerating the palette, type scale,
and spacing scale. That convention exists for projects that have no design system in code.
This repo has one. A markdown file restating those values would drift from
`packages/cadence-tokens/tokens/**` the first time `pnpm tokens:build` runs, and would be
trusted anyway because it is easier to read.

## Decision

**`packages/cadence-tokens/tokens/**` is the single source of truth for every design
value.** Figma is a generated consumer of those tokens, never an authority over them. A
value that exists in Figma but not in the token files does not exist.

**Figma holds composition and exploration; the repo holds the system.** Layouts, flows,
and unbuilt ideas belong in Figma. Tokens, components, and the rules governing them belong
in the repo. When a Figma file and the repo disagree about a value, the repo is right by
definition and the Figma file is stale.

**Notion holds brand strategy, voice, and inspiration; the repo holds the system.** The
*why* behind the brand — mission, positioning, tone, the reference library — stays in
Notion, which is where it is already maintained and where non-engineers can reach it. The
repo does not duplicate it, and cites it where design decisions depend on it.

**No file in this repo restates a token value.** `DESIGN.md` at the root is a router: it
names where values live and how to decide between them, and contains no colours, sizes, or
font stacks. `docs/design/design-language.md` records design *intent* — what each palette
ramp means, why the semantic families are drawn where they are — by referencing token
paths rather than reproducing them.

### Alternative rejected

Figma-first authoring via Tokens Studio git sync. Rejected on three grounds: it inverts a
working one-directional pipeline; it makes a Figma plugin a release dependency for a
single maintainer; and the token round-trip it enables (the Figma Variables REST API)
requires an Enterprise plan that is not in prospect. The code→design direction reaches the
same destination with none of that.

## Consequences

Token changes stay a one-step operation with a reviewable diff, and `pnpm tokens:build`
stays deterministic. Nothing about the existing build order changes.

Figma will drift, and that is accepted. Because the repo is authoritative, drift is a
regeneration problem rather than a merge conflict — the Figma library is rebuilt from
tokens, not reconciled with them. The cost is that a designer working in Figma can produce
something the system cannot express, and will not find out until implementation. The
`figma-to-component` skill exists to surface that at the earliest possible moment, by
flagging every value with no matching token instead of hardcoding it.

Writing intent without values is harder than writing a values table, and it is easier to
let it go stale because nothing breaks when it does. The mitigation is that
`docs/design/design-language.md` cites token paths throughout, so a reader who doubts it
can check in one hop.

Agents lose the cold-start convenience of a single file containing the whole palette. They
gain the guarantee that whatever they read is current, because the only place values live
is the place the build reads.

## Related

- [`../design/README.md`](../design/README.md) — the design documentation this decision governs
- [`../design/figma-workflow.md`](../design/figma-workflow.md) — how the pipeline runs in practice
- [`../architecture/design-system.md`](../architecture/design-system.md) — the mechanism this decision constrains
