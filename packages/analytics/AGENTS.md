# AGENTS.md — `packages/analytics`

The single source of truth for analytics event names and their properties. Shared by
`apps/www` (browser events via `posthog-js`) and `apps/auth` (auth-funnel events via
`posthog-node`), so both agree on what an event is called and what it carries.

Repo-wide rules live in [`../../AGENTS.md`](../../AGENTS.md). The observability stack is
in [`../../docs/architecture/infrastructure.md`](../../docs/architecture/infrastructure.md).

Tiny — one source file of types and one constant. It exists because it prevents a
specific, already-observed failure.

## Why it exists

Before this package, event names were free-form string literals across eight files. That
produced a silent inconsistency in the original PostHog wizard integration: the same
concept was sent as `registration_method` on `user_signed_up` and as `method` on
`user_signed_in`. Nothing caught it, because nothing could — there was no place where the
two names were visible to each other.

It also makes tests meaningful. Asserting `capture` was called with `'article_viewed'`
against a hand-typed string literal in the test is a tautology; asserting against a
registry that the source must also satisfy is not.

## Source-only: no build step, no runtime

`main`, `types`, and `exports` all point at `./src/index.ts`. There is no build script
and no `dist/`. Consumers import raw TypeScript and transpile it themselves — the same
arrangement as `auth-permissions` and `email`.

The package deliberately has **no dependency on any PostHog SDK**. `apps/www` uses
`posthog-js` and `apps/auth` uses `posthog-node`; the taxonomy has to be usable from
both, so it ships types and names only. Each app provides its own thin typed `capture`
wrapper — see `apps/www/src/lib/posthog/capture.ts` for the pattern.

## Commands

```bash
pnpm --filter analytics test
pnpm --filter analytics typecheck
```

No build, no lint, no dev server.

## What it exports

From `src/index.ts`:

| Export | What it is |
| --- | --- |
| `AnalyticsEventMap` | The taxonomy — every event name mapped to its property type. `never` means no properties. |
| `AnalyticsEvent` | `keyof AnalyticsEventMap`. The union every call site is typed against. |
| `CaptureArgs<E>` | Argument tuple for a typed `capture` wrapper. Events with no properties take one argument; events with properties require them. |
| `ANALYTICS_EVENT_NAMES` | Every event name as a readonly array, for tests and docs that enumerate them. |
| `AuthMethod`, `NewsletterSource` | Shared property value unions. |

## Adding an event

1. Add it to `AnalyticsEventMap` in `src/events.ts`, in the right section.
2. Add the name to `ANALYTICS_EVENT_NAMES`.

Skipping step 2 fails `pnpm typecheck`, not just the test suite — the exhaustiveness
assertion in `src/__tests__/events.test.ts` resolves to `never` and the assignment
breaks. That is deliberate; a registry that silently drifts is worse than none.

## Conventions the tests enforce

- `object_verb`, snake_case, **past tense**. `article_viewed`, never `article_view` or
  `viewArticle`. Irregular past tenses have to be listed in the test (`read` is the only
  one so far).
- No `$` prefix — those names belong to PostHog's own events (`$pageview`,
  `$autocapture`, `$exception`) and ours would collide in reporting.
- No duplicates.

## Gotchas

- **Renaming an event breaks historical data.** PostHog groups by name; a rename starts a
  new series and silently orphans everything before it. Prefer adding a new event and
  deprecating the old one in a comment.
- **This package cannot tell you whether an event actually fires.** It constrains names
  and shapes only. A `capture` call on an unreachable code path typechecks perfectly —
  that is exactly how four events in the original integration came to be permanently
  dead. Reachability is what the Cypress `/ingest` spec and the live-event QA checklist
  are for.

## Related

- [`../../docs/architecture/infrastructure.md`](../../docs/architecture/infrastructure.md) — the observability stack
- [`../../apps/www/AGENTS.md`](../../apps/www/AGENTS.md) — the browser `capture` wrapper
