# AGENTS.md — `apps/auth`

The centralized authentication service, and the **OAuth 2.1 / OIDC provider** for every
other app in the monorepo. Next.js 16, port 3002, served at
`auth.downbeatacademy.services`.

Repo-wide rules live in [`../../AGENTS.md`](../../AGENTS.md). The full topology and both
end-to-end flows are in
[`../../docs/architecture/auth.md`](../../docs/architecture/auth.md) — read that before
changing anything here.

## Why this app is high-risk

`www` and `cadence-links` both depend on it for sign-in. A mistake here signs everyone
out of everything, or worse, lets the wrong person in. It also owns the shared auth
database that all three apps read.

Change deliberately. Test the full redirect chain, not just the page you edited.

## Commands

```bash
pnpm auth:dev                     # infisical run --env=dev --path=/auth -- next dev --port 3002
pnpm --filter auth dev:ci         # skips Infisical
pnpm auth:build
pnpm --filter auth typecheck
pnpm --filter auth lint
pnpm --filter auth cypress        # cypress open
pnpm --filter auth test:e2e       # start-server-and-test dev:ci + cypress run
pnpm --filter auth db:push        # drizzle-kit push
pnpm --filter auth db:verify-roles
pnpm --filter auth db:fix-roles
```

`pnpm --filter auth test` runs vitest in a **node** environment (everything unit-tested here
is server-side), over `src/**/__test__/**/*.test.ts`. Coverage is currently the analytics
gate and auth-method resolution only — the five Cypress specs remain the main safety net.

## Analytics

This app owns the **authentication funnel**. Sign-in happens here, in the OAuth provider,
not in the consumer apps — `apps/www` only ever receives the resulting session. Events
previously lived in `www` on its disabled email-auth path and never fired once.

Capture goes through `src/lib/analytics`, never `posthog-node` directly:

- `sign_up_completed` and `sign_in_completed` hang off better-auth `databaseHooks`
  (`user.create.after`, `session.create.after`). Hooking the database rather than the route
  handlers means every entry point is covered — email and OAuth alike — with nothing to
  remember when a new one is added.
- `session.create.after` fires for reasons other than someone signing in. `resolveAuthMethod`
  returns `null` for any path that is not a recognised sign-in entry point, and the hook
  bails on `null`. Removing that guard silently inflates the sign-in count with session
  refreshes.
- `sign_out_completed` is captured in `src/app/sign-out/page.tsx`, reading the session
  *before* `auth.api.signOut()` destroys it. That page is the real sign-out path — consumer
  apps redirect to it — so instrumenting it covers all of them.
- `captureAuthEvent` never throws and is never awaited. It runs on the critical path of
  signing in; analytics must not be able to fail an authentication.
- `distinctId` is always the better-auth `user.id`. That shared id is the *only* thing
  stitching these events to `www`'s — the two apps are on different domains, so there is no
  shared cookie and no common anonymous id.
- `password_reset_completed` uses better-auth's `onPasswordReset`, which runs only after the
  password has actually changed. Paired with `password_reset_requested` it gives the
  completion rate of the flow. It covers the token-based reset route only —
  `updatePasswordAction` changes a password for an already signed-in user, which is a
  different action and is deliberately not reported as a reset.
- `oauth_authorization_granted` is the one event that is **not** a database hook, because it
  cannot be: `databaseHooks` only reach better-auth's base models, and the OAuth token row
  belongs to the provider plugin. It hangs off an `after` hook on `/oauth2/token` instead,
  which is the honest anchor anyway — the point where a consumer app stops being a redirect
  and actually receives credentials.

### Why `oauth_authorization_granted` looks the way it does

There is **no consent screen.** `consentPage: '/consent'` is configured but that route does
not exist, and it is never reached: all three consumer apps are first-party and registered
with `skipConsent`, so `/oauth2/authorize` redirects straight back with a code. Instrumenting
a consent click would have reported zero forever — the same class of mistake as the original
`apps/www` instrumentation on the disabled email-auth path.

`resolveOAuthGrant` reads `sub` and `aud` out of the issued `id_token`. Both are OpenID
Connect claims with spec-defined meanings, which keeps the event tied to the protocol rather
than to plugin internals. Two better-auth-specific anchors were considered and rejected: the
authorize endpoint signals success by *throwing* a redirect, and the token row is a plugin
model no hook can see. Either would break on a minor version bump, and would break silently.

Three things to know if you touch it:

- **`grant_type` is guarded.** A refresh hits the same endpoint with the same response shape.
  Counting it turns the event into a measure of session length — the same trap
  `resolveAuthMethod` exists to avoid for `sign_in_completed`.
- **`sub` equals `user.id` only under the default public subject type.** Setting
  `subject_type = 'pairwise'` on a client would silently stop the person stitching to `www`.
- **A code exchange that resolves to no grant logs a warning.** If better-auth ever changes
  the token response shape, that warning is the only thing standing between you and an event
  that quietly stops firing.

Like `www`, capture is gated by host: `shouldCaptureAuthAnalytics` requires `AUTH_SERVICE_URL`
to be the production auth service. Gating on `NODE_ENV` would not work, because preview
deploys also run with `NODE_ENV=production`. Set `POSTHOG_DEBUG=true` to capture from a local
run — those events go to the production project.

### The two variables this needs, and how it fails without them

`NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` (yes, `NEXT_PUBLIC_`, even though nothing here is sent
to a browser — it is the same token `www` uses) and `AUTH_SERVICE_URL`. Both live in
Infisical at `/auth` and reach Railway through the Infisical → Railway integration.

