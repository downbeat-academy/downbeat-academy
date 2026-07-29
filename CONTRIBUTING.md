# Contributing

How work moves through this repository. If you are an AI agent, read
[`AGENTS.md`](./AGENTS.md) as well — it is the operational contract.

## Setup

```bash
pnpm install            # pnpm 9, pinned via packageManager
pnpm build:packages     # required — apps cannot resolve Cadence until it is built
pnpm dev
```

Secrets come from Infisical; the dev scripts wrap Next in `infisical run`. Without
Infisical access, use each app's `dev:ci` script and a manual `.env.local` (see the app's
`docs/setup/`). Never commit `.env*`.

## Branches

Off `main`, prefixed by intent:

| Prefix | For |
| --- | --- |
| `feat/` | New functionality |
| `fix/` | Bug fixes |
| `chore/` | Maintenance, dependencies, tooling |
| `docs/` | Documentation |

Kebab-case after the prefix: `feat/course-enrollment`, `fix/oauth-callback-state`.

**Never commit directly to `main`.**

## The verification gate

Before opening a PR:

```bash
pnpm verify        # turbo run lint typecheck test — every workspace, ~10s warm
```

It must exit 0. If it hangs, a `test` script has regressed to bare `vitest` (watch mode)
— fix that rather than working around it.

`verify` is the floor, not the whole answer. It does not cover formatting (not yet gated),
`cadence-core` linting (no setup), E2E, or anything visual. Depending on what you changed,
also:

| Changed | Also do |
| --- | --- |
| A `cadence-core` component | `pnpm core:storybook` — render it, tab through it |
| Anything visual | Run the app and look at it |
| A Sanity schema | `pnpm cms:dev`, create a real document, confirm `www` renders it |
| Auth or sessions | Walk sign-in **and** sign-out across apps |
| A design token | `pnpm tokens:build && pnpm build:packages` — tokens alone is not enough |
| A DB schema | Review the `drizzle-kit push` diff; it can drop columns |

## Changesets

**Every change to a versioned package needs one.** Create `.changeset/<description>.md`:

```md
---
'cadence-core': minor
'www': patch
---

What changed and why. Lead with the problem.
```

`patch` for fixes, `minor` for features, `major` for breaking changes. Docs-only changes
to `docs/` or `AGENTS.md` files do not need one.

Merging to `main` opens a "Version Packages" PR that bumps versions and writes changelogs.
Nothing is published to a registry — versioning exists for changelogs and coordination.

## Commits

Short imperative subject, then a body explaining **why**. Lead with the problem the change
solves. Note anything deliberately left undone.

## Pull requests

Fill in the template honestly — particularly the verification section. "Tested locally"
tells a reviewer nothing.

### Stacked PRs

When a change depends on unmerged work, stack it. GitHub's native stacked pull requests
(public preview) are the default — install the extension once with
`gh extension install github/gh-stack`:

```bash
gh stack init --base main          # start a stack
gh stack add -m "feat: the thing"  # branch + commit on top
gh stack submit                    # open/update the PRs and link them
gh stack merge --squash            # land the whole stack atomically
```

Plain git still works, and a correctly-chained set of PRs gets adopted as a stack
automatically — branch off the parent and target it:

```bash
git checkout feat/foundation
git checkout -b feat/api
gh pr create --base feat/foundation
```

Getting `--base` wrong makes the PR show every commit from the parent. Without a native
stack, merge bottom-up, verifying each PR's base retargets after the one below merges.

Branch protections apply against `main` for **every** PR in a stack, not against the
branch below it — stacking never lowers the bar for what reaches `main`. See the `stack`
skill in [`.claude/skills/`](./.claude/skills/).

## Before you "fix" something

Read [`docs/adr/0002-known-gaps.md`](./docs/adr/0002-known-gaps.md). Several things in
this repo look broken and are — deliberately, with recorded reasons. Fixing one as a side
effect of unrelated work makes both changes harder to review.

If you close a gap, delete its entry in the same PR.

## Conventions

The full set is in [`AGENTS.md`](./AGENTS.md). The ones most often missed:

- A new `cadence-core` component must be exported from `src/index.ts` — the component
  **and** its `*Props` type. Otherwise it does not exist to consumers.
- Every style value is a `--cds-*` token. Semantic colour tokens, never palette tokens.
- **Productive** type for app chrome, **expressive** for editorial and brand. Never mixed
  within one surface.
- Prefer a `cadence-core` component over hand-rolled markup.
- A Sanity object used in `richText` must be registered in
  `apps/www/src/components/rich-text/components.tsx`, or it renders as nothing.

## Documentation

Each workspace has an `AGENTS.md`; architecture lives in [`docs/`](./docs/README.md).
When a change makes documentation wrong, fix it in the same PR.
