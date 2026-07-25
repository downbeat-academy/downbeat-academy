import * as Sentry from '@sentry/nextjs'

// Load the per-runtime config rather than initialising inline. sentry.edge.config.ts
// existed but nothing imported it, so edge-runtime errors went unreported.
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config')
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config')
  }
}

// Messages that represent expected infrastructure behaviour, not application bugs.
const IGNORED_SERVER_ERRORS = [
  // Client has a stale bundle from a previous deployment and POSTs a Server
  // Action ID that no longer exists. Next.js throws this; nothing we can fix.
  'Failed to find Server Action',
  // Client sent a malformed FormData body — same root cause as above.
  'Failed to parse body as FormData',
  // TCP-level abort: the client disconnected before the response completed.
  // This is normal browser navigation behaviour, not an application error.
  'aborted',
]

export async function onRequestError(
  err: unknown,
  request: {
    url: string
    method: string
    headers: Record<string, string>
    path: string
  },
  context: {
    routerKind: string
    routePath: string
    routeType: string
  }
) {
  const message = err instanceof Error ? err.message : ''
  if (IGNORED_SERVER_ERRORS.some((ignored) => message.includes(ignored))) {
    return
  }

  await Sentry.captureRequestError(err, request, context)
}