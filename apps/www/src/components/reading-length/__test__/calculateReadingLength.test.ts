import { describe, expect, it } from 'vitest'
import calculateReadingLength from '../calculateReadingLength'

describe('calculateReadingLength', () => {
	it('returns 1 for empty or invalid content', () => {
		expect(calculateReadingLength(null)).toBe(1)
		expect(calculateReadingLength(undefined)).toBe(1)
		expect(calculateReadingLength('')).toBe(1)
	})

	it('returns 1 for non-string, non-array content', () => {
		// e.g. a number sneaking through — falls past the string and array guards.
		expect(calculateReadingLength(42 as never)).toBe(1)
	})

	describe('string content', () => {
		it('rounds up words / 200 with a minimum of 1', () => {
			expect(calculateReadingLength('hello world')).toBe(1)
			expect(calculateReadingLength(`${'word '.repeat(200).trim()}`)).toBe(1)
			expect(calculateReadingLength(`${'word '.repeat(201).trim()}`)).toBe(2)
			expect(calculateReadingLength(`${'word '.repeat(400).trim()}`)).toBe(2)
		})

		it('treats whitespace-only content as a single minute', () => {
			expect(calculateReadingLength('     ')).toBe(1)
		})
	})

	describe('block content', () => {
		it('reads text from children arrays', () => {
			const content = [
				{ _type: 'block', children: [{ text: 'hello' }, { text: 'world' }] },
			]
			expect(calculateReadingLength(content)).toBe(1)
		})

		it('reads text from a singular child', () => {
			expect(
				calculateReadingLength([{ _type: 'block', child: { text: 'foo bar' } }])
			).toBe(1)
		})

		it('reads text from a direct text property', () => {
			expect(calculateReadingLength([{ _type: 'block', text: 'baz' }])).toBe(1)
		})

		it('ignores non-block nodes', () => {
			const content = [
				{ _type: 'image' },
				{ _type: 'block', children: [{ text: 'just one block' }] },
			]
			expect(calculateReadingLength(content)).toBe(1)
		})

		it('returns 1 for an empty array', () => {
			expect(calculateReadingLength([])).toBe(1)
		})

		it('rounds up long block content', () => {
			const content = [
				{
					_type: 'block',
					children: Array.from({ length: 201 }, () => ({ text: 'word' })),
				},
			]
			expect(calculateReadingLength(content)).toBe(2)
		})
	})
})
