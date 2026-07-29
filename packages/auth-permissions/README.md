# auth-permissions

Shared RBAC for Downbeat Academy: permission statements, the four roles, and the server
route guards. The single source of truth that keeps the `auth` service and its consumer
apps (`www`, `cadence-links`) agreeing on what a role means.

## Source-only

There is **no build step**. `main`, `types`, and `exports` all point at `./src/index.ts`,
and consumers transpile the raw TypeScript. Edits take effect immediately — but a type
error here surfaces in every consuming app, so run `pnpm typecheck` from the repo root
after changing anything.

## Roles

| Role | Summary |
| --- | --- |
| `student` | Default. Read content, read and enrol in courses. |
| `educator` | Author and publish content, courses, links. No user management. |
| `admin` | All content, plus user list/ban/set-role and session list/revoke. |
| `superAdmin` | Everything, including impersonate, delete, and set-password. |

## Exports

`statements`, `ac`, the four roles, `Role` / `AdminRole` / `ROLES` / `ADMIN_ROLES` /
`DEFAULT_ROLE`, `createGuards`, and the predicates `hasRole` / `isAdmin`.

Note that `hooks.ts` contains **no React hooks** — `hasRole` and `isAdmin` are pure
synchronous functions, safe on the client.

```bash
pnpm --filter auth-permissions test
```

## Documentation

- [`AGENTS.md`](./AGENTS.md) — the full permission matrix, guard wiring, and gotchas
- [`../../docs/architecture/auth.md`](../../docs/architecture/auth.md)
