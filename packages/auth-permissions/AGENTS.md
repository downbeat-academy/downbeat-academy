# AGENTS.md — `packages/auth-permissions`

The single source of truth for roles, permissions, and route guards. Shared by
`apps/auth` (the OAuth provider) and its consumers `apps/www` and `apps/cadence-links`,
so that all four agree on what a role means.

Repo-wide rules live in [`../../AGENTS.md`](../../AGENTS.md). Auth topology is in
[`../../docs/architecture/auth.md`](../../docs/architecture/auth.md).

Small — five source files, roughly 200 lines. It punches above its size because every
app's authorization decisions route through it.

## Source-only: no build step

`main`, `types`, and `exports` all point at `./src/index.ts`. There is **no build
script** and no `dist/`. Consumers import raw TypeScript and transpile it themselves.

Consequences:

- Edits take effect immediately — no rebuild needed.
- The package contributes nothing to the Turbo build graph. `pnpm build:packages`
  skipping it is correct.
- **A type error here surfaces in every consuming app's typecheck**, not in this
  package's own boundary. After changing anything, run `pnpm typecheck` at the repo root,
  not just here.

## Commands

```bash
pnpm --filter auth-permissions test        # vitest run
pnpm --filter auth-permissions test:watch
pnpm --filter auth-permissions typecheck
```

No build, no lint, no dev server.

## What it exports

All from `src/index.ts`:

| Export | File | What it is |
| --- | --- | --- |
| `statements`, `ac` | `statements.ts` | The permission matrix, and `createAccessControl(statements)` |
| `student`, `educator`, `admin`, `superAdmin` | `roles.ts` | The four roles, as `ac.newRole(...)` |
| `Role`, `AdminRole`, `ROLES`, `ADMIN_ROLES`, `DEFAULT_ROLE` | `types.ts` | Type-level and constant role definitions |
| `createGuards` | `guards.ts` | Factory returning `requireAuth` / `requireRole` / `requireAdmin` |
| `hasRole`, `isAdmin` | `hooks.ts` | Pure synchronous predicates |

### Statements

better-auth's `defaultStatements` (`user`, `session`) merged with four domain resources:

| Resource | Actions |
| --- | --- |
| `content` | create, read, update, delete, publish |
| `course` | create, read, update, delete, publish, enroll |
| `link` | create, read, update, delete |
| `newsletter` | create, read, update, send |

### Roles

| Role | Can | Cannot |
| --- | --- | --- |
| `student` (default) | read content, read + enroll in courses | everything else |
| `educator` | author + publish content, courses, links; read/create newsletters | any user or session management; delete content |
| `admin` | all content; `user: create/list/set-role/ban/get/update`; `session: list/revoke` | impersonate, delete users, set passwords, delete sessions |
| `superAdmin` | everything | — |

The admin/superAdmin split is real: an `admin` genuinely cannot impersonate a user,
delete an account, or reset a password.

### `createGuards` is a factory, not a hook

Framework-agnostic by injection:

```ts
const { requireAuth, requireRole, requireAdmin } = createGuards({
  auth, getHeaders, redirect, signInPath, unauthorizedPath,
})
```

The `auth` parameter is structurally typed to just `api.getSession`, which is why the
same package works in three apps with different better-auth configurations.

Each app wires it in `src/lib/auth/require-auth.ts`. `www` wraps the result in
`React.cache()` so a layout and its page share one session lookup; `auth` deliberately
does not.

## Gotchas

- **`hooks.ts` contains no React hooks.** `hasRole` and `isAdmin` are pure synchronous
  predicates over a session object, safe on the client. The filename is misleading.
- **Negative permission assertions are a type error.** `ac.newRole()` narrows
  `authorize()`'s parameter to only the resources that role declares, so
  `student.authorize({ user: ['list'] })` will not compile — even though it is a valid
  runtime check returning `{ success: false }`. `src/__tests__/roles.test.ts` has a
  `denies()` helper for exactly this. Use it for negative assertions; keep positive ones
  directly typed so genuine typos still fail to compile.
- **Each app re-exports this package through a one-line shim** at
  `src/lib/auth/permissions.ts`. Import from the shim inside an app, not from the package
  directly, so there is one place to intercept.

## Changing roles or permissions

1. Edit `statements.ts` and/or `roles.ts`.
2. Add or update a test in `src/__tests__/roles.test.ts` — the permission matrix is
   exactly the kind of thing that should be asserted, not assumed.
3. Run `pnpm verify` at the **repo root**, not just here. This package has no build
   boundary, so breakage shows up in the apps.
4. Consider whether `apps/auth` needs to propagate anything new through
   `customIdTokenClaims` / `customUserInfoClaims`, and whether consumers'
   `mapProfileToUser` needs to read it.
5. Add a changeset.

## Related

- [`../../docs/architecture/auth.md`](../../docs/architecture/auth.md)
- [`../../apps/auth/AGENTS.md`](../../apps/auth/AGENTS.md)
