# Infrastructure

Railway hosts everything, Cloudflare fronts DNS, Infisical holds every secret.

**No deployment configuration lives in this repository.** There is no `railway.json`, no
`Dockerfile`, no `nixpacks.toml`, no `vercel.json`. Build commands, start commands, and
environment variables are all configured in the Railway dashboard. The only compose file
is `docker-compose.test.yml`, which runs a local Postgres on port 5433 for tests.

## Railway

Project `downbeat-academy` (`015be7fa-1014-4eb3-85f4-f40384e7f105`), workspace
Folklore Studios.

| Service | Type | Start command | Custom domain |
| --- | --- | --- | --- |
| Web | Next.js (`apps/www`) | `next start` (3000) | `downbeatacademy.com` |
| Auth | Next.js (`apps/auth`) | `next start` (3002) | `auth.downbeatacademy.services` |
| Cadence Links | Next.js (`apps/cadence-links`) | `next start --port 3001` | `links.downbeatacademy.services`, `dwnbe.at` |
| Auth DB | PostgreSQL | — | `shuttle.proxy.rlwy.net:20199` |
| Cadence Links DB | PostgreSQL | — | `interchange.proxy.rlwy.net:14685` |
| Sanity | Studio | `sanity start --host 0.0.0.0` | — |
| Cadence React Storybook | Static | `serve storybook-static -l tcp://0.0.0.0:$PORT` | `cadence.downbeatacademy.com` |
| Cadence Web Components Storybook | Static | same | `cadence-web.downbeatacademy.com` |

Both Storybook services build on Railway (`build:storybook`) and serve the result, so
`storybook-static/` is gitignored in both packages rather than committed.

### Two networking rules learned the hard way

1. **`*.railway.internal` hostnames only resolve inside Railway's network.** Use the
   public `*.proxy.rlwy.net` host for any database connection you configure.
2. **Service-to-service calls through Cloudflare-proxied domains can fail with
   `ECONNREFUSED`.** If one Railway service needs to reach another, use the
   Railway-generated `*.up.railway.app` domain rather than the custom domain.

## Cloudflare

Three zones: `downbeatacademy.com`, `downbeatacademy.services`, `dwnbe.at`.

- `www.downbeatacademy.com` → 301 to the apex via a **Redirect Rule** (not a Page Rule).
  The `www` CNAME must be **proxied** (orange cloud) for that rule to fire.
- The canonical domain is the apex, `downbeatacademy.com`.
- `dwnbe.at` is CNAME-flattened at the apex to `c5zpdazv.up.railway.app`, proxied.
  Nameservers `rose.ns.cloudflare.com`, `ganz.ns.cloudflare.com`.

## Secrets — Infisical

Project `Downbeat Academy` (`2cb44a5c-c9dc-4a3d-9f19-1dc213d6fa7a`), environments `dev`,
`staging`, `prod`.

Each app has an `.infisical.json` and wraps its dev server:

```jsonc
// apps/www/package.json
"dev": "infisical run --path=/www -- next dev"
"dev:ci": "next dev"          // escape hatch that skips Infisical
```

| Path | App |
| --- | --- |
| `/auth` | `AUTH_SERVICE_URL`, `NEXT_PUBLIC_AUTH_SERVICE_URL`, `DATABASE_URL`, `BETTER_AUTH_SECRET`, `RESEND_API_KEY`, `DEFAULT_REDIRECT_URL`, `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` |
| `/www` | `NEXT_PUBLIC_PROJECT_URL`, `AUTH_SERVICE_URL`, `NEXT_PUBLIC_AUTH_SERVICE_URL`, `DATABASE_URL_AUTH`, `OAUTH_CLIENT_ID/SECRET`, `BETTER_AUTH_SECRET`, plus Sanity, Sentry, PostHog, Fathom keys |
| `/cadence-links` | `NEXT_PUBLIC_APP_URL`, auth service URLs, `DATABASE_URL_AUTH`, `DATABASE_PUBLIC_URL`, `OAUTH_CLIENT_ID/SECRET`, `BETTER_AUTH_SECRET`, `ALLOWED_EMAILS` |

