import { describe, expect, it } from 'vitest'
import { loginSchema } from '../login-form-schema'

const messages = (result: ReturnType<typeof loginSchema.safeParse>) =>
	result.success ? [] : result.error.issues.map((i) => i.message)

describe('loginSchema', () => {
	it('accepts a valid email and password', () => {
		const result = loginSchema.safeParse({
			email: 'user@example.com',
			password: 'password123',
		})
		expect(result.success).toBe(true)
	})

	it('rejects an invalid email format', () => {
		const result = loginSchema.safeParse({
			email: 'not-an-email',
			password: 'password123',
		})
		expect(result.success).toBe(false)
		expect(messages(result)).toContain('Invalid email address')
	})

	it('rejects an empty email', () => {
		const result = loginSchema.safeParse({ email: '', password: 'password123' })
		expect(result.success).toBe(false)
	})

	it('rejects a password shorter than 8 characters', () => {
		const result = loginSchema.safeParse({
			email: 'user@example.com',
			password: '1234567',
		})
		expect(result.success).toBe(false)
		expect(messages(result)).toContain('Password must be at least 8 characters')
	})

	it('rejects an empty password', () => {
		const result = loginSchema.safeParse({
			email: 'user@example.com',
			password: '',
		})
		expect(result.success).toBe(false)
		expect(messages(result)).toContain('Password is required')
	})
})
