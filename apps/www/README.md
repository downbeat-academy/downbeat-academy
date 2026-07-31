# Downbeat Academy `www`

The primary web application for Downbeat Academy — [downbeatacademy.com](https://downbeatacademy.com).

Built with:

- **Next.js 16** (App Router) and React 19
- **Sanity** for content management
- **better-auth + Drizzle ORM (PostgreSQL)** for authentication, as an OAuth 2.1 client
  of the `auth` service
- **CSS Modules** over Cadence design tokens

It consumes the Cadence design system — `cadence-core` (components), `cadence-icons`,
`cadence-tokens`, and both typeface packages — plus `auth-permissions` for roles and
route guards.

## Getting started

From the repo root:

```bash
pnpm install
pnpm build:packages     # Cadence packages must be built before the app can resolve them
pnpm www:dev            # http://localhost:3000
```

`www:dev` wraps Next in `infisical run --path=/www`, so secrets are injected
automatically. Without Infisical access, use `pnpm --filter www dev:ci` and a manual
`.env.local` — see [`docs/setup/environment-variables.md`](./docs/setup/environment-variables.md).

## Working in this app

**Read [`AGENTS.md`](./AGENTS.md) first.** It covers the routing layout, the data layer,
the auth wiring, and the traps — including that Sanity failures render as empty pages
rather than errors.

## Documentation

- [`AGENTS.md`](./AGENTS.md) — how this app is built and where things live
- [`docs/`](./docs/) — environment setup, testing, and command reference
- [`TESTING.md`](./TESTING.md) — E2E testing guide
- [`../../docs/architecture/content.md`](../../docs/architecture/content.md) — the Sanity content chain
- [`../../docs/architecture/auth.md`](../../docs/architecture/auth.md) — the OAuth topology
