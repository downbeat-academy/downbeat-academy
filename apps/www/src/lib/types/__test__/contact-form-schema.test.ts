import { describe, expect, it } from 'vitest'
import { contactFormSchema } from '../contact-form-schema'

const base = {
	name: 'Ada Lovelace',
	email: 'ada@example.com',
	message: 'Hello there!',
}

const messages = (result: ReturnType<typeof contactFormSchema.safeParse>) =>
	result.success ? [] : result.error.issues.map((i) => i.message)

describe('contactFormSchema', () => {
	it('accepts a fully populated form', () => {
		// The trailing `.refine((data) => data.name && data.email && data.message)`
		// is a redundant no-op here: the inner `.min(1)` checks already guarantee
		// all three fields are non-empty, so the refine never adds a failure.
		expect(contactFormSchema.safeParse(base).success).toBe(true)
	})

	it('requires a name', () => {
		const result = contactFormSchema.safeParse({ ...base, name: '' })
		expect(result.success).toBe(false)
		expect(messages(result)).toContain('Name is required')
	})

	it('requires an email', () => {
		const result = contactFormSchema.safeParse({ ...base, email: '' })
		expect(result.success).toBe(false)
		expect(messages(result)).toContain('Email is required')
	})

	it('requires a valid email format', () => {
		const result = contactFormSchema.safeParse({ ...base, email: 'not-email' })
		expect(result.success).toBe(false)
	})

	it('requires a message', () => {
		const result = contactFormSchema.safeParse({ ...base, message: '' })
		expect(result.success).toBe(false)
		expect(messages(result)).toContain('Message is required')
	})
})
