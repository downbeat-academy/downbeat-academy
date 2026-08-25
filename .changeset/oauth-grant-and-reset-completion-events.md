---
'analytics': minor
'auth': minor
'www': patch
---

Add `password_reset_completed` and `oauth_authorization_granted` to the auth funnel.

Both were planned in the original epic and never shipped. `password_reset_completed` pairs
with `password_reset_requested` to give the completion rate of the reset flow — the
requested event alone cannot distinguish "reset the password" from "never opened the
email". It uses better-auth's `onPasswordReset`, which runs only after the password has
actually changed, and covers the token-based reset route only; changing a password while
signed in is a different action and is not reported as a reset.

`oauth_authorization_granted` carries `client_id`, and is the only signal of *which*
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
