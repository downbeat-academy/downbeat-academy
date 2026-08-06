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

There is no `test` script — this app has no unit tests, only the five Cypress specs.

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
