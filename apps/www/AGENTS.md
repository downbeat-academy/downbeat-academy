# AGENTS.md — `apps/www`

The main Downbeat Academy website. Next.js 16 App Router, React 19, port 3000, served at
`downbeatacademy.com`.

Repo-wide rules live in [`../../AGENTS.md`](../../AGENTS.md). This file covers what is
specific to this app.

## What it does

Renders editorial content from Sanity, authenticates users against `apps/auth` over
OAuth, and hosts an admin area for user and subscriber management.

It consumes `cadence-core`, `cadence-icons`, `cadence-tokens`, `auth-permissions`, and
both typeface packages. It does **not** consume `packages/email` — it has its own email
logic in `src/actions/email/`.

## Commands

```bash
pnpm www:dev                      # infisical run --path=/www -- next dev
pnpm --filter www dev:ci          # skips Infisical; needs a manual .env.local
pnpm www:build
pnpm --filter www typecheck       # uses tsconfig.build.json (excludes cypress)
pnpm --filter www test            # vitest run
pnpm --filter www test:coverage
pnpm www:cypress                  # cypress open
pnpm --filter www test:e2e        # start-server-and-test + cypress run
```

Database and test-fixture helpers (there are ~20 `test:*` scripts backed by
`scripts/*.ts`; these are the ones you will actually use):

```bash
pnpm --filter www db:push         # drizzle-kit push, auth schema
pnpm --filter www test:prepare    # set up schema + seed + verify test users
pnpm --filter www test:validate-env
```

## Layout

```
src/
├── app/
│   ├── (auth)/                       sign-in, forgot-password, update-password
│   ├── (pages)/                      own layout: header + content wrapper + footer
│   │   ├── (educational-content)/    articles, categories, handbook, lexicon
│   │   ├── (marketing)/              links, newsletter
│   │   ├── [slug]/                   catch-all for Sanity `page` documents
│   │   ├── account/  contact/  contributors/  unsubscribe/
│   ├── admin/                        NOT in a route group — own layout/loading/error
│   │   └── _components/              admin-shell, sidebar, metric/chart cards
│   └── api/auth/[...all]/route.ts    the only API route
├── actions/          server actions — admin/, auth/, email/, profile/, each with __test__/
├── components/       folder-per-component, index.ts + *.module.css
├── lib/              auth/, db/, sanity/, queries/, admin/, email/, posthog-server.ts
├── hooks/  utils/  styles/  types/
├── proxy.ts          Next 16 middleware replacement (Node runtime)
├── instrumentation.ts / instrumentation-client.ts
└── sentry.{edge,server}.config.ts
```

## Key patterns

### Routing

`proxy.ts` is Next 16's replacement for `middleware.ts`. It protects `/account` and
bounces signed-in users away from auth routes. It runs on the Node runtime, not edge.

`admin/` is deliberately **not** in a route group — it needs its own layout chain
separate from `(pages)`.

### Data

Two Drizzle instances in `src/lib/db/drizzle.ts`, both `pg.Pool`-backed and cached on
`globalThis` to survive HMR:

- `authDb` ← `DATABASE_URL_AUTH` — the shared auth database
- `cmsDb` ← `DATABASE_URL_CMS` — content tables (`schema/content/handbooks.ts`)

Admin queries in `src/lib/admin/queries/` are `server-only` and wrapped in both
`React.cache` and `unstable_cache`.

Sanity content is fetched with `sanityClient.fetch(query, params, { next: { revalidate: 60 } })`.
Queries live in `src/lib/queries/`, one file per type. See
[`../../docs/architecture/content.md`](../../docs/architecture/content.md).

### Auth

`src/lib/auth/auth.ts` — better-auth as an OAuth **client** via the `genericOAuth`
plugin, `providerId: 'downbeat-auth'`, pointed at `apps/auth`'s discovery URL. Note that
`baseURL` here is **www's own URL**, not the auth service.

`src/lib/auth/require-auth.ts` builds guards with `createGuards()` from
`auth-permissions`, wrapping `requireAuth`/`requireAdmin` in `React.cache()` so a layout
and its page share a single session lookup.

