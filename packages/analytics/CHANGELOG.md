# analytics

## 0.3.0

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

## 0.2.0

### Minor Changes

- f01436e: Add a shared analytics event taxonomy and remove the events that never fired.

  `packages/analytics` is a new source-only package holding every event name and its
  property types. It has no runtime and no PostHog SDK dependency, because `www` uses
  `posthog-js` and `auth` uses `posthog-node` — each app supplies its own thin typed
  `capture` wrapper on top of it.

  In `www`, the four live call sites now go through `src/lib/posthog/capture.ts`, so only
  names in the taxonomy compile.

  Removes four captures that sat on the dead email-auth path and had never fired:
  `user_signed_up`, `user_signed_in`, `user_signed_out`, and `password_reset_requested`.
  Real sign-in happens through the OAuth provider in `apps/auth`, which is where these are
  re-instrumented. `src/lib/posthog-server.ts` and the `posthog-node` dependency go with
  them, since nothing in `www` captures server-side any more.

### Patch Changes

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
