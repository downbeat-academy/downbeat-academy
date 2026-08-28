# auth

## 1.3.0

### Minor Changes

- b3564a8: Add `password_reset_completed` and `oauth_authorization_granted` to the auth funnel.

  Both were planned in the original epic and never shipped. `password_reset_completed` pairs
  with `password_reset_requested` to give the completion rate of the reset flow — the
  requested event alone cannot distinguish "reset the password" from "never opened the
  email". It uses better-auth's `onPasswordReset`, which runs only after the password has
  actually changed, and covers the token-based reset route only; changing a password while
  signed in is a different action and is not reported as a reset.

  `oauth_authorization_granted` carries `client_id`, and is the only signal of _which_
  consumer app people authorise — `sign_in_completed` says someone signed in, not what they
  signed in to.

  It hangs off an `after` hook on `/oauth2/token` rather than a database hook, because
  `databaseHooks` only reach better-auth's base models and the OAuth token row belongs to the
  provider plugin. It reads `sub` and `aud` from the issued `id_token`, both OIDC-spec claims,
  which keeps it tied to the protocol rather than to plugin internals — the authorize endpoint
  signals success by throwing a redirect, and anchoring on that would break silently on a
  minor version bump. Refresh grants are excluded, or the event would measure session length
  instead of authorisation, and an exchange that resolves to no grant logs a warning rather
  than going quiet.

  Note for anyone instrumenting the consent step later: there isn't one. `consentPage:
