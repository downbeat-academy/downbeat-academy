---
'auth': patch
'www': patch
---

Document that `apps/auth` needs `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` at Infisical `/auth`,
and that the service must be redeployed after adding it.

The token was missing for the first two weeks after the authentication funnel shipped, so
every auth event was dropped in silence — `getClient()` returns `null` without it, nothing
logs, and `pnpm verify` stays green. The Infisical table in `docs/architecture/infrastructure.md`
did not list the variable, `apps/auth/AGENTS.md` never mentioned it, and the live-QA
checklist said only "the same token is set for the `auth` service" without saying where.
All three now say it, and the QA checklist adds the redeploy step, since `getClient()`
caches its gate decision in a module-level singleton and a synced variable alone does not
restart the process.
