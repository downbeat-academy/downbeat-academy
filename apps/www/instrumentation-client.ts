import posthog from 'posthog-js'

import {
	POSTHOG_ALLOWED_HOSTS,
	shouldInitPostHog,
} from './src/lib/posthog/config'

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
		// PostHog owns error tracking: uncaught errors and unhandled rejections
		// are sent as `$exception` events. Server-side errors are captured
		// separately by `onRequestError` in instrumentation.ts.
		capture_exceptions: true,
		debug: posthogDebug,
	})

	// In debug mode only, put the instance on `window`. The module build of
	// posthog-js does not do this (only the CDN snippet does), and without it
	// there is no way to inspect capture calls — from the browser console
	// during manual QA, or from Cypress. Not exposed in production.
	if (posthogDebug) {
		;(window as typeof window & { posthog?: typeof posthog }).posthog = posthog
	}
} else if (process.env.NODE_ENV === 'development') {
	console.info(
		posthogToken
			? `[posthog] not initialised on "${window.location.hostname}" — capture is restricted to ${POSTHOG_ALLOWED_HOSTS.join(', ')}. Set NEXT_PUBLIC_POSTHOG_DEBUG=true to capture from here.`
			: '[posthog] NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is not set — no events will be captured.'
	)
}