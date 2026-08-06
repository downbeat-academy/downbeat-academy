---
name: stack
description: Create and manage stacked pull requests — branching off unmerged work, restacking after a parent changes, retargeting bases, and merging a stack safely. Use when a change depends on another PR that has not merged yet, or when splitting large work into reviewable pieces.
---

# Stacked pull requests

A stack is a chain of branches where each one targets the previous instead of `main`.
Each PR shows only its own diff, so large work stays reviewable.

```
main ← feat/foundation ← feat/api ← feat/ui
```

## When to stack

- A change genuinely depends on unmerged work.
- One logical change is too big to review as a single diff — split it along natural
  seams (infrastructure → data → UI), not arbitrarily.

**When not to stack:** independent changes. Two branches off `main` are simpler and
merge in any order. Stacking adds coordination cost, so it needs to buy something.

Keep stacks short. Three or four PRs is comfortable; beyond that, rebasing after review
feedback becomes the dominant cost.

## Tooling

GitHub has native stacked pull requests — in **public preview since 2026-07-30**. Prefer
them: no third-party tool, the stack is a first-class object on GitHub, and the whole
stack merges atomically.

```bash
gh extension list | grep gh-stack   # native stack support
which gh                            # required either way
```

Install with `gh extension install github/gh-stack`. Do not install tooling without
asking.

Because this is a preview and not yet GA, the plain-git fallback below stays documented.
Graphite (`gt`) does the same job and predates the native feature — if it is already
installed and you prefer it, it still works, but it is no longer the recommendation.

## With native stacks

```bash
gh stack init --base main          # start a stack
gh stack add -m "feat: the thing"  # branch + commit on top of the stack
gh stack submit                    # create/update PRs and link them as a stack
gh stack view                      # ordering and PR status
gh stack sync                      # fetch, rebase, push, sync PR state in one pass
gh stack merge --squash            # merge the stack atomically
```

Navigate with `gh stack up` / `down` / `top` / `bottom`. `gh stack rebase` cascades a
rebase through the stack; `gh stack modify` restructures it (drop, fold, insert, reorder).

**Already have a chain of branches?** You probably do not need to do anything —
branch-off-branch produces exactly the topology a native stack requires, and GitHub
recognizes a correctly-chained set of PRs on its own. `gh stack link` adopts existing
branches and PRs explicitly if it does not.

### What changes semantically

Branch protections are evaluated **as if each PR targets the stack base**, not the branch
directly below it — required reviews, status checks, CODEOWNERS, and code scanning all
apply against `main`. A stack cannot lower the bar for what reaches `main`.

Requirements: all branches in the same repository (no cross-fork stacks), and linear
history. A merged stack cannot be extended — branching off one starts a new stack.

## With plain git (fallback)

### Create

```bash
git checkout feat/foundation          # the parent, not main
git checkout -b feat/api
# … work …
git push -u origin feat/api
gh pr create --base feat/foundation --title "…" --body "…"
```

**`--base` is the parent branch.** Omitting it targets `main` and the PR will show every
commit from the parent as if it were yours.

### Restack after the parent changes

Review feedback on a parent means every descendant needs rebasing. Work bottom-up:

```bash
git checkout feat/foundation
# … apply feedback, commit …
git push --force-with-lease

git checkout feat/api
git rebase feat/foundation
git push --force-with-lease

git checkout feat/ui
git rebase feat/api
git push --force-with-lease
```

`--update-refs` does this in one pass when the branches are all in the current chain:

```bash
git rebase --update-refs main
```

Always `--force-with-lease`, never plain `--force`.

### Rebase the whole stack onto latest main

```bash
git checkout main && git pull
git checkout <top-of-stack>
git rebase --update-refs main
```

Then force-push each branch.

## Merging

**With a native stack — atomically.** `gh stack merge` lands the PRs as a single
operation; `--merge`, `--squash`, and `--rebase` are all supported. From the web UI,
merging one PR lands it and every unmerged layer below it. Either way, confirm CI is
green on every PR first.

Merge queue support is rolling out progressively, and merge-queue bypassing is not
supported.

**Without one — bottom-up, one at a time.** After each merge, GitHub retargets the next
PR to `main` automatically — but verify it did, because a wrong base silently inflates
the next diff.

1. Confirm CI is green on **every** PR in the stack.
2. Merge the bottom PR.
3. Check the next PR's base is now `main` (or the next unmerged parent).
4. `git checkout main && git pull`, then rebase the remainder if needed.
5. Repeat.

Do not merge out of order. It works only by accident, and leaves the intermediate PRs
showing diffs that no longer make sense.

## Rules

- Every PR in a stack must pass `pnpm verify` on its own — reviewers may merge them
  separately.
- Each PR should be independently comprehensible. If one only makes sense alongside the
  next, the split is in the wrong place.
- Say what a PR depends on in its body: *"Stacked on #123."*
- Never rebase a branch someone else is reviewing without saying so.

## Related

- `ship` — verification, changeset, and PR creation
- `plan-feature` — deciding where the seams are before you start
