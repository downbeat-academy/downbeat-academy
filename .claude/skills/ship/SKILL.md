---
name: ship
description: The verification gate before a change leaves your machine — run lint/typecheck/test, add the right changeset, commit, push, open the PR against the correct base, and update the Notion task. Use when work is complete and ready for review.
---

# Ship

Everything between "I think it works" and "it is in review". Do not skip the verification
step because the change looks small — the most expensive failures in this repo have all
been small changes to shared packages.

## 1. Verify

```bash
pnpm verify        # turbo run lint typecheck test — all 21 tasks, ~10s warm
```

It must exit 0. If it hangs, a `test` script has regressed to bare `vitest` (watch mode)
— fix that rather than working around it.

`verify` does **not** cover everything. Also run, when relevant:

| If you changed | Also do |
| --- | --- |
| A `cadence-core` component | `pnpm core:storybook` — render it, tab through it |
| Anything visual in an app | `pnpm www:dev` (or `auth:dev` / `links:dev`) and look at it |
| A Sanity schema | `pnpm cms:dev`, create a real document, confirm `www` renders it |
| Auth, sessions, OAuth | Walk the full sign-in **and** sign-out chain across apps |
| A design token | `pnpm tokens:build && pnpm build:packages` first — tokens alone is not enough |
| DB schema | Review the `drizzle-kit push` diff carefully; it can drop columns |

Never report success on something you did not actually run. If a step was skipped, say
which and why.

## 2. Add a changeset

**Every change to a versioned package needs one.** `.changeset/<kebab-description>.md`:

```md
---
'www': patch
'cadence-core': minor
---

What changed and why. Lead with the problem, not the diff.
```

Bumps: `patch` for fixes and internal changes, `minor` for new features or components,
`major` for breaking changes.

Get the package list right — it is the changelog. `git diff --name-only main...HEAD`
tells you which workspaces were touched. Docs-only changes to `docs/` or `AGENTS.md`
files do not need one.

## 3. Commit

```bash
git add -A
git commit
```

Message: a short imperative subject line, then a body explaining **why**. State the
problem the change solves before describing the change. Note anything deliberately left
undone.

Do not commit `.env*`, secrets, or `.mcp.json`.

## 4. Push and open the PR

```bash
git push -u origin <branch>
gh pr create --base <base> --title "…" --body "…"
```

`<base>` is `main` for a standalone branch, or the **parent branch** if this is part of a
stack — see the `stack` skill. Getting this wrong makes the diff show every commit from
the parent branch.

The PR body should cover: the Notion task link, what changed and why, affected
workspaces, what you actually verified, and screenshots for anything visual.

> `gh` must be installed and authenticated (`brew install gh && gh auth login`). If it is
> not, stop and tell the user rather than guessing at an alternative.

## 5. Update Notion

Use the `sync-notion` skill: set `PR` to the pull request URL, and confirm `Branch` and
`Status` (`In Progress`) are correct. Confirm with the user before writing.

Set `Status` → `Completed` only once the PR is actually merged, not when it is opened.

## Checklist

- [ ] `pnpm verify` exits 0
- [ ] Manual verification appropriate to what changed
- [ ] Changeset added with the correct packages and bump types
- [ ] Commit message explains why
- [ ] Pushed, PR opened against the right base
- [ ] Notion task updated

## Related

- `stack` — for PRs that build on unmerged work
- `sync-notion` — the Notion schema
- [`AGENTS.md`](../../../AGENTS.md) — the verification gate in full
