import { describe, expect, it } from 'vitest'
import { resetPasswordSchema } from '../reset-password-schema'

describe('resetPasswordSchema', () => {
	it('accepts a valid email', () => {
		expect(
			resetPasswordSchema.safeParse({ email: 'user@example.com' }).success
		).toBe(true)
	})

	it('rejects an invalid email', () => {
		const result = resetPasswordSchema.safeParse({ email: 'nope' })
		expect(result.success).toBe(false)
		expect(result.success ? [] : result.error.issues.map((i) => i.message)).toContain(
			'Invalid email address'
		)
	})

	it('rejects an empty email', () => {
		expect(resetPasswordSchema.safeParse({ email: '' }).success).toBe(false)
	})
})
