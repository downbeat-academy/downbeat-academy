import { describe, expect, it } from 'vitest'
import { getOgTitle, limitDescription } from '../metaHelpers'

describe('getOgTitle', () => {
	it('appends the Downbeat Academy suffix', () => {
		expect(getOgTitle('Learning Rhythm')).toBe(
			'Learning Rhythm ♪ Downbeat Academy'
		)
	})

	it('handles an empty title', () => {
		expect(getOgTitle('')).toBe(' ♪ Downbeat Academy')
	})
})

describe('limitDescription', () => {
	it('returns short descriptions unchanged', () => {
		const short = 'A concise description.'
		expect(limitDescription(short)).toBe(short)
	})

	it('returns an empty string unchanged', () => {
		expect(limitDescription('')).toBe('')
	})

	it('truncates descriptions longer than 200 characters to 200 characters', () => {
		const long = 'a'.repeat(250)
		const result = limitDescription(long)
		expect(result).toHaveLength(200)
		expect(result).toBe('a'.repeat(200))
	})

	it('keeps a description of exactly 200 characters unchanged', () => {
		const exact = 'b'.repeat(200)
		expect(limitDescription(exact)).toBe(exact)
	})
})
