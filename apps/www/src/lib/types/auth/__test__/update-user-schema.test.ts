import { describe, expect, it } from 'vitest'
import { updateUserSchema } from '../update-user-schema'

describe('updateUserSchema', () => {
	it('accepts a valid email and password', () => {
		const result = updateUserSchema.safeParse({
			email: 'user@example.com',
			password: 'password123',
		})
		expect(result.success).toBe(true)
	})

	it('rejects a password shorter than 8 characters', () => {
		const result = updateUserSchema.safeParse({
			email: 'user@example.com',
			password: 'short',
		})
		expect(result.success).toBe(false)
		expect(result.success ? [] : result.error.issues.map((i) => i.message)).toContain(
			'Password must be at least 8 characters'
		)
	})

	it('rejects an invalid email', () => {
		const result = updateUserSchema.safeParse({
			email: 'nope',
			password: 'password123',
		})
		expect(result.success).toBe(false)
	})
})
