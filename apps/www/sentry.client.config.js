// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
	dsn:
		SENTRY_DSN ||
		'https://4a2c4b3b30f0447bb689b752d8af03fd@o312315.ingest.sentry.io/5675622',
	// Adjust this value in production, or use tracesSampler for greater control
	tracesSampleRate: 1.0,
	// ...
	// Note: if you want to override the automatic release value, do not set a
	// `release` value here - use the environment variable `SENTRY_RELEASE`, so
	// that it will also get attached to your source maps
});
