import { afterEach, describe, expect, it, vi } from 'vitest'
import { prettyDate } from '../dateFormat'

describe('prettyDate', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('formats a valid ISO date with the default format', () => {
		expect(prettyDate('2026-06-10')).toBe('June 10th, 2026')
	})

	it('honors a custom format string', () => {
		expect(prettyDate('2026-06-10', 'yyyy-MM-dd')).toBe('2026-06-10')
		expect(prettyDate('2026-06-10', 'MMM yyyy')).toBe('Jun 2026')
	})

	it('returns an empty string for falsy input', () => {
		expect(prettyDate('')).toBe('')
		expect(prettyDate(null)).toBe('')
		expect(prettyDate(undefined)).toBe('')
	})

	it('returns an empty string and logs for an unparseable date', () => {
		const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
		expect(prettyDate('not-a-date')).toBe('')
		expect(errorSpy).toHaveBeenCalled()
	})

	it('renders correct ordinal suffixes across boundaries', () => {
		expect(prettyDate('2026-06-01')).toBe('June 1st, 2026')
		expect(prettyDate('2026-06-02')).toBe('June 2nd, 2026')
		expect(prettyDate('2026-06-03')).toBe('June 3rd, 2026')
		expect(prettyDate('2026-06-11')).toBe('June 11th, 2026')
		expect(prettyDate('2026-06-21')).toBe('June 21st, 2026')
	})

	it('handles a leap day', () => {
		expect(prettyDate('2024-02-29')).toBe('February 29th, 2024')
	})
})
