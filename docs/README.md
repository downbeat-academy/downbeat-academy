# Documentation

Cross-cutting documentation for the Downbeat Academy monorepo. Anything specific to a
single workspace lives in that workspace's own `AGENTS.md` or `README.md` instead.

Start with [`AGENTS.md`](../AGENTS.md) at the repo root — it is the operational contract.
These documents explain *why* things are the way they are.

## Architecture

| Document | Covers |
| --- | --- |
| [`architecture/monorepo.md`](./architecture/monorepo.md) | Workspace layout, dependency graph, the Turbo pipeline, build order |
| [`architecture/auth.md`](./architecture/auth.md) | OAuth 2.1 provider/consumer topology, the role and permission model, route guards |
| [`architecture/content.md`](./architecture/content.md) | The Sanity → GROQ → route → Portable Text chain, and the full content-type map |
| [`architecture/design-system.md`](./architecture/design-system.md) | Tokens → components → apps, the build pipeline, styling conventions |
| [`architecture/infrastructure.md`](./architecture/infrastructure.md) | Railway, Cloudflare, Infisical, and the observability stack |

## Design

[`design/`](./design/) covers design *intent* — which token to use and why — where
`architecture/design-system.md` covers the mechanism.

| Document | Covers |
| --- | --- |
| [`design/design-language.md`](./design/design-language.md) | The palette ramps and semantic families, contrast targets, space, layout, elevation, motion, typography, iconography |
| [`design/figma-workflow.md`](./design/figma-workflow.md) | The design ↔ code pipeline, direction of truth, and Figma plan-tier constraints |
| [`design/component-inventory.md`](./design/component-inventory.md) | Component ↔ Figma variant mapping; the interim stand-in for Code Connect |

## Decisions

[`adr/`](./adr/) holds architecture decision records.

| Record | Subject |
| --- | --- |
| [`adr/0001-record-architecture-decisions.md`](./adr/0001-record-architecture-decisions.md) | Why this repo keeps ADRs, and the format |
| [`adr/0002-known-gaps.md`](./adr/0002-known-gaps.md) | **The known-gaps register.** Read before "fixing" anything that looks broken |
| [`adr/0004-design-source-of-truth.md`](./adr/0004-design-source-of-truth.md) | Figma is the intent, the repo is the record; which token layer is authored where |

## Workflows

| Document | Covers |
| --- | --- |
| [`workflows/sdlc.md`](./workflows/sdlc.md) | The development loop end to end — Notion task → plan → build → verify → ship → review → merge |

## Proposals

[`proposals/`](./proposals/) holds design work that has not been decided on yet.

- [`proposals/tokenization-proposal.md`](./proposals/tokenization-proposal.md) — phased
  plan for shadow, border-width, easing, overlay, icon-size, breakpoint and z-index
  tokens, plus theming architecture.

## Writing docs here

- One topic per file, kebab-case names.
- **US English** — `color`, not `colour`; `behavior`, `license`, `optimize`. The code is
  US English (`--cds-color-*`, `currentColor`), so prose that diverges cannot be grepped
  alongside it. See [`../AGENTS.md`](../AGENTS.md#spelling-us-english).
- Explain *why*, not just *what* — the code already says what.
- State facts that can be checked against the code, and give the path when you do.
- If something is broken or deliberately unfinished, record it in the known-gaps
  register rather than leaving a reader to rediscover it.
