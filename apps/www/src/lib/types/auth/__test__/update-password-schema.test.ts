import { describe, expect, it } from 'vitest'
import { updatePasswordSchema } from '../update-password-schema'

const base = {
	newPassword: 'Abcdef1!',
	confirmNewPassword: 'Abcdef1!',
}

const issuesFor = (result: ReturnType<typeof updatePasswordSchema.safeParse>) =>
	result.success ? [] : result.error.issues

describe('updatePasswordSchema', () => {
	it('accepts a valid, matching, complex password', () => {
		expect(updatePasswordSchema.safeParse(base).success).toBe(true)
	})

	it('maps the mismatch error to the confirmNewPassword field', () => {
		// Regression for the refine path fix: the error must point at the real field
		// (`confirmNewPassword`), not the non-existent `confirmPassword`.
		const result = updatePasswordSchema.safeParse({
			...base,
			confirmNewPassword: 'Different1!',
		})
		expect(result.success).toBe(false)
		const issue = issuesFor(result).find(
			(i) => i.message === 'Passwords do not match'
		)
		expect(issue?.path).toEqual(['confirmNewPassword'])
	})

	it('enforces password complexity on newPassword', () => {
		const result = updatePasswordSchema.safeParse({
			newPassword: 'abcdefg1',
			confirmNewPassword: 'abcdefg1',
		})
		expect(result.success).toBe(false)
		const issue = issuesFor(result).find((i) => i.path[0] === 'newPassword')
		expect(issue?.message).toContain('Password must include')
	})
})
