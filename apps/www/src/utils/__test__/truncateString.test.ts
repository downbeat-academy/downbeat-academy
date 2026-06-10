import { describe, expect, it } from 'vitest'
import { truncateString } from '../truncateString'

describe('truncateString', () => {
	it('returns the string unchanged when shorter than the limit', () => {
		expect(truncateString('hello', 10)).toBe('hello')
	})

	it('truncates and appends an ellipsis when longer than the limit', () => {
		expect(truncateString('hello world', 5)).toBe('hello...')
	})

	it('truncates at the boundary because the comparison is strictly less-than', () => {
		// length === chars falls through to the else branch.
		expect(truncateString('hello', 5)).toBe('hello...')
	})

	it('handles an empty string', () => {
		expect(truncateString('', 5)).toBe('')
	})

	it('handles a zero-length limit', () => {
		expect(truncateString('abc', 0)).toBe('...')
	})
})
