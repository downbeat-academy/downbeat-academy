// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'
import posthog from 'posthog-js'

import {
	POSTHOG_ALLOWED_HOSTS,
	shouldInitPostHog,
} from './src/lib/posthog/config'

Sentry.init({
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
	environment: process.env.PROJECT_ENVIRONMENT,

	// Adjust this value in production, or use tracesSampler for greater control
	tracesSampleRate: 1,

	// Setting this option to true will print useful information to the console while you're setting up Sentry.
	debug: false,

	replaysOnErrorSampleRate: 1.0,

	// This sets the sample rate to be 10%. You may want this to be 100% while
	// in development and sample at a lower rate in production
	replaysSessionSampleRate: 0.1,

	// Filter out non-actionable resource loading errors (e.g. font/stylesheet failures)
	beforeSend(event) {
		const message = event.exception?.values?.[0]?.value ?? ''
		const target = (event.extra?.target as string) ?? ''

		if (message === '<unknown>' && target.includes('head > link')) {
			return null
		}

		return event
	},

	// You can remove this option if you're not planning to use the Sentry Session Replay feature:
	integrations: [
		Sentry.replayIntegration({
			// Additional Replay configuration goes in here, for example:
			maskAllText: true,
			blockAllMedia: true,
		}),
	],
})

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart

const posthogToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
const posthogDebug = process.env.NEXT_PUBLIC_POSTHOG_DEBUG === 'true'

if (
	shouldInitPostHog({
		hostname: window.location.hostname,
		token: posthogToken,
		forceEnable: posthogDebug,
	})
) {
	posthog.init(posthogToken as string, {
		api_host: '/ingest',
		ui_host: 'https://us.posthog.com',
		defaults: '2026-01-30',
		// Sentry owns exception capture. Running both pipelines duplicates every
		// error across two vendors — see docs/architecture/infrastructure.md.
		capture_exceptions: false,
		debug: posthogDebug,
	})
} else if (process.env.NODE_ENV === 'development') {
	console.info(
		posthogToken
			? `[posthog] not initialised on "${window.location.hostname}" — capture is restricted to ${POSTHOG_ALLOWED_HOSTS.join(', ')}. Set NEXT_PUBLIC_POSTHOG_DEBUG=true to capture from here.`
			: '[posthog] NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is not set — no events will be captured.'
	)
}