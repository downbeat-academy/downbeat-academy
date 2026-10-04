import type { Instrumentation } from 'next'

// Server-side exception capture for PostHog error tracking. Client-side
// exceptions are captured by posthog-js — see instrumentation-client.ts.

// Messages that represent expected infrastructure behavior, not application bugs.
const IGNORED_SERVER_ERRORS = [
  // Client has a stale bundle from a previous deployment and POSTs a Server
  // Action ID that no longer exists. Next.js throws this; nothing we can fix.
  'Failed to find Server Action',
  // Client sent a malformed FormData body — same root cause as above.
  'Failed to parse body as FormData',
  // TCP-level abort: the client disconnected before the response completed.
  // This is normal browser navigation behavior, not an application error.
  'aborted',
]

export const onRequestError: Instrumentation.onRequestError = async (
  err,
  request,
  context
) => {
  // Every route in www runs on Node (proxy.ts included), and posthog-node is
  // only loaded there. Imported lazily so it stays out of any other runtime.
  if (process.env.NEXT_RUNTIME !== 'nodejs') return

  const message = err instanceof Error ? err.message : ''
  if (IGNORED_SERVER_ERRORS.some((ignored) => message.includes(ignored))) {
    return
  }

  const { getDistinctIdFromCookie, getPostHogServer } = await import(
    './src/lib/posthog/server'
  )

  const posthog = getPostHogServer()
  if (!posthog) return

  const cookie = request.headers.cookie
  const distinctId = getDistinctIdFromCookie(
    Array.isArray(cookie) ? cookie.join('; ') : cookie,
    process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
  )

  try {
    posthog.captureException(err, distinctId, {
      request_method: request.method,
      request_path: request.path,
      router_kind: context.routerKind,
      route_path: context.routePath,
      route_type: context.routeType,
      render_source: context.renderSource,
    })
  } catch {
    // Reporting an error must never raise another one.
  }
}
