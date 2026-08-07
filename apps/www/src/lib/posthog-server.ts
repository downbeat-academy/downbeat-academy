import { PostHog } from 'posthog-node'

/**
 * Constructs a new PostHog client. This is deliberately not a singleton — with
 * `flushAt: 1, flushInterval: 0` each event is sent immediately, and callers are
 * expected to `await client.shutdown()` when done.
 *
 * Named `create*` rather than `get*` because the previous name implied a cached
 * instance that never existed.
 */
export function createPostHogClient(): PostHog {
  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN

  if (!token) {
    if (process.env.NODE_ENV === 'development') {
      console.error(
        'NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is configured'
      )
    }
  }

  return new PostHog(token ?? '', {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com',
    flushAt: 1,
    flushInterval: 0,
  })
}
