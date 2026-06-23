import { describe, expect, it } from 'vitest'
import { transformAccidental } from '../transform-primitive'

describe('transformAccidental', () => {
	it('maps known accidentals to their music symbols', () => {
		expect(transformAccidental('flat')).toBe('𝄭')
		expect(transformAccidental('double-flat')).toBe('𝄫')
		expect(transformAccidental('double-sharp')).toBe('𝄪')
		expect(transformAccidental('natural')).toBe('♮')
	})

	it('maps "sharp" to the sharp symbol', () => {
		// Regression for the `case 'share'` typo: the public key is "sharp".
		expect(transformAccidental('sharp')).toBe('𝄰')
	})

	it('returns null for an unsupported accidental', () => {
		// Regression for the missing `return` in the default branch.
		expect(transformAccidental('not-an-accidental')).toBeNull()
	})
})
