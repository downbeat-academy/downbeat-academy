import { describe, expect, it } from 'vitest'
import { toKebabCase } from '../stringFormat'

describe('toKebabCase', () => {
	it('converts camelCase to kebab-case', () => {
		expect(toKebabCase('camelCase')).toBe('camel-case')
	})

	it('converts PascalCase to kebab-case', () => {
		expect(toKebabCase('PascalCase')).toBe('pascal-case')
	})

	it('handles consecutive capitals (acronyms)', () => {
		// Pins the actual behavior of the acronym branch in the regex.
		expect(toKebabCase('getHTTPResponse')).toBe('get-http-response')
	})

	it('splits trailing digits with the preceding word', () => {
		expect(toKebabCase('item1')).toBe('item1')
		expect(toKebabCase('itemNumber2')).toBe('item-number2')
	})

	it('leaves an already-kebab string intact', () => {
		expect(toKebabCase('already-kebab')).toBe('already-kebab')
	})

	it('returns the original string when there is nothing to match', () => {
		expect(toKebabCase('!!!')).toBe('!!!')
		expect(toKebabCase('')).toBe('')
	})

	it('handles a single character', () => {
		expect(toKebabCase('a')).toBe('a')
		expect(toKebabCase('A')).toBe('a')
	})
})