`cms-sanity` and the packages do not use Infisical.

### Server vs client URL variables

- `AUTH_SERVICE_URL` — server-side only. Used for the OAuth discovery fetch.
- `NEXT_PUBLIC_AUTH_SERVICE_URL` — exposed to the browser. Used for redirects such as
  sign-out.

In production both point at `https://auth.downbeatacademy.services`. Getting these
crossed produces confusing failures where sign-in works but sign-out does not.

### Infisical → Railway sync

Infisical pushes secrets into Railway service variables through an integration. **If a
variable is missing in Railway, check the integration is enabled first** — it has been
silently disabled before, which is how `cadence-links` once lost every auth variable.
Variables can also be set directly with `railway variables --set KEY=value`.

`.mcp.json` at the repo root configures the Infisical and Cloudflare MCP servers using a
machine identity. It is gitignored and holds plaintext credentials; it must never be
committed.

## Databases

Two PostgreSQL instances:

- **Auth DB** — shared by all three Next apps. `DATABASE_URL` in the auth service;
  `DATABASE_URL_AUTH` in `www` and `cadence-links`.
- **Links DB** — `cadence-links` only, via `DATABASE_PUBLIC_URL`.

Four drizzle-kit configs, all `dialect: postgresql`, all declaring `out: './drizzle'`:

| Config | Schema | Connection |
| --- | --- | --- |
| `apps/www/drizzle-auth.config.ts` | `src/lib/db/schema/auth.ts` | `DATABASE_URL_AUTH \|\| DATABASE_URL` |
| `apps/www/drizzle-cms.config.ts` | `src/lib/db/schema/content/index.ts` | `DATABASE_URL_CMS` |
| `apps/auth/drizzle-auth.config.ts` | `src/lib/db/schema/auth.ts` | `DATABASE_URL` |
| `apps/cadence-links/drizzle.config.ts` | `src/lib/db/schema/links.ts` | `DATABASE_PUBLIC_URL` |

**No `drizzle/` migration directory exists in any app.** Despite every config declaring
an output path and every app exposing `db:migrate`, the real workflow is
`drizzle-kit push` — schema diffing with no history and no rollback. Nothing runs
migrations in CI or at deploy time. This is the single largest infrastructure risk in the
repo; see [`../adr/0002-known-gaps.md`](../adr/0002-known-gaps.md).

## Observability

| Tool | Scope | Wiring |
| --- | --- | --- |
| **Sentry** | `apps/www` | `withSentryConfig` in `next.config.js` (org `hype-creative-studios`, project `downbeatacademy`); `instrumentation.ts` lazily loads `sentry.server.config.ts` / `sentry.edge.config.ts`; `onRequestError` ignores stale Server Action IDs and aborted requests |
| **PostHog** | `apps/www` | Client init in `instrumentation-client.ts` with `api_host: '/ingest'`, reverse-proxied by a `rewrites()` rule to `us.i.posthog.com` to survive ad blockers. Gated by `shouldInitPostHog` in `src/lib/posthog/config.ts`. Events go through the typed `capture` wrapper in `src/lib/posthog/capture.ts`. Identification in `src/components/posthog-identify/` |
| **PostHog** | `apps/auth` | Server-side only (`posthog-node`), no client init. The authentication funnel: `sign_up_completed` / `sign_in_completed` via better-auth `databaseHooks`, `sign_out_completed` in `src/app/sign-out/page.tsx`, `password_reset_requested` / `password_reset_completed` in `sendResetPassword` and `onPasswordReset`, `oauth_authorization_granted` via an `after` hook on `/oauth2/token`. Gated by `shouldCaptureAuthAnalytics` on `AUTH_SERVICE_URL`, and needs `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` at Infisical `/auth` — without it the whole funnel is dropped in silence |
| **Fathom** | `apps/www` | `src/lib/fathom.tsx`, `includedDomains` restricted to `downbeatacademy.com` |
| **Resend** | `apps/auth`, `apps/www` | `auth` sends verification and reset mail using the `email` package's templates. `www` has its own templates in `src/actions/email/` and does **not** depend on the `email` package |