### Styling

`src/styles/index.css` is the entry chain, in this order: cadence-tokens CSS →
cadence-core CSS → typefaces → `global.css`. Components use CSS Modules against
`--cds-*` tokens.

Prefer `cadence-core` components. Where `www` has a local wrapper it aliases the import
(`Button as CadenceButton`) — follow that convention rather than shadowing the name.

### Observability

`instrumentation-client.ts` initializes **both** Sentry and PostHog — easy to miss when
debugging either. PostHog uses `api_host: '/ingest'`, reverse-proxied by a `rewrites()`
rule in `next.config.js`.

**PostHog does not run locally.** `shouldInitPostHog` (`src/lib/posthog/config.ts`) restricts
capture to the production hosts, mirroring Fathom's `includedDomains`, so dev and preview traffic
cannot pollute the project. If you are verifying instrumentation and expect to see events, set
`NEXT_PUBLIC_POSTHOG_DEBUG=true` — and unset it afterwards, because those events go to the
production project. In development the console says which of the two reasons applied.

`/ingest` is excluded from the `proxy.ts` matcher on purpose. The proxy does a full
`auth.api.getSession()` database lookup for every path it matches; leaving `/ingest` in means one
per analytics event.

**Capture events through `src/lib/posthog/capture.ts`, never `posthog.capture` directly.** The
wrapper types against the taxonomy in `packages/analytics`, so only real event names with their
declared properties compile. `posthog.capture` accepts any string. `posthog.reset()` on sign-out
(`components/navigation/main/header-navigation.tsx`) is a legitimate direct use — it is not a
capture.

Content routes are instrumented with `<TrackContentView>` from `components/analytics`, mounted
from the server component that already fetched the record. Pass the slug and title from that same
fetch rather than re-deriving them, so the event cannot disagree with what was rendered. The
component is keyed on `event:slug`, not a boolean, because App Router reuses it across
navigations within a route — a boolean would swallow every article after the first.

## Gotchas

- **Sanity failures are silent.** `src/lib/sanity/sanity.client.ts` monkey-patches
  `fetch` to return `[]` when `NEXT_PUBLIC_SANITY_PROJECT_ID` is unset. Empty pages mean
  "check your env", not "no content". Tests can pass against nothing.
- **`sanity.fetch.ts` is dead code.** It implements draft-mode preview correctly and
  nothing imports it. So is `src/components/preview-provider/`.
- **The email sign-in path is dead.** `src/actions/auth/sign-in.ts`, `sign-up.ts`, and
  `(auth)/sign-in/sign-in-form.tsx` call `auth.api.signInEmail`/`signUpEmail`, but this
  app no longer enables `emailAndPassword`. The rendered sign-in page bypasses the form
  and triggers the OAuth redirect on mount. Do not "fix" the form.
- **`src/lib/sanity/sanity.queries.ts` is a legacy monolith** duplicating the article
  queries in `src/lib/queries/`. Use `src/lib/queries/`.
- **Coverage thresholds are narrowly scoped.** 80% lines/functions/statements, 75%
  branches — but only over `src/utils`, `src/lib/types`, `src/actions`, the music-notation
  transformers, and one calculator. A green coverage run says little about the app.
- **`tsconfig.build.json` excludes cypress**; `tsconfig.test.json` adds vitest globals.
  `typecheck` uses the build config.

## Don't

- Don't build a UI primitive here — it belongs in `cadence-core`.
- Don't add `crossSubDomainCookies` to the auth config. See
  [`../../docs/architecture/auth.md`](../../docs/architecture/auth.md).
- Don't commit `.env.local`.

## Related

- [`docs/`](./docs/) — testing, environment setup, and command reference for this app
- [`TESTING.md`](./TESTING.md) — E2E guide
- [`../../docs/architecture/content.md`](../../docs/architecture/content.md)
- [`../../docs/architecture/auth.md`](../../docs/architecture/auth.md)
