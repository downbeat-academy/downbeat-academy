'use client'

import { useSyncExternalStore } from 'react'

import { readConsent, subscribeToConsent, type ConsentStatus } from './consent'

/**
 * The visitor's consent status, kept current as it changes.
 *
 * `undefined` during server rendering and hydration: the choice lives in a
 * cookie that the root layout deliberately does not read, because calling
 * `cookies()` there would make every page dynamic. Treat `undefined` as
 * "not known yet" — neither show the banner nor identify.
 */
export function useAnalyticsConsent(): ConsentStatus | undefined {
	return useSyncExternalStore<ConsentStatus | undefined>(
		subscribeToConsent,
		readConsent,
		() => undefined
	)
}
