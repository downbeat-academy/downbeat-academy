# The design ↔ code workflow

How Figma and this repo stay in sync, in which direction, and what is gated behind which
Figma plan.

The governing decision is
[`../adr/0003-design-source-of-truth.md`](../adr/0003-design-source-of-truth.md): **code is
the source of truth.** Everything below follows from that.

---

## Direction of truth

```
packages/cadence-tokens/tokens/**          ← authoritative
        │
        ├─ style-dictionary ─▶ dist/web/tokens.css   ─▶ cadence-core ─▶ apps
        │
        └─ style-dictionary ─▶ dist/figma/tokens.json ─▶ Figma Variables
                                                              │
packages/cadence-core/src/components/  ────────────────▶ Figma component library
```

Both Figma artefacts are **generated**. Neither is edited in place and neither is read back
into the repo. When Figma and the repo disagree, the repo is right and Figma is
regenerated.

This is the opposite of the common design-system setup, where variables are authored in
Figma and synced out. That is the correct choice for a system that began in a design tool.
Cadence began in code, and the ADR records why inverting it was rejected.

---

## What Figma is for

**Yes:** composition, page layout, flows, exploration of things that do not exist yet,
review artefacts, anything that benefits from being seen before it is built.

**No:** defining a color, a spacing step, a type size, a shadow, or a component variant
that the token files and `types.ts` do not already contain. A value that appears only in
Figma is a *proposal*, not a definition — it belongs in [`../proposals/`](../proposals/)
until it is a token.

---

## Plan tiers — what is available

Verified August 2026. The current team is **Folklore Studio**, Figma **Pro**, with a Full
seat.

| Capability | Requires | Status |
| --- | --- | --- |
| Figma MCP server — reading designs into code | Dev or Full seat on Professional or above | **Available** |
| Importing variables from a generated JSON file by plugin | Any paid plan | **Available** |
| Generating a component library from code | Any paid plan | **Available** |
| **Code Connect** — binding a Figma component to a code component | **Organization or Enterprise** | Not yet |
| **Variables REST API** — programmatic token round-trip | **Enterprise only** | Out of scope |

Two consequences:

- The Variables REST API being Enterprise-only is a large part of why this pipeline runs code→design. A design→code token sync would depend on a tier that is not in prospect.
- Until Organization, the component ↔ code binding that Code Connect would provide is maintained by hand in [`component-inventory.md`](./component-inventory.md). That file is written in the shape Code Connect needs, so the migration is mechanical when the plan changes.

### Before buying Organization

Organization is billed per editor annually and the thing it adds here is Code Connect,
branching, and org-wide libraries. For a single maintainer, a generated library plus the
checked-in inventory recovers most of the practical value. Decide separately whether
Downbeat Academy gets its own Figma organization or lives as a team inside Folklore
Studio — that choice determines the file keys recorded below, and changing it later means
re-recording every one.

### Figma file record

Filled in when the library is created. Until then, there is no Cadence Figma file — the
last design system of record was retired in 2021.

| | |
| --- | --- |
| Team | Folklore Studio (Pro) |
| Cadence library file key | _not yet created_ |
| Library key | _not yet created_ |
| Per-component node IDs | [`component-inventory.md`](./component-inventory.md) |

---

## Design → code

Use the `/figma-to-component` skill. Do not read a Figma node and write CSS from it
directly.

The failure mode this guards against is specific and common: the Figma MCP server returns
concrete values — a hex, a pixel padding, a shadow string — and the path of least
resistance is to paste them into a CSS Module. That produces code that looks right,
passes review, and is invisible drift. Every hardcoded value is a component that will not
follow a token change.

The skill enforces the order:

1. Read the node's design context and variables via MCP.
2. Map every value to an existing `--cds-*` token. Not "find a close token" — find the token whose *meaning* matches, using [`design-language.md`](./design-language.md).
3. Map the structure to existing `cadence-core` components. Most designs are compositions of components that already exist.
4. **Flag every value with no matching token** as a decision, not a number. These are the interesting output of the whole process.
5. Only then, if something genuinely new is needed, hand off to `/new-component`.

A design that cannot be built from tokens is telling you something. Usually it is that the
design drifted; occasionally it is that the system has a real gap. Either way it is a
conversation, not a hardcoded value.

## Code → design

Generating the Figma library from `packages/cadence-core`:

1. `pnpm tokens:build` produces the Figma-shaped token JSON; import it as Figma Variables.
2. Generate component sets from `cadence-core`. The variant axes are the string-literal union types in each component's `types.ts` — see [`component-inventory.md`](./component-inventory.md) for the full mapping.
3. Record file key, library key, and node IDs back into this file and the inventory.

Regenerate rather than patch. The library is an output; editing it in place creates
exactly the drift the ADR is meant to prevent.

Scope: generate the primitives that carry real variant surface before the compound
components. Skip `cadence-core-web-components` entirely — nothing consumes it.

---

## What changes at Organization

[`component-inventory.md`](./component-inventory.md) becomes `.figma.tsx` files colocated
with each component, plus a `figma.config.json` and a `pnpm figma:connect` script. No new
information is needed at that point; that is why the inventory is written as a mapping
rather than a list.

Keep it out of CI. The boundary in [`../workflows/sdlc.md`](../workflows/sdlc.md) is that
CI stays deterministic and nothing in it writes code.

---

## Agent permissions

Read-only Figma MCP calls are allowed without prompting. Anything that **writes** to Figma
— creating files, generating designs, uploading assets, publishing Code Connect mappings —
prompts first, the same way Notion writes do. See
[`../../.claude/settings.json`](../../.claude/settings.json).

## Related

- [`design-language.md`](./design-language.md) — how to choose the right token when mapping
- [`component-inventory.md`](./component-inventory.md) — the component ↔ variant map
- [`../adr/0003-design-source-of-truth.md`](../adr/0003-design-source-of-truth.md) — why this direction
- [`../architecture/design-system.md`](../architecture/design-system.md) — the build pipeline this feeds
