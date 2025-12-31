import { describe, it, expect } from 'vitest'
import { generateShortCode } from './short-code'

describe('generateShortCode', () => {
	it('generates a code of 6 characters', () => {
		const code = generateShortCode()
		expect(code).toHaveLength(6)
	})

	it('only uses allowed characters (excludes ambiguous: 0, O, o, I, l, 1)', () => {
		// The allowed alphabet excludes: 0, O, o, I, l, 1
		const disallowedChars = ['0', 'O', 'o', 'I', 'l', '1']

		// Generate multiple codes to ensure the pattern holds
		for (let i = 0; i < 100; i++) {
			const code = generateShortCode()
			for (const char of disallowedChars) {
				expect(code).not.toContain(char)
			}
		}
	})

	it('generates codes using only the expected character set', () => {
		const allowedAlphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz'
		const allowedChars = new Set(allowedAlphabet.split(''))

		// Generate multiple codes to verify character set
		for (let i = 0; i < 100; i++) {
			const code = generateShortCode()
			for (const char of code) {
				expect(allowedChars.has(char)).toBe(true)
			}
		}
	})

	it('generates unique codes on consecutive calls', () => {
		const codes = new Set<string>()
		const iterations = 100

		for (let i = 0; i < iterations; i++) {
			codes.add(generateShortCode())
		}

		// All generated codes should be unique
		// With 6 characters from a 56-char alphabet, collision probability is extremely low
		expect(codes.size).toBe(iterations)
	})
})
