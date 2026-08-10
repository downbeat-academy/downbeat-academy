---
'www': patch
---

Removes `@neondatabase/serverless` from `apps/www`. Neon is no longer used — the database
moved to Railway — and the package had **zero imports** anywhere in the repo. `www` reaches
Postgres through `pg` + `drizzle-orm`, which are unchanged.

Same class of dead weight as the six unused `@radix-ui/*` dependencies removed in Radix
task 0.1: declared, installed, never imported.

`@neondatabase/serverless` still appears in `pnpm-lock.yaml` as part of `drizzle-orm`'s
optional-peer resolution identity (`drizzle-orm@0.45.2(@neondatabase/serverless@1.1.0)…`).
That is a pnpm bookkeeping artifact, not an installed direct dependency; it clears on the
next `drizzle-orm` or `better-auth` bump. The package's own lockfile entry and the
`apps/www` importer entry are both gone.
