import { describe, expect, it } from 'vitest'

import { ANALYTICS_EVENT_NAMES } from '../events'
import type { AnalyticsEvent } from '../events'

/**
 * Compile-time exhaustiveness check. `satisfies readonly AnalyticsEvent[]` on
 * the array proves every entry is a real event; this proves the converse — that
 * every event in `AnalyticsEventMap` is listed. Adding an event to the map and
 * forgetting the array fails `pnpm typecheck`, not just this test.
 */
type MissingFromRegistry = Exclude<
	AnalyticsEvent,
	(typeof ANALYTICS_EVENT_NAMES)[number]
>
const _registryIsExhaustive: MissingFromRegistry extends never ? true : never =
	true
void _registryIsExhaustive

describe('analytics event taxonomy', () => {
	it('has no duplicate names', () => {
		const unique = new Set<string>(ANALYTICS_EVENT_NAMES)
		expect(unique.size).toBe(ANALYTICS_EVENT_NAMES.length)
	})

	it('uses snake_case throughout', () => {
		for (const name of ANALYTICS_EVENT_NAMES) {
			expect(name).toMatch(/^[a-z][a-z0-9]*(_[a-z0-9]+)*$/)
		}
	})

	it('does not shadow a PostHog-reserved name', () => {
		// `$pageview`, `$autocapture`, `$exception` and friends are captured by
		// the SDK. Defining our own would collide in reporting.
		for (const name of ANALYTICS_EVENT_NAMES) {
			expect(name.startsWith('$')).toBe(false)
		}
	})

	it('names events in the past tense', () => {
		// The convention is object_verb, past tense — `article_viewed`, not
		// `article_view`. Catches the most common drift when adding an event.
		//
		// Irregular verbs whose past tense is not `-ed` have to be listed. Right
		// now that is only `read` (read/read), on `article_read`.
		const irregularPastTense = ['read']

		for (const name of ANALYTICS_EVENT_NAMES) {
			const verb = name.slice(name.lastIndexOf('_') + 1)
			const isPastTense =
				verb.endsWith('ed') || irregularPastTense.includes(verb)

			expect(isPastTense, `"${name}" should be past tense`).toBe(true)
		}
	})
})
