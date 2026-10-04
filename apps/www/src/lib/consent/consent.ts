/**
 * The visitor's analytics-cookie choice, stored on this device.
 *
 * This is the single source of truth for consent. PostHog keeps its own
 * consent flag too, but `posthog.reset()` wipes it on sign-out and PostHog only
 * initialises on the production hosts, so it cannot be the record — it is kept
 * in step with this one by `applyPostHogConsent` in `src/lib/posthog/consent.ts`.
 *
 * Changes are broadcast as a DOM event on `window` rather than through module
 * state, so `instrumentation-client.ts` and React components see the same
 * change without depending on sharing one module instance.
 */

export type ConsentStatus = 'granted' | 'denied' | 'pending'

export type ConsentDecision = Exclude<ConsentStatus, 'pending'>

export const CONSENT_COOKIE = 'dba_analytics_consent'

/** Fired on `window` with the new `ConsentStatus` as `detail`. */
export const CONSENT_CHANGE_EVENT = 'dba:consent-change'

/** Fired on `window` to reopen the banner, from the footer's "Cookie settings". */
export const CONSENT_OPEN_EVENT = 'dba:consent-open'

/** Twelve months, after which the visitor is asked again. */
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365

export function parseConsent(cookieString: string): ConsentStatus {
	const value = cookieString
		.split(';')
		.map((part) => part.trim())
		.find((part) => part.startsWith(`${CONSENT_COOKIE}=`))
		?.slice(CONSENT_COOKIE.length + 1)

	return value === 'granted' || value === 'denied' ? value : 'pending'
}

export function readConsent(): ConsentStatus {
	if (typeof document === 'undefined') return 'pending'
	return parseConsent(document.cookie)
}

export function writeConsent(decision: ConsentDecision): void {
	const secure = window.location.protocol === 'https:' ? '; Secure' : ''
	document.cookie = `${CONSENT_COOKIE}=${decision}; Max-Age=${CONSENT_MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`

	window.dispatchEvent(
		new CustomEvent<ConsentStatus>(CONSENT_CHANGE_EVENT, { detail: decision })
	)
}

export function subscribeToConsent(
	listener: (status: ConsentStatus) => void
): () => void {
	const handler = (event: Event) =>
		listener((event as CustomEvent<ConsentStatus>).detail)

	window.addEventListener(CONSENT_CHANGE_EVENT, handler)
	return () => window.removeEventListener(CONSENT_CHANGE_EVENT, handler)
}

export function openConsentSettings(): void {
	window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))
}

export function subscribeToConsentSettings(listener: () => void): () => void {
	window.addEventListener(CONSENT_OPEN_EVENT, listener)
	return () => window.removeEventListener(CONSENT_OPEN_EVENT, listener)
}
