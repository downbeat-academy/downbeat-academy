---
'www': patch
---

Add the two verification layers that unit tests cannot provide.

`cypress/e2e/analytics/posthog-events.cy.ts` stubs `/ingest` and asserts events genuinely
leave the browser. It is the only check that exercises the `/ingest` rewrite, the
`proxy.ts` matcher, and the init gate — all of which fail silently. It joins the blocking
PR smoke set, which required giving the CI build a fake PostHog token and
`NEXT_PUBLIC_POSTHOG_DEBUG=true` so the app emits anything at all on localhost.

`docs/testing/analytics-qa.md` is the manual checklist for a deployed environment: missing
Infisical secrets, ad blockers, cross-app identity stitching, and what
`defaults: '2026-01-30'` actually enables — none of which any local test can determine.
