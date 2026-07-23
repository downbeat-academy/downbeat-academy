import { describe, expect, it } from 'vitest'
import { newsletterSignupSchema } from '../newsletter-signup-schema'

describe('newsletterSignupSchema', () => {
	it('accepts a valid email', () => {
		// `.refine((data) => data.email)` is a no-op once `.email()` passes.
		expect(
			newsletterSignupSchema.safeParse({ email: 'user@example.com' }).success
		).toBe(true)
	})

	it('rejects an invalid email', () => {
		expect(newsletterSignupSchema.safeParse({ email: 'nope' }).success).toBe(
			false
		)
	})

	it('rejects an empty email', () => {
		expect(newsletterSignupSchema.safeParse({ email: '' }).success).toBe(false)
	})
})
