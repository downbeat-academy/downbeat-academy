---
'auth': minor
'analytics': patch
---

Instrument the authentication funnel in `apps/auth`.

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
