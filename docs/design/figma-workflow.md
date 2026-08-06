# The design ↔ code workflow

How Figma and this repo stay in sync, in which direction, and what is gated behind which
Figma plan.

The governing decision is
[`../adr/0003-design-source-of-truth.md`](../adr/0003-design-source-of-truth.md):
**Figma is the intent, the repo is the record.** Everything below follows from that.

---

## The shape of it

```
FIGMA                                    REPO
─────                                    ────
brainstorming, scaffolding
UI and component design
palette + primitive values
        │
        │  Figma MCP  ─────────────▶  /figma-to-component
        │                                  │
        │                                  ▼
        │                            mapped to tokens
        │                            + existing components
        │                                  │
        │                                  ▼
        │                            reviewed PR  ──▶  main
        │                                                │
        └──── semantic variables ◀───────────────────────┘
                                   tokens/color/{foreground,
                                   surface,border,page,overlay}
```

Design flows **down**. The semantic color layer flows **back up**. The merge into `main`
is the ratification point — nothing is part of the system because it exists in Figma, it
is part of the system when it is in `main`.

A Figma file that has drifted from `main` is a design **not yet built**. It is not a bug.

---

## What Figma is for

**Everything upstream of the build.** Brainstorming, scaffolding out design elements,
composition, page layout, flows, UI and component design, exploring things that do not
exist yet, and deciding new visual values. This is where design happens, and it is not
constrained by what the repo currently contains.

**What Figma does not settle** is what currently ships. That is `main`, by definition — see
the ADR for why that distinction matters more than it sounds like it should.

---

## Tokens: which way each layer travels

The color system is two-layered, and **the two layers are authored in different places.**
This is the easiest thing here to get wrong.

| Layer | Authored in | How it reaches the other side |
| --- | --- | --- |
| **Palette** — the six raw ramps, and any new primitive value | **Figma** | Export from Figma → transcribe into `tokens/color/palette.json` → review as a PR diff |
| **Semantic** — `foreground`, `surface`, `border`, `page`, `overlay` | **Code** | Built into the Figma variable set, so designs bind to semantic variables |

Why the split: the palette is a design decision and belongs to the designer. The semantic
layer is a *mapping* that carries engineering obligations — it is what theming switches,
and what WCAG contrast is measured on. It is authored where those can be verified.

**Design against the semantic variables**, not the palette ones — the same rule that
applies in code. Binding a Figma layer to `blackberry/800` rather than
`foreground/strong` produces a design that cannot be themed, and a component that will be
built wrong.

### Adding a new value

1. Add it to the palette in Figma, in the ramp and at the step where it belongs.
2. Export and transcribe into `tokens/color/palette.json`.
3. **Give it a semantic role in code** — a palette value with no semantic token above it is unusable by components. Name the role for its meaning, not its appearance.
4. Check contrast for the pairings it introduces. Six status pairings already fail AA; do not add a seventh. See [`../adr/0002-known-gaps.md`](../adr/0002-known-gaps.md).
5. `pnpm tokens:build && pnpm build:packages`.

The transcription step is manual on purpose. It is where a value gets a name, a family, and
a contrast check — an automatic sync skips all three. If it becomes the bottleneck, the ADR
records what to reconsider.

Non-color tokens — spacing, radii, elevation, motion, type scale — follow the same
principle: decided in Figma, transcribed and reviewed in code.

---

## Components

**Drawn in Figma.** The 27 components in `cadence-core` have no Figma counterpart yet and
will not be generated from code — a generated library is a mechanical approximation of
components that need design attention anyway. They get drawn as design work reaches them.

Until a component has been drawn, code is the only description of it. That is expected, not
a gap to close in a hurry.

[`component-inventory.md`](./component-inventory.md) maps each Figma component to its code
counterpart and records the variant axes, so the two can be matched as the library fills
in — and so Code Connect is mechanical when the plan supports it.

### When a Figma component and the code component disagree

Figma is the intent; code is the record. Concretely:

- **Building the redesign** → Figma is right. That is the point of it.
- **Answering "what does this do today?"** → code is right. Read `main`, not the file.
- **An agent finding a difference** → it is a design not yet built. Do not "fix" the code to match a Figma file unless that is the work.

---

## Design → code

Use the `/figma-to-component` skill. Do not read a Figma node and write CSS from it
directly.

The failure mode is specific and common: the MCP server returns concrete values — a hex, a
pixel padding, a shadow string — and the path of least resistance is to paste them into a
CSS Module. That produces code that looks right, passes review, and is invisible drift.
Every hardcoded value is a component that will not follow a token change.

The skill enforces the order: read the node → map every value to a semantic token → map the
structure to existing components → **flag everything with no token as a decision** → only
then build.

**A bound Figma variable is the good case.** It names the intent, so it maps to a token
directly. Binding variables while designing is what makes this step cheap.

---

## Plan tiers — what is available

Verified August 2026. The current team is **Folklore Studio**, Figma **Pro**, with a Full
seat.

| Capability | Requires | Status |
| --- | --- | --- |
| Figma MCP server — reading designs into code | Dev or Full seat, Professional or above | **Available** |
| Importing variables from a generated JSON file by plugin | Any paid plan | **Available** |
| **Code Connect** — binding a Figma component to a code component | **Organization or Enterprise** | Not yet |
| **Variables REST API** — programmatic token round-trip | **Enterprise only** | Out of scope |

The Variables REST API being Enterprise-only is why palette transcription is manual rather
than automated. The alternative that works on Pro — the Tokens Studio plugin committing to
a branch — was considered and rejected in the ADR, for reasons unrelated to plan tier.

Until Organization, the component ↔ code binding Code Connect would provide is maintained
by hand in [`component-inventory.md`](./component-inventory.md), which is written in the
shape Code Connect needs.

### Before buying Organization

Organization is billed per editor annually and what it adds here is Code Connect,
branching, and org-wide libraries. Decide separately whether Downbeat Academy gets its own
Figma organization or lives as a team inside Folklore Studio — that choice determines the
file keys recorded below, and changing it later means re-recording every one.

### Figma file record

Filled in as the library is created.

| | |
| --- | --- |
| Team | Folklore Studio (Pro) |
| Cadence library file key | _not yet created_ |
| Library key | _not yet created_ |
| Per-component node IDs | [`component-inventory.md`](./component-inventory.md) |

---

## Agent permissions

Read-only Figma MCP calls are allowed without prompting. Anything that **writes** to Figma
— creating files, generating designs, uploading assets, publishing Code Connect mappings —
prompts first, the same way Notion writes do. See
[`../../.claude/settings.json`](../../.claude/settings.json).

Agents read Figma. They do not design in it.

## Related

- [`design-language.md`](./design-language.md) — how to choose the right token when mapping
- [`component-inventory.md`](./component-inventory.md) — the Figma ↔ code component map
- [`../adr/0003-design-source-of-truth.md`](../adr/0003-design-source-of-truth.md) — why this direction
- [`../architecture/design-system.md`](../architecture/design-system.md) — the build pipeline this feeds
