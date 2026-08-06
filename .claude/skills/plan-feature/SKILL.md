---
name: plan-feature
description: Turn a Notion task, an issue, or a plain description into an implementation plan and a correctly-named branch in the Downbeat Academy monorepo. Use at the start of any non-trivial piece of work, before writing code.
---

# Plan a feature

Gets from "here is a thing to build" to "here is a plan and a branch", with the right
context loaded and the Notion task moved to In Progress.

## 1. Establish what is being asked

**If given a Notion URL or task name** — use the `sync-notion` skill to fetch it. Read
the `# Overview` body, the `Type`, `Priority`, `LOE`, `Category`, and any parent `Epics`
relation. Fetch the parent epic too if there is one; it usually carries the "why".

**If given a description** — restate the goal in one sentence and confirm it before
planning. Ambiguity here costs far more later.

Either way, end this step knowing: what changes for a user, and how you will know it
works.

## 2. Work out which workspaces are involved

This determines everything downstream. Use the routing table in the root
[`AGENTS.md`](../../../AGENTS.md), then **read the `AGENTS.md` of every workspace you
will touch** — they carry the gotchas.

Quick routing:

| Change | Workspace |
| --- | --- |
| UI component, anything reusable | `packages/cadence-core` |
| Color, spacing, radius, type value | `packages/cadence-tokens` |
| Icon | `packages/cadence-icons` |
| Content type / CMS schema | `apps/cms-sanity` → then `apps/www` |
| Page, route, rendering | `apps/www` |
| Sign-in, OAuth, sessions | `apps/auth` |
| Roles, permissions, guards | `packages/auth-permissions` (affects all three apps) |
| Short links | `apps/cadence-links` |
| Transactional email | `packages/email` (consumed by `auth` only) |

Watch for changes that cross a boundary — those are where the real work is:

- A new content type is a **five-step chain** across `cms-sanity` and `www`. See
  `new-sanity-type`.
- A design-token change requires rebuilding `cadence-core`, not just tokens.
- An `auth-permissions` change lands in all three Next apps at once.

## 3. Check the known-gaps register

Read [`docs/adr/0002-known-gaps.md`](../../../docs/adr/0002-known-gaps.md) before
planning around anything that looks broken. Several things are deliberately unfinished —
push-based Drizzle, the duplicated auth schema, the unused draft-mode path, the dead
email sign-in actions, the quarantined `radio-card` tests. Do not plan a fix for one of
these as a side effect of unrelated work; if the task genuinely requires it, say so
explicitly and scope it.

## 4. Look for what already exists

Before proposing new code, search for it. This repo has a lot of surface area and
duplicating it is the most common failure:

- Is there already a `cadence-core` component? Check `src/index.ts`, not just filenames.
- Is there already a GROQ query for this type in `apps/www/src/lib/queries/`?
- Is there a guard, util, or hook that covers this?

## 5. Write the plan

State, briefly:

- **Goal** — one sentence.
- **Files to change** — actual paths, grouped by workspace, in dependency order
  (packages before apps).
- **Approach** — the shape of the change, and anything reused.
- **Verification** — the specific commands, plus what to check by hand. `pnpm verify` is
  the floor, not the whole answer; UI work needs Storybook or the running app.
- **Out of scope** — what you are deliberately not doing.

Keep it scannable. If the work is genuinely small, one paragraph is a complete plan.

## 6. Branch and mark it started

```bash
git checkout main && git pull
git checkout -b <prefix>/<kebab-case-description>
```

Prefixes: `feat/`, `fix/`, `chore/`, `docs/`. If this stacks on unmerged work, branch off
that branch instead and use the `stack` skill.

Then, if there is a Notion task, use `sync-notion` to set `Status` → `In Progress` and
`Branch` → the branch name. Confirm before writing.

## Rules

- Never start on `main`.
- Read the workspace `AGENTS.md` before planning changes in it — not after.
- Prefer an existing `cadence-core` component over anything new.
- If the plan requires a decision only the user can make, ask before building, not after.

## Related

- `sync-notion` · `new-component` · `new-sanity-type` · `ship` · `stack`
