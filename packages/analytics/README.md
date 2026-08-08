# analytics

Shared analytics event taxonomy for Downbeat Academy — event names and property types.
No runtime, no SDK dependency.

Consumed as raw TypeScript source by `apps/www` and `apps/auth`. There is no build step.

## Usage

Each app supplies its own `capture` wrapper, because the clients differ — `posthog-js` in
the browser, `posthog-node` on the server — but both type against this package.

```ts
import posthog from 'posthog-js'
import type { AnalyticsEvent, CaptureArgs } from 'analytics'

export function capture<E extends AnalyticsEvent>(...args: CaptureArgs<E>): void {
	const [event, properties] = args as [E, Record<string, unknown> | undefined]
	posthog.capture(event, properties)
}
```

Call sites then get the taxonomy enforced for them:

```ts
capture('contact_form_submitted')                              // ok
capture('newsletter_subscribed', { source: 'newsletter_page' }) // ok
capture('newsletter_subscribed')                                // error: properties required
capture('contact_form_submited')                                // error: not in the taxonomy
```

## Adding an event

Add it to `AnalyticsEventMap` and to `ANALYTICS_EVENT_NAMES`, both in `src/events.ts`.
Omitting the second fails `pnpm typecheck`.

See [`AGENTS.md`](./AGENTS.md) for the naming conventions and the reasoning behind them.
