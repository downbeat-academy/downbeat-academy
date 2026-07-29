# `.claude/`

Claude Code configuration for this repository. Everything here is committed and shared,
except `settings.local.json`.

```
agents/            subagent definitions
skills/            repo-specific workflows, invoked as /<name>
settings.json      committed permissions — shared
settings.local.json  personal overrides — gitignored, never commit
```

## Skills

| Skill | Use it when |
| --- | --- |
| `plan-feature` | Starting any non-trivial work — turns a Notion task or description into a plan and a branch |
| `new-component` | Adding a component to `cadence-core` |
| `new-sanity-type` | Adding a CMS content type and wiring it through to `www` |
| `ship` | Work is done — verify, changeset, commit, PR, update Notion |
| `stack` | A change depends on unmerged work, or large work needs splitting |
| `sync-notion` | Reading or updating the Product Roadmap |

Invoke with `/plan-feature`, `/ship`, and so on.

The typical loop:

```
/plan-feature  →  build (reading the workspace AGENTS.md)  →  /ship
```

## Permissions

`settings.json` is deliberately conservative, because it is shared and applies to
everyone who clones the repo.

**Allowed outright:** read-only inspection, and the build and verification commands that
every workflow depends on — `pnpm verify`, per-workspace `test`/`typecheck`/`lint`/`build`,
read-only `git` and `gh`, documentation lookups, and read-only MCP calls.

**Prompts first:** anything that leaves the machine or mutates shared state — `git push`,
opening or merging a PR, `db:push` / `db:migrate` against a real database, deploying the
Studio, and Notion writes.

**Denied:** reading `.env*` or `.mcp.json` (secrets), force pushes, and publishing.

Blanket patterns like `Bash(pnpm:*)` or `Bash(npx:*)` are intentionally **not** here —
they permit far more than they appear to (`pnpm publish`, `pnpm dlx <anything>`). Put
personal conveniences in `settings.local.json` instead, where they affect only you.

## Related

- [`../AGENTS.md`](../AGENTS.md) — the repo-wide agent contract
- [`../docs/README.md`](../docs/README.md) — architecture documentation
