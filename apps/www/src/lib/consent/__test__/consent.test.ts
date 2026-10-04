import { afterEach, describe, expect, it, vi } from 'vitest'

import {
	CONSENT_COOKIE,
	CONSENT_MAX_AGE_SECONDS,
	openConsentSettings,
	parseConsent,
	readConsent,
	subscribeToConsent,
	subscribeToConsentSettings,
	writeConsent,
} from '../consent'

function clearConsentCookie() {
	document.cookie = `${CONSENT_COOKIE}=; Max-Age=0; Path=/`
}

describe('parseConsent', () => {
	it('reads a decision from among other cookies', () => {
		expect(parseConsent(`a=1; ${CONSENT_COOKIE}=granted; b=2`)).toBe('granted')
		expect(parseConsent(`${CONSENT_COOKIE}=denied`)).toBe('denied')
	})

	it('is pending without the cookie', () => {
		expect(parseConsent('')).toBe('pending')
		expect(parseConsent('a=1; b=2')).toBe('pending')
	})

	it('is pending for an unrecognised value, so a tampered cookie never grants', () => {
		expect(parseConsent(`${CONSENT_COOKIE}=yes`)).toBe('pending')
		expect(parseConsent(`${CONSENT_COOKIE}=`)).toBe('pending')
	})

	it('does not match a cookie whose name merely ends with ours', () => {
		expect(parseConsent(`x${CONSENT_COOKIE}=granted`)).toBe('pending')
	})
})

describe('writeConsent', () => {
	afterEach(clearConsentCookie)

	it('stores the decision where readConsent finds it', () => {
		expect(readConsent()).toBe('pending')

		writeConsent('granted')
		expect(readConsent()).toBe('granted')

		writeConsent('denied')
		expect(readConsent()).toBe('denied')
	})

	it('sets a first-party cookie that lasts twelve months', () => {
		const set = vi.spyOn(document, 'cookie', 'set')

		writeConsent('denied')

		const written = set.mock.calls[0][0]
		expect(written).toContain(`${CONSENT_COOKIE}=denied`)
		expect(written).toContain(`Max-Age=${CONSENT_MAX_AGE_SECONDS}`)
		expect(written).toContain('Path=/')
		expect(written).toContain('SameSite=Lax')
		expect(CONSENT_MAX_AGE_SECONDS).toBe(31_536_000)

		set.mockRestore()
	})

	it('notifies subscribers, and stops after unsubscribing', () => {
		const listener = vi.fn()
		const unsubscribe = subscribeToConsent(listener)

		writeConsent('granted')
		expect(listener).toHaveBeenCalledWith('granted')

		unsubscribe()
		writeConsent('denied')
		expect(listener).toHaveBeenCalledTimes(1)
	})
})

describe('openConsentSettings', () => {
	it('notifies settings subscribers, and stops after unsubscribing', () => {
		const listener = vi.fn()
		const unsubscribe = subscribeToConsentSettings(listener)

		openConsentSettings()
		expect(listener).toHaveBeenCalledTimes(1)

		unsubscribe()
		openConsentSettings()
		expect(listener).toHaveBeenCalledTimes(1)
	})
})
