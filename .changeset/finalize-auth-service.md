---
"auth": patch
"www": patch
---

Finalize auth service extraction: fix cross-origin sign-in flow (return redirect URL instead of server-side redirect), enable cross-subdomain cookies for local dev, trust localhost in redirect URI validation, fix nav auth button flash by rendering banner immediately without waiting for Sanity data, consolidate auth UI logic between header-navigation and nav-content, update file-download sign-in link to use auth service, add 'use client' to Button wrapper, and remove update-password page from www (handled by auth service).
