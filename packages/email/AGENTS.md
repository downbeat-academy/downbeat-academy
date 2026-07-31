# AGENTS.md — `packages/email`

Transactional email templates built with [react-email](https://react.email). Consumed by
`apps/auth` only.

Repo-wide rules live in [`../../AGENTS.md`](../../AGENTS.md).

## Source-only: no build step

Like `auth-permissions`, this package has no build script and no `dist/`. `apps/auth`
imports raw TSX and transpiles it.

**`package.json` declares `"main": "index.js"`, and that file does not exist.** The
workaround is that `apps/auth` imports the deep path `email/emails/index` directly. If
you add a consumer, either follow that pattern or fix the package's entry point.

## Commands

```bash
pnpm email:dev                    # react-email preview server
pnpm --filter email export        # export templates to static HTML
```

No build, no test, no lint, no typecheck.

## Layout

```
emails/
├── index.ts               barrel — the real entry point
├── contact-form.tsx       ContactFormEmail
├── file-download.tsx      FileDownloadEmail
├── reset-password.tsx     ResetPasswordEmail   ← used by apps/auth
└── verify-email.tsx       VerifyEmail          ← used by apps/auth
components/
├── index.ts
├── body/  container/  heading/  link/  text/    each: component + styles.ts
└── button/                                      + styles/{base,sizes,variants}.ts
.react-email/              generated preview app — a pnpm workspace member
```

## Key patterns

### Email styling is not web styling

`components/` is a **separate mini design system for email**, deliberately not Cadence.
Styles are plain inline-style objects in `styles.ts` files, because email clients do not
support CSS Modules, custom properties, or external stylesheets.

**Do not import `cadence-core` or `cadence-tokens` here.** `--cds-*` custom properties do
not resolve in Outlook, Gmail, or most native clients. If a token value is needed, copy
the resolved literal and leave a comment saying where it came from.

### Sending

This package only defines templates. Sending happens in the consumer —
`apps/auth/src/lib/auth/auth.ts` renders `VerifyEmail` and `ResetPasswordEmail` and
dispatches them through Resend inside better-auth's email callbacks.

## Gotchas

- **`www` does not use this package.** It duplicates email logic in
  `apps/www/src/actions/email/` with its own templates and its own Resend client at
  `src/lib/email/resend.ts` (which throws at import time if the API key is missing).
  Consolidating is worth doing but has not been done — see
  [`../../docs/adr/0002-known-gaps.md`](../../docs/adr/0002-known-gaps.md).
- **`.react-email/` is generated** and is a workspace member (declared in
  `pnpm-workspace.yaml`) purely so its dependencies resolve. Do not edit it.
- Always preview a template change with `pnpm email:dev` before shipping. Email rendering
  has no test coverage, and clients are unforgiving.

## Related

- [`../../apps/auth/AGENTS.md`](../../apps/auth/AGENTS.md) — the only consumer
- [`../../docs/architecture/infrastructure.md`](../../docs/architecture/infrastructure.md) — Resend setup
