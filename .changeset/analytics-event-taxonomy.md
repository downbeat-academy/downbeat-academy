---
'analytics': minor
'www': patch
---

Add a shared analytics event taxonomy and remove the events that never fired.

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
