# The development loop

How a piece of work travels from an idea in Notion to production, and where the tooling in
this repo plugs in. This is what makes the `AGENTS.md` files, the `docs/` tree, the
skills, and the agents legible as one system rather than six unrelated additions.

```
Notion task
    │
    ├─ /plan-feature ────── read the task, load the workspace AGENTS.md,
    │                       check the gaps register, plan, branch,
    │                       set Status → In Progress
    │
    ├─ build ────────────── with the domain agent for the area
    │                       (cadence-design-system, sanity-content, auth-security, …)
    │                       and /new-component or /new-sanity-type where they apply
    │
    ├─ /ship ────────────── pnpm verify, manual checks, changeset,
    │                       commit, push, PR against the right base,
    │                       write PR link back to Notion
    │
    ├─ review ───────────── code-reviewer agent, then CI
    │
    ├─ merge ────────────── changesets opens "Version Packages";
    │                       Railway deploys from main
    │
    └─ Status → Completed
```

## 1. Plan

Start from a Notion task where one exists — the roadmap is the backlog, and the parent
epic usually carries the "why" that the task itself omits.

`/plan-feature` does the mechanical part: fetches the task, works out which workspaces are
involved, **reads their `AGENTS.md`**, checks
[`docs/adr/0002-known-gaps.md`](../adr/0002-known-gaps.md), searches for what already
exists, and creates a correctly-named branch.

The step that pays for itself is reading the workspace contract *before* planning. Most
wasted work in this repo has come from not knowing a local rule — that a component needs a
barrel export, that a Sanity object needs registering in two places, that a token change
needs two builds.

**Check the gaps register.** Several things look broken and are, deliberately. Planning a
fix for one as a side effect of unrelated work makes both harder to review.

**If the work has a visual surface, decide what it looks like before branching.** The rest
of this loop assumes that question is settled; nothing downstream will ask it. Work down
the ladder in [`../../DESIGN.md`](../../DESIGN.md) — existing component, then existing
token, then [`../design/design-language.md`](../design/design-language.md). If all three
come up empty, you are making a design decision, and it needs an artifact:

- Small work — a paragraph in the Notion task body naming the components and tokens involved.
- Anything needing a new token, a new component, or a new pattern — a note in
  [`../proposals/`](../proposals/), in the shape of
  [`../proposals/tokenization-proposal.md`](../proposals/tokenization-proposal.md).

Coming from a Figma design instead, use `/figma-to-component` rather than reading values
off the node — see [`../design/figma-workflow.md`](../design/figma-workflow.md).

## 2. Build

Work in dependency order: packages before apps, schema before query before route.

Reach for the agent that owns the area — `cadence-design-system`, `sanity-content`,
`auth-security`, `javascript-engineer`, `accessibility-engineer`, `test-engineer`.
They carry the failure modes so you do not have to hold them in your head.

Three skills cover the mechanical chains:

- `/new-component` — the `cadence-core` scaffold, and the two rules that reliably bite
- `/new-sanity-type` — the five-step chain across `cms-sanity` and `www`
- `/figma-to-component` — mapping a Figma node onto existing components and tokens before
  any code is written

## 3. Verify

```bash
pnpm verify        # lint + typecheck + test, every workspace, ~10s warm
```

This is the floor. What it does **not** cover is in
[`../../AGENTS.md`](../../AGENTS.md): formatting is not gated, `cadence-core` has no
linting, E2E is separate, and nothing automated looks at the screen.

So also: render it in Storybook, run the app, create a real Sanity document, walk the full
sign-in *and* sign-out chain. Report what you actually ran — if a step was skipped, say
which.

## 4. Ship

`/ship` runs the gate, adds the changeset with the right package list, commits, pushes,
opens the PR against the correct base, and writes the PR link back to Notion.

For stacked work, `/stack` handles branching off unmerged work, restacking after a parent
changes, and merging bottom-up.

## 5. Review

The `code-reviewer` agent is read-only by design and checks the conventions this repo
actually has — barrel exports, token usage, the type-family split, missing changesets,
unregistered Portable Text types.

CI (`ci-monorepo.yml`) runs lint, typecheck, and tests across every workspace.
`ci-www-e2e.yml` runs Cypress, path-filtered.

## 6. Merge and release

Merging to `main` triggers `release.yml`, which opens a "Version Packages" PR. Merging
*that* bumps versions and writes changelogs. Nothing is published to a registry —
versioning exists for changelogs and coordination.

Railway deploys from `main`. Note that **no deploy configuration lives in git** — build
and start commands are set in the Railway dashboard.

Then set the Notion task to `Completed`.

## Where the automation is deliberately absent

The loop is human-in-the-loop on purpose. Claude runs locally, with a person reviewing;
**CI stays deterministic** — lint, typecheck, test, deploy, and nothing that writes code.

That boundary is the point. The value is in agents having accurate context and a
trustworthy verification gate, not in removing the reviewer. An agent that can merge its
own work is only as good as the tests, and the tests here are honest about what they do
not cover.

## Related

- [`../../AGENTS.md`](../../AGENTS.md) — the repo-wide contract
- [`../../CONTRIBUTING.md`](../../CONTRIBUTING.md) — the same loop for humans
- [`../../.claude/README.md`](../../.claude/README.md) — the skills and agents
- [`../adr/0002-known-gaps.md`](../adr/0002-known-gaps.md) — what is deliberately unfinished