Without the token, `getClient()` returns `null` and **every auth event is silently dropped**.
Nothing logs, nothing errors, and `pnpm verify` stays green — the funnel simply reads zero
in PostHog, which looks exactly like nobody signing in. This is not hypothetical: the token
was absent from `/auth` for the first two weeks after the funnel shipped, and no layer of
the testing strategy could have caught it, because all of them run against a fake token by
design.

`getClient()` caches its gate decision in a module-level singleton, so **adding the variable
is not enough — the service has to be redeployed.** A synced Railway variable does not
restart the process.

## Layout

```
src/
├── app/
│   ├── api/auth/[...all]/route.ts                        better-auth catch-all
│   ├── api/auth/.well-known/openid-configuration/route.ts OIDC discovery
│   ├── sign-in/  sign-up form  forgot-password/  update-password/  sign-out/
│   └── (admin)/  admin, admin/users, admin/users/[userId], admin/sessions
├── actions/  components/  lib/  styles/  types/
├── lib/auth/    auth.ts, permissions.ts, require-auth.ts
├── lib/db/      drizzle.ts, schema/auth.ts (13 tables)
├── proxy.ts     CORS for /api/auth/:path* only
└── drizzle-auth.config.ts
cypress/e2e/     sign-in, sign-up, password-reset, cross-origin, admin-access
```

## Key patterns

### Provider configuration — `src/lib/auth/auth.ts`

- `baseURL` from `AUTH_SERVICE_URL`. **Capital U.** `baseUrl` fails at startup with
  `Invalid URL`.
- `emailAndPassword` enabled with `requireEmailVerification` and
  `emailVerification.sendOnSignUp`. This is the *only* app that does password auth.
- Verification and reset emails go out inline through Resend, using `VerifyEmail` and
  `ResetPasswordEmail` imported from the `email` workspace package via the deep path
  `email/emails/index` (the package's `main` points at a nonexistent `index.js`).
- Explicit `trustedOrigins` allowlist. Add new consumer origins here.
- `validateRedirectUri()` with a `TRUSTED_DOMAINS` allowlist — the open-redirect guard.
  Any new redirect target must go through it.

Plugin order: `jwt()`, `oauthProvider({...})`, `admin({ ac, roles })`, `organization()`,
`nextCookies()`. **`nextCookies()` must remain last.**

`oauthProvider` injects `role` into `customIdTokenClaims` and `customUserInfoClaims` —
this is how consumers learn a user's permissions.

### Sign-in must continue the OAuth flow

The single most important behavior in this app. When `oauthProvider` redirects to
`loginPage`, it appends the OAuth params. After authenticating, the page must redirect
back to **`/api/auth/oauth2/authorize` with those same params** — not to `redirect_uri`.
Redirecting straight to the app bypasses the code-grant step and produces
`oAuth_code_missing`.

### Sign-out is cross-app

`/sign-out?redirect_uri=…` clears the provider session and returns. Consumers call it
after clearing their own local session; without it the next OAuth attempt silently
re-authenticates.

### CORS

`proxy.ts` covers `/api/auth/:path*` only — origin allowlist plus an `ALLOWED_ORIGINS`
env escape hatch for Railway previews, `credentials: true`, 403 on a disallowed
preflight.

### Database

`src/lib/db/schema/auth.ts` — 13 tables, including the provider-only `oauth_client`,
`oauth_access_token`, `oauth_refresh_token`, `oauth_consent`, and `jwks`.

**Every better-auth plugin's tables must appear in the Drizzle schema object.** A missing
one produces `[# Drizzle Adapter]: The model "X" was not found in the schema object`.
When adding a plugin, grep its source for `modelName`.

## Gotchas

- **`consentPage: '/consent'` is configured and that route does not exist.** It has not
  broken anything because both registered clients have `skip_consent = true`. Registering
  a third-party client would 404.
- **`skipConsent` cannot be set through the API.** The `oauthProvider` update-client
  endpoint's schema omits it. Use SQL:
  `UPDATE oauth_client SET skip_consent = true WHERE client_id = '…';`
- **This app has local copies of `link`, `tabs`, `toast`, and `ui/button`** in
  `src/components/`, despite depending on `cadence-core`. That is debt, not a pattern —
  use `cadence-core` for anything new.
- **`drizzle-auth.config.ts` does not load dotenv**, unlike the other three configs in
  the repo. It relies on Infisical or ambient env. Running `db:push` outside
  `infisical run` will fail confusingly.
- **`require-auth.ts` here is uncached**, unlike `www`'s `React.cache()` version — the
  admin pages re-check per request on purpose.
- The five Cypress specs had never been runnable before the `cypress` dependency was
  added. Expect some to fail on first run; that is a finding, not a regression.

## Don't

- Don't add `crossSubDomainCookies`. The provider is on a different TLD from `www`, which
  is the entire reason this is OAuth and not shared sessions.
- Don't reorder the plugin array.
- Don't change role definitions here — they live in `packages/auth-permissions` and are
  shared with every consumer.

## Related

- [`../../docs/architecture/auth.md`](../../docs/architecture/auth.md) — topology, flows, role matrix
- [`../../packages/auth-permissions/AGENTS.md`](../../packages/auth-permissions/AGENTS.md)
- [`../../docs/adr/0002-known-gaps.md`](../../docs/adr/0002-known-gaps.md)
