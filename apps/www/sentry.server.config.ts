// This file configures the initialization of Sentry on the Node.js server runtime.
// It is loaded by `register()` in instrumentation.ts.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

const isProduction = process.env.NODE_ENV === 'production'

Sentry.init({
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

	// Without this the server SDK guesses, so local runs get filed alongside real
	// traffic. Mirrors instrumentation-client.ts.
	environment: process.env.PROJECT_ENVIRONMENT ?? process.env.NODE_ENV,

	// Sampling every local request both burns quota and distorts performance triage:
	// a dev machine talks to the remote database over the internet, so its spans run
	// roughly an order of magnitude slower than production and trip detectors that
	// production would not.
	tracesSampleRate: isProduction ? 1 : 0.1,

	// Setting this option to true will print useful information to the console while you're setting up Sentry.
	debug: false,

	// uncomment the line below to enable Spotlight (https://spotlightjs.com)
	// spotlight: process.env.NODE_ENV === 'development',
})
