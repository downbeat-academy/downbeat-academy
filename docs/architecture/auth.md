# Authentication architecture

Every app authenticates against a central OAuth 2.1 provider. There is no shared-cookie
session; each app holds its own local session established through an OAuth callback.

## Why OAuth rather than shared cookies

The auth service used to live at `auth.downbeatacademy.com` and share cookies across
`*.downbeatacademy.com`. It moved to `auth.downbeatacademy.services` — a **different
TLD** — which broke cookie sharing outright. Browsers silently drop a cookie whose
`Domain` attribute does not match the page's registrable domain, so no session was ever
set.

OAuth decouples every app from the provider's domain. `crossSubDomainCookies` is
deliberately absent from the config; do not add it back.

## Topology

```
                    apps/auth  (OAuth 2.1 provider)
                    auth.downbeatacademy.services
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
   apps/www           apps/cadence-links     (future apps)
   OAuth client         OAuth client
```

### Provider — `apps/auth`

`src/lib/auth/auth.ts` configures better-auth with:

- `baseURL` from `AUTH_SERVICE_URL`. **The key is `baseURL`, capital U** — better-auth
  1.5.5 renamed it from `baseUrl`, and the wrong case fails at startup with
  `Invalid URL`.
- `emailAndPassword` enabled, with `requireEmailVerification` and `sendOnSignUp`.
  Verification and reset emails are sent inline via Resend, using React templates
  imported from the `email` workspace package.
- An explicit `trustedOrigins` allowlist covering `downbeatacademy.com`, the auth
  service, the links app, and localhost in dev.
- `validateRedirectUri()` with a `TRUSTED_DOMAINS` allowlist — an open-redirect guard.

Plugins, in order: `jwt()`, `oauthProvider({ … })`, `admin({ ac, roles })`,
`organization()`, `nextCookies()`. **`nextCookies()` must stay last.**

`oauthProvider` is configured with `loginPage: '/sign-in'`, a 1-hour access token, a
30-day refresh token, and `customIdTokenClaims` / `customUserInfoClaims` that inject
`role` — this is how a consumer app learns what a user is allowed to do.

Endpoints that matter:

| Route | Purpose |
| --- | --- |
| `src/app/api/auth/[...all]/route.ts` | The better-auth catch-all handler |
| `src/app/api/auth/.well-known/openid-configuration/route.ts` | OIDC discovery — exactly what consumers point `discoveryUrl` at |
| `/sign-in` | Login page. Detects OAuth flows via `client_id` in search params |
| `/sign-out` | Clears the provider session; consumers redirect here |

`proxy.ts` handles CORS for `/api/auth/:path*` only — an origin allowlist plus an
`ALLOWED_ORIGINS` env escape hatch for Railway preview deploys, `credentials: true`, and
a 403 on a disallowed preflight.

### Consumers — `apps/www`, `apps/cadence-links`

Both follow an identical pattern. In `src/lib/auth/auth.ts`:

- `genericOAuth` plugin with `providerId: 'downbeat-auth'`, PKCE, scopes
  `openid profile email`, and `discoveryUrl` pointing at the provider's
  `.well-known/openid-configuration`.
- `mapProfileToUser` pulls `role` off the profile so local code can read it.
- **`baseURL` points at the app's own URL**, not the auth service. This trips people up:
  the client needs its own origin for callbacks.

The sign-in page is a thin client component that immediately calls
`authClient.signIn.oauth2({ providerId: 'downbeat-auth' })`.

## The two flows worth memorising

### Sign-in

The subtle part is that the provider's sign-in page must **continue** the authorization
flow rather than redirect to the app:

1. App calls `authClient.signIn.oauth2(...)` → redirect to the provider's
   `/api/auth/oauth2/authorize`.
2. No provider session → redirect to the provider's `/sign-in`, with the OAuth params
   (`client_id`, `state`, `code_challenge`, …) appended.
3. User signs in. The page detects `client_id` in the search params and redirects back
   to **`/api/auth/oauth2/authorize` with those same params** — *not* to `redirect_uri`.
   Skipping this is what produces `oAuth_code_missing`: the form's own redirect bypasses
   the code-grant step and no authorization code is ever issued.
4. Provider issues the code → app's callback exchanges it → local session created.

### Sign-out

Clearing the local session is not enough. The provider session survives, so the next
OAuth attempt silently re-authenticates without showing a login form.

1. `authClient.signOut()` clears the local session.
2. `window.location.href` → the provider's `/sign-out?redirect_uri=…`, which clears the
   provider session and returns.

## Roles and permissions — `packages/auth-permissions`

A source-only package (no build step) shared by all three Next apps, so the provider and
its consumers cannot disagree about what a role means. ~200 lines across five files.

### Statements — `src/statements.ts`

better-auth's `defaultStatements` (`user`, `session`) merged with four domain resources:

| Resource | Actions |
| --- | --- |
| `content` | create, read, update, delete, publish |
| `course` | create, read, update, delete, publish, enroll |
| `link` | create, read, update, delete |
| `newsletter` | create, read, update, send |

`ac = createAccessControl(statements)`.

### Roles — `src/roles.ts`

| Role | Summary |
| --- | --- |
| `student` | Default for new signups. Read content, read + enroll in courses. Nothing else. |
| `educator` | Authors and publishes content, courses, and links. **No user management.** |
| `admin` | Full content access, plus `user: list/set-role/ban/create/get/update` and `session: list/revoke`. |
| `superAdmin` | Everything, and the only role that can `impersonate`, `delete` users, `set-password`, or `session: delete`. |

The admin/superAdmin split is real, not cosmetic: an `admin` cannot impersonate, delete
an account, or reset a password.

### Guards — `src/guards.ts`

`createGuards` is a **factory, not a hook**. It is framework-agnostic by injection — you
pass `{ auth, getHeaders, redirect, signInPath?, unauthorizedPath? }` and receive
`{ requireAuth, requireRole, requireAdmin }` suitable for server components. The `auth`
parameter is structurally typed to just `api.getSession`.

`apps/www` wraps its guards in `React.cache()` (`src/lib/auth/require-auth.ts`) so a
layout and its page share one session lookup. `apps/auth` does not — a deliberate
difference, since its admin pages re-check per request.

### Predicates — `src/hooks.ts`

`hasRole` and `isAdmin`. **The filename is misleading — these are not React hooks.**
They are pure synchronous functions over a session object and are safe on the client.

### A typing sharp edge

`ac.newRole()` narrows `authorize()`'s parameter to only the resources that role
declares. So asserting that a role *cannot* do something is a compile error, even though
it is a valid runtime check returning `{ success: false }`. `src/__tests__/roles.test.ts`
has a `denies()` helper for exactly this; use it for negative assertions and keep
positive ones directly typed.

## Database

One PostgreSQL database on Railway, shared by all apps. Thirteen tables, defined in
`apps/auth/src/lib/db/schema/auth.ts`:

`user`, `session`, `account`, `verification`, `organization`, `member`, `invitation`, and
the provider-only tables `oauth_client`, `oauth_access_token`, `oauth_refresh_token`,
`oauth_consent`, `jwks`.

**Every better-auth plugin's tables must be present in the Drizzle schema object**, or
you get `[# Drizzle Adapter]: The model "X" was not found in the schema object`. When
adding a plugin, check its source for `modelName` fields.

Consumer apps keep their own copy of the base schema (`user`, `session`, `account`, …)
but not the provider tables. That duplication is a known hazard — see
[`../adr/0002-known-gaps.md`](../adr/0002-known-gaps.md).

## Registering a new OAuth client

1. Temporarily enable `allowDynamicClientRegistration` on the provider.
2. `POST /api/auth/oauth2/register` with an authenticated session.
3. Set `post_logout_redirect_uris` and `enable_end_session`.
4. **`skipConsent` must be set by direct SQL** — the update-client endpoint's schema does
   not expose it:
   ```sql
   UPDATE oauth_client SET skip_consent = true WHERE client_id = '…';
   ```
   First-party apps should all have it.
5. Disable dynamic registration again.

Then follow the `cadence-links` pattern in the new app: `genericOAuth` with
`discoveryUrl`, a `/sign-in` page that triggers the flow, and a sign-out that redirects
through the provider.

## Related

- [`monorepo.md`](./monorepo.md) — why `auth-permissions` is a source package
- [`infrastructure.md`](./infrastructure.md) — domains, Infisical paths, database hosts
- [`../adr/0002-known-gaps.md`](../adr/0002-known-gaps.md) — dead sign-in actions, the
  missing `/consent` route, schema duplication
