import { beforeEach, describe, expect, it } from 'vitest'
import {
	resetNotationRenderTracking,
	shouldCaptureNotationRender,
} from '../notation-analytics'

describe('shouldCaptureNotationRender', () => {
	beforeEach(() => {
		resetNotationRenderTracking()
	})

	it('captures the first render of a page', () => {
		expect(shouldCaptureNotationRender('moments-notice')).toBe(true)
	})

	// The transpose regression. Each key is a separate MusicXML file, so a
	// guard keyed on the file counted every key change as a new view. In
	// production this fired 19-31 times in a single session on one slug.
	it('does not capture again when the reader transposes', () => {
		expect(shouldCaptureNotationRender('moments-notice')).toBe(true)
		expect(shouldCaptureNotationRender('moments-notice')).toBe(false)
		expect(shouldCaptureNotationRender('moments-notice')).toBe(false)
	})

	// Every excerpt mounts its own OSMD component. Before the guard moved to
	// module scope, each fired once and all six carried the same slug.
	it('captures once for a page carrying several excerpts', () => {
		const excerpts = [true, false, false, false, false, false]

		expect(
			excerpts.map(() => shouldCaptureNotationRender('moments-notice'))
		).toEqual(excerpts)
	})

	// App Router keeps the module alive across client navigations, so leaving
	// a page and coming back has to count as a new view.
	it('captures again after navigating away and back', () => {
		expect(shouldCaptureNotationRender('moments-notice')).toBe(true)
		expect(shouldCaptureNotationRender('blue-train')).toBe(true)
		expect(shouldCaptureNotationRender('moments-notice')).toBe(true)
	})

	// An event with an empty slug charts as a plausible value that is wrong,
	// which is worse than no event at all.
	it('never captures without a slug', () => {
		expect(shouldCaptureNotationRender(null)).toBe(false)
		expect(shouldCaptureNotationRender('')).toBe(false)
	})
})
