import * as Sentry from '@sentry/nextjs'

export function register() {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,

    // uncomment the line below to enable Spotlight (https://spotlightjs.com)
    // spotlight: process.env.NODE_ENV === 'development',
  })
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