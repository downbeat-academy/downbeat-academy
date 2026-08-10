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
`Status` (`In Progress`) are correct.

Set `Status` → `Completed` only once the PR is actually merged, not when it is opened.

## 6. Retrospective — close the loop on friction

**Do this before you call the work shipped, every time.** Ask: what in this session cost
time that should not have?

Look for concrete things, not vibes:

- A command that did the wrong thing, or had a destructive side effect
- Work redone because a doc, comment, or register was stale or simply wrong
- A test that was misleading, vacuous, or asserted the wrong mechanism
- A recipe re-derived that you had already worked out earlier in the same session
- Repeated tool calls or searches a helper, script, or one-line note would have collapsed
- A permission prompt, a missing tool grant, or an agent lacking what its own description
  promised

For each one, do **exactly one** of:

1. **Fix it now** — if it is small and lives in code or docs you are already touching. A
   stale comment, a missing `AGENTS.md` line, a shared test helper, a `deny` entry.
2. **File it in Notion** via `sync-notion`, as a `🔨 Task` or `🐞 Bug` under the relevant
   epic, if it is bigger or would push the PR past its stated scope.

Never both, never silently neither. "I noticed X was confusing", with no fix and no task,
is how the same hour gets lost twice.

State in your final message which you chose for each. If nothing came up, say so plainly
rather than inventing something.

**Whatever you add here is itself a change, and gets verified like one.** A script or
config tweak written during a retrospective must be run and its actual effect checked — a
"safety" script that quietly rewrites 42 files is worse than the problem it was added for.

## Checklist

- [ ] `pnpm verify` exits 0
- [ ] Manual verification appropriate to what changed
- [ ] Changeset added with the correct packages and bump types
- [ ] Commit message explains why
- [ ] Pushed, PR opened against the right base
- [ ] Notion task updated
- [ ] Retrospective done — each friction point either fixed or filed

## Related

- `stack` — for PRs that build on unmerged work
- `sync-notion` — the Notion schema
- [`AGENTS.md`](../../../AGENTS.md) — the verification gate in full
