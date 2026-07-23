import { describe, expect, it } from 'vitest'
import { updateEmailSchema } from '../update-email-schema'

describe('updateEmailSchema', () => {
	it('accepts a valid email', () => {
		expect(
			updateEmailSchema.safeParse({ email: 'user@example.com' }).success
		).toBe(true)
	})

	it('rejects an invalid email', () => {
		expect(updateEmailSchema.safeParse({ email: 'bad' }).success).toBe(false)
	})

	it('rejects an empty email', () => {
		expect(updateEmailSchema.safeParse({ email: '' }).success).toBe(false)
	})
})