'/consent'` points at a route that does not exist and is never reached, because all three
  consumer apps are registered with `skipConsent`.

### Patch Changes

- 572e53e: Document that `apps/auth` needs `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` at Infisical `/auth`,
  and that the service must be redeployed after adding it.

  The token was missing for the first two weeks after the authentication funnel shipped, so
  every auth event was dropped in silence — `getClient()` returns `null` without it, nothing
  logs, and `pnpm verify` stays green. The Infisical table in `docs/architecture/infrastructure.md`
  did not list the variable, `apps/auth/AGENTS.md` never mentioned it, and the live-QA
  checklist said only "the same token is set for the `auth` service" without saying where.
  All three now say it, and the QA checklist adds the redeploy step, since `getClient()`
  caches its gate decision in a module-level singleton and a synced variable alone does not
  restart the process.

- Updated dependencies [f952851]
- Updated dependencies [2599c24]
- Updated dependencies [3ee9142]
- Updated dependencies [b3564a8]
- Updated dependencies [c36a74a]
  - cadence-core@5.1.0
  - cadence-icons@1.9.0
  - analytics@0.3.0

## 1.2.1

### Patch Changes

- Updated dependencies [ba91571]
- Updated dependencies [b678cb1]
- Updated dependencies [3aab1c6]
- Updated dependencies [2961de4]
- Updated dependencies [51280f3]
  - cadence-core@5.0.0

## 1.2.0

### Minor Changes

- 6175ce0: Instrument the authentication funnel in `apps/auth`.

  Sign-in happens in the OAuth provider, not in the consumer apps, so the funnel was
  completely unmeasured — the previous events lived in `apps/www` on its disabled
  email-auth path and never fired.

  Server-side only (`posthog-node`), no client init: `auth` and `www` are on different
  domains, so a browser SDK here would create a second anonymous-identity pool with nothing
  to stitch it to the first. Capturing against the better-auth `user.id` — the same id `www`
  identifies with — avoids that entirely.

  `sign_up_completed` and `sign_in_completed` hang off better-auth `databaseHooks`, so every
  entry point is covered without annotating each route. `sign_out_completed` is captured in
  the sign-out page, which is where consumer apps redirect to clear the session.
  `password_reset_requested` moves to `sendResetPassword`.

  Adds a `test` script to `apps/auth`, which previously had no unit tests at all.

  Removes `password_reset_completed` and `oauth_authorization_granted` from the taxonomy.
  They were declared but not captured anywhere, and a declared-but-dead event is
  indistinguishable from a broken one in a dashboard — which is the exact failure this work
  exists to fix.

### Patch Changes

- Updated dependencies [f01436e]
- Updated dependencies [50af95d]
- Updated dependencies [213053c]
- Updated dependencies [17303d1]
- Updated dependencies [dc2e8fc]
- Updated dependencies [1eabdb6]
- Updated dependencies [1c94d3d]
- Updated dependencies [908a01d]
- Updated dependencies [6690786]
- Updated dependencies [84b5bf8]
- Updated dependencies [dc2e8fc]
- Updated dependencies [6175ce0]
- Updated dependencies [dc2e8fc]
- Updated dependencies [dc2e8fc]
- Updated dependencies [b46f883]
- Updated dependencies [85d321b]
- Updated dependencies [cb7e26c]
- Updated dependencies [dc2e8fc]
- Updated dependencies [dc2e8fc]
- Updated dependencies [a918b1d]
- Updated dependencies [1a08d62]
- Updated dependencies [2afdc0e]
  - analytics@0.2.0
  - cadence-core@4.0.0

## 1.1.1

### Patch Changes

- 927c0b8: Repair the repo-wide verification loop so `lint`, `typecheck`, and `test` are trustworthy gates.

  **`pnpm test` now terminates.** `www`, `cadence-core`, `cadence-core-web-components`, and `cadence-icons` defined `test` as bare `vitest` (watch mode), so the root task hung forever and no exit code was ever observed. All four now run `vitest run`, with `test:watch` kept for interactive use.

  **Typechecking exists.** Every workspace gained a `typecheck` script and a matching `typecheck` task in `turbo.json`. Previously type errors only surfaced during `next build`.

  **CI covers the whole monorepo.** New `ci-monorepo.yml` runs lint + typecheck + test across all workspaces. `ci-www.yml` is removed: its lint/unit jobs are superseded, and its E2E job duplicated `ci-www-e2e.yml`, so PRs touching `apps/www` ran Cypress twice.

  Fixes surfaced by turning the gates on:
  - `cms-sanity` — migrated the legacy `.eslintrc` to flat config (ESLint 9 could not read it, so `eslint .` exited 2). Corrected four `dashboardTool` widget `layout` props from `'medium'`/`'large'` to `{ width: … }`, matching `@sanity/dashboard` v5's `LayoutConfig`.
  - `cadence-core` — the sidebar border assertion tested something jsdom cannot evaluate: jsdom does not resolve `var()`, so `border: 1px solid var(--cds-color-border-faint)` computes as `borderStyle: 'none'`. Now asserted against the declared CSS rule.
  - `auth-permissions` — negative permission assertions ("a student cannot manage users") were type errors, because `ac.newRole()` narrows `authorize()` to the resources a role declares. Added a `denies()` helper that keeps the runtime check.
  - `apps/auth` — added the missing `cypress` dependency and scripts; five E2E specs had been unrunnable.
  - Removed a malformed `packages/cadence-core/.prettierrc` (`"printWidth": "80"` as a string, `tabWidht` misspelled) and a dead `.eslintrc` referencing six uninstalled plugins.
  - Aligned pnpm on 9 across `packageManager` and both workflows (was 8 / 9 / 8).
  - Added `.env*` to `.gitignore`; removed the stale `scripts/test-vercel-build.sh`.

  Also fixed: `button.test.tsx` imported `'../Button'` where the file is `button.tsx`.
  macOS is case-insensitive so it resolved locally; Linux CI is not, and this suite had
  never run there before. The new workflow caught it on its first run.

  Known gaps deliberately left, documented in code where they live: 14 `radio-card` tests are quarantined pending an accessibility fix to `RadioCardItem`; `cadence-core` has no lint setup; `pnpm format:check` is not yet gated in CI.

- Updated dependencies [927c0b8]
  - cadence-core@3.3.1
  - cadence-icons@1.8.1
  - auth-permissions@1.1.1

## 1.1.0

### Minor Changes

- d927b23: Add OAuth 2.1 provider to auth service and integrate cadence-links via OAuth flow.

  The auth service now acts as an OAuth 2.1 provider, enabling cross-domain authentication for apps that don't share the `.downbeatacademy.com` cookie domain. Cadence-links uses the generic OAuth plugin to authenticate via the auth service, with auto-consent for trusted first-party clients.

### Patch Changes

- 20e1641: Finalize auth service extraction: fix cross-origin sign-in flow (return redirect URL instead of server-side redirect), enable cross-subdomain cookies for local dev, trust localhost in redirect URI validation, fix nav auth button flash by rendering banner immediately without waiting for Sanity data, consolidate auth UI logic between header-navigation and nav-content, update file-download sign-in link to use auth service, add 'use client' to Button wrapper, and remove update-password page from www (handled by auth service).
- 9b688d3: Add CORS middleware to auth service API routes to fix cross-origin session validation from consuming apps.
- 6a1710d: Create shared auth-permissions package with expanded RBAC roles and permissions. Replaces duplicated permissions.ts files across all apps with a single shared source of truth. Integrates Better Auth's defaultStatements for proper admin endpoint RBAC gating. Defines four differentiated roles: student, educator, admin, and superAdmin.
- 2ea6f1c: Update tier 1 and tier dependencies
- Updated dependencies [52bdad7]
- Updated dependencies [4d3d348]
- Updated dependencies [f7a0524]
- Updated dependencies [6a1710d]
- Updated dependencies [2ea6f1c]
  - cadence-core@3.2.1
  - cadence-icons@1.7.1
  - auth-permissions@1.1.0
  - cadence-tokens@2.3.1
  - email@1.5.3

## 1.0.1

### Patch Changes

- Updated dependencies [64f45b6]
- Updated dependencies [8b7e7d2]
- Updated dependencies [4ef0ac1]
- Updated dependencies [fe5605e]
- Updated dependencies [0c24c43]
- Updated dependencies [d35466e]
- Updated dependencies [ec4b702]
- Updated dependencies [3101235]
- Updated dependencies [09ae87b]
- Updated dependencies [b276e41]
- Updated dependencies [ad032e7]
  - cadence-core@3.0.0
  - cadence-icons@1.6.1
