---
"auth": minor
"cadence-links": minor
"www": patch
---

Add OAuth 2.1 provider to auth service and integrate cadence-links via OAuth flow.

The auth service now acts as an OAuth 2.1 provider, enabling cross-domain authentication for apps that don't share the `.downbeatacademy.com` cookie domain. Cadence-links uses the generic OAuth plugin to authenticate via the auth service, with auto-consent for trusted first-party clients.
