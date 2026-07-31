# AGENTS.md — `apps/cadence-links`

A URL shortener. Next.js 16, port 3001, served at `links.downbeatacademy.services` and
the short domain `dwnbe.at`.

Repo-wide rules live in [`../../AGENTS.md`](../../AGENTS.md).

The smallest and most coherent app in the repo. It is a good reference for the
OAuth-consumer pattern — if you are adding a fourth app, copy this one, not `www`.

## Commands

```bash
pnpm links:dev                          # infisical run --path=/cadence-links -- next dev --port 3001
pnpm links:build
pnpm --filter cadence-links test        # vitest run
pnpm --filter cadence-links test:watch
pnpm --filter cadence-links typecheck
pnpm --filter cadence-links lint
pnpm --filter cadence-links db:push
pnpm --filter cadence-links db:studio
```

Note there is **no `dev:ci`** here, unlike `www` and `auth` — running dev without
Infisical needs a manual `.env.local`.

## Layout

```
src/
├── app/
│   ├── [shortCode]/route.ts         the redirect — 302
│   ├── api/links/route.ts           list, create
│   ├── api/links/[id]/route.ts      delete
│   ├── api/auth/[...all]/route.ts
│   ├── page.tsx  sign-in/  (admin)/dashboard/
├── components/  link-form/, links-table/, success-message/, layout/app-header/
├── lib/
│   ├── auth/     auth.ts, permissions.ts, require-auth.ts
│   ├── db/       drizzle.ts, schema/links.ts, schema/auth.ts, queries/links.ts
│   ├── constants/domains.ts
│   └── utils/    short-code.ts, url-validator.ts
├── proxy.ts
└── drizzle.config.ts
```

## Key patterns

### The redirect is a 302, on purpose

`src/app/[shortCode]/route.ts` returns a **302, not a 301**. A 301 is cached
indefinitely by browsers, which would make a short link permanently immutable. Keep it a
302.

### Two databases

- `DATABASE_PUBLIC_URL` → the links database (`schema/links.ts`: `id` uuid,
  `original_url`, `short_code` unique, `domain`, `created_at`)
- `DATABASE_URL_AUTH` → the shared auth database (`schema/auth.ts`, a mirror of the base
  auth tables)

`DATABASE_PUBLIC_URL` is Railway's *public proxy* URL rather than the internal one —
that is intentional, because `*.railway.internal` does not resolve from outside Railway.

### Auth

The same OAuth-consumer pattern as `www`: `genericOAuth` with
`providerId: 'downbeat-auth'` against the auth service's discovery URL, `admin` plugin
with the shared roles, guards via `createGuards` from `auth-permissions`. The `/sign-in`
page auto-triggers the flow on mount.

Access is additionally gated by an `ALLOWED_EMAILS` env var.

### Supported domains

`src/lib/constants/domains.ts` — `dwnbe.at`, `downbeatacademy.services`,
`downbeatacade.my`. Adding one means updating this file *and* Cloudflare *and* Railway.

## Tests

Real unit tests, and the only app besides `www` with them:
`src/lib/utils/short-code.test.ts`, `url-validator.test.ts`,
`src/lib/constants/domains.test.ts`. Note they sit **beside** the source, not in a
`__test__/` folder — different from `www` and `cadence-core`. Follow the local
convention.

## Known gaps

Deliberate, not oversights — the app is early:

- No click analytics or tracking
- No link editing (create, list, delete only)
- No custom short codes
- No expiry

## Related

- [`README.md`](./README.md) — the most thorough app README in the repo: setup and API reference
- [`docs/DOMAIN_CONFIGURATION.md`](./docs/DOMAIN_CONFIGURATION.md)
- [`../../docs/architecture/auth.md`](../../docs/architecture/auth.md)
