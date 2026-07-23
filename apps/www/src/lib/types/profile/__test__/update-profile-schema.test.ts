import { describe, expect, it } from 'vitest'
import { updateProfileSchema } from '../update-profile-schema'

describe('updateProfileSchema', () => {
	it('accepts any string name, including an empty string', () => {
		// `name` is an unconstrained `z.string()`, so empty is currently valid.
		expect(updateProfileSchema.safeParse({ name: 'Ada' }).success).toBe(true)
		expect(updateProfileSchema.safeParse({ name: '' }).success).toBe(true)
	})

	it('rejects a non-string name', () => {
		const result = updateProfileSchema.safeParse({ name: 123 as unknown as string })
		expect(result.success).toBe(false)
	})

	it('rejects a missing name', () => {
		const result = updateProfileSchema.safeParse({})
		expect(result.success).toBe(false)
	})
})