PostHog and Fathom currently overlap. Consolidating onto PostHog is under consideration.

Sentry and PostHog are both initialized in the same file (`instrumentation-client.ts`),
which is easy to miss when debugging one of them.

### Things that are easy to get wrong here

- **PostHog only captures from the hosts in `POSTHOG_ALLOWED_HOSTS`** (`src/lib/posthog/config.ts`),
  mirroring Fathom's `includedDomains`. Local and preview traffic is deliberately dropped so it
  cannot pollute the production project. To capture from your machine while verifying
  instrumentation, set `NEXT_PUBLIC_POSTHOG_DEBUG=true` — those events land in the **production**
  project, so unset it when you are done.
- **`/ingest` must stay excluded from the `proxy.ts` matcher.** The proxy runs
  `auth.api.getSession()` — a database round trip — on every path it matches. With `/ingest`
  matched, every analytics event and every proxied PostHog asset triggers one, including for
  anonymous visitors.
- **Exception capture belongs to Sentry.** PostHog's `capture_exceptions` is off deliberately;
  turning it on sends every error to two vendors. See the "Evaluate consolidating Sentry into
  PostHog" task before changing this.
- **Event names are not free-form.** They live in `packages/analytics` and are enforced by the
  typed `capture` wrapper. Do not call `posthog.capture` directly — it accepts any string, which
  is how the same concept once shipped as both `registration_method` and `method`.
- **A `capture` call that typechecks is not a capture that fires.** Four events in the original
  wizard integration sat on the dead email-auth path and never once ran. Reachability is proven
  by `apps/www/cypress/e2e/analytics/posthog-events.cy.ts`, not by the type system — and whether
  events reach *PostHog* is proven by neither. That needs the deployed environment and the
  checklist in [`apps/www/docs/testing/analytics-qa.md`](../../apps/www/docs/testing/analytics-qa.md).
- **`apps/auth` deliberately has no client-side PostHog.** It is on
  `auth.downbeatacademy.services` while `www` is on `downbeatacademy.com` — different domains,
  so a browser SDK there would create a second anonymous-identity pool with nothing to stitch it
  to the first. Cross-subdomain cookies are not an option either; see
  [`auth.md`](./auth.md). Capturing server-side against the better-auth `user.id` — the same id
  `www` identifies with — sidesteps the problem. The cost is that anonymous pre-auth steps on the
  auth domain are invisible, so drop-off *within* the sign-in page is not measurable.

## CI

Three workflows in `.github/workflows/`:

- **`ci-monorepo.yml`** — lint, typecheck, and test across every workspace, plus a `www`
  coverage job. Runs on all PRs and pushes to `main`.
- **`ci-www-e2e.yml`** — Cypress. Path-filtered to `apps/www/**` and `packages/cadence-**`.
  Smoke tests on PRs; full suite on push and `workflow_dispatch` (which takes a
  `test_suite` choice input).
- **`release.yml`** — changesets on `main`. Opens the "Version Packages" PR. Publishes
  nothing.

E2E materialises `apps/www/.env.local` from ~14 GitHub secrets via a heredoc, then runs
`pnpm test:prepare` (`apps/www/scripts/setup-test-env.ts`) to set up schema and seed test
users. Note that this path, not `db:migrate`, is what prepares the CI database.

`scripts/test-github-actions-locally.sh` runs workflows locally with `act`.

## Related

- [`auth.md`](./auth.md) — how the OAuth topology maps onto these domains
- [`../adr/0002-known-gaps.md`](../adr/0002-known-gaps.md) — the migrations gap in full
