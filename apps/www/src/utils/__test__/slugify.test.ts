import { describe, expect, it } from 'vitest'
import { slugify } from '../slugify'

describe('slugify', () => {
	it('lowercases and joins words with dashes', () => {
		expect(slugify(['Hello World'])).toBe('hello-world')
		expect(slugify(['Hello', 'World'])).toBe('hello-world')
	})

	it('trims surrounding whitespace', () => {
		expect(slugify(['  Padded  '])).toBe('padded')
	})

	it('strips disallowed special characters', () => {
		expect(slugify(['Hello, World!'])).toBe('hello-world')
	})

	it('collapses runs of internal whitespace into a single dash', () => {
		expect(slugify(['a   b'])).toBe('a-b')
	})

	it('preserves numbers and existing hyphens', () => {
		expect(slugify(['Track 01'])).toBe('track-01')
		expect(slugify(['well-known'])).toBe('well-known')
	})

	it('strips accented characters down to their ASCII-safe remainder', () => {
		// é is not in [a-z0-9 -] so it is removed entirely (no transliteration).
		expect(slugify(['café'])).toBe('caf')
	})

	it('returns an empty string for an empty array or empty members', () => {
		expect(slugify([])).toBe('')
		expect(slugify([''])).toBe('')
	})
})
