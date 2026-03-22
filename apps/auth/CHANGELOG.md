# auth

## 1.1.0

### Minor Changes

- d927b23: Add OAuth 2.1 provider to auth service and integrate cadence-links via OAuth flow.

  The auth service now acts as an OAuth 2.1 provider, enabling cross-domain authentication for apps that don't share the `.downbeatacademy.com` cookie domain. Cadence-links uses the generic OAuth plugin to authenticate via the auth service, with auto-consent for trusted first-party clients.

### Patch Changes

- 20e1641: Finalize auth service extraction: fix cross-origin sign-in flow (return redirect URL instead of server-side redirect), enable cross-subdomain cookies for local dev, trust localhost in redirect URI validation, fix nav auth button flash by rendering banner immediately without waiting for Sanity data, consolidate auth UI logic between header-navigation and nav-content, update file-download sign-in link to use auth service, add 'use client' to Button wrapper, and remove update-password page from www (handled by auth service).
- 9b688d3: Add CORS middleware to auth service API routes to fix cross-origin session validation from consuming apps.

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
