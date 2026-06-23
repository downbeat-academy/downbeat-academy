import { describe, expect, it } from 'vitest'
import { deslugify } from '../deslugify'

describe('deslugify', () => {
	it('converts a slug to a spaced string and a sentence-cased variant', () => {
		expect(deslugify('hello-world')).toEqual({
			string: 'hello world',
			sentence: 'Hello world',
		})
	})

	it('capitalizes only the first word for the sentence form', () => {
		expect(deslugify('the-quick-brown-fox')).toEqual({
			string: 'the quick brown fox',
			sentence: 'The quick brown fox',
		})
	})

	it('handles a single-word slug', () => {
		expect(deslugify('single')).toEqual({
			string: 'single',
			sentence: 'Single',
		})
	})

	it('returns empty strings for falsy input', () => {
		expect(deslugify('')).toEqual({ string: '', sentence: '' })
		// @ts-expect-error exercising the runtime guard with a nullish value
		expect(deslugify(undefined)).toEqual({ string: '', sentence: '' })
	})

	it('preserves empty segments created by consecutive hyphens', () => {
		expect(deslugify('a--b')).toEqual({
			string: 'a  b',
			sentence: 'A  b',
		})
	})
})
