import { describe, expect, it } from 'vitest'
import { subscribeToNewsletterSchema } from '../subscribe-to-newsletter-schema'

const messages = (
	result: ReturnType<typeof subscribeToNewsletterSchema.safeParse>
) => (result.success ? [] : result.error.issues.map((i) => i.message))

describe('subscribeToNewsletterSchema', () => {
	it('accepts a valid email', () => {
		expect(
			subscribeToNewsletterSchema.safeParse({ email: 'user@example.com' })
				.success
		).toBe(true)
	})

	it('rejects an empty email with the required message', () => {
		const result = subscribeToNewsletterSchema.safeParse({ email: '' })
		expect(result.success).toBe(false)
		expect(messages(result)).toContain('Email is required')
	})

	it('rejects an invalid email with the invalid message', () => {
		const result = subscribeToNewsletterSchema.safeParse({ email: 'nope' })
		expect(result.success).toBe(false)
		expect(messages(result)).toContain('Invalid email address')
	})
})
