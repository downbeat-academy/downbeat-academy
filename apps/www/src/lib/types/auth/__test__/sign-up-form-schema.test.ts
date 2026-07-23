import { describe, expect, it } from 'vitest'
import { signUpFormSchema } from '../sign-up-form-schema'

const base = {
	email: 'user@example.com',
	name: 'Ada Lovelace',
	password: 'Abcdef1!',
	confirmPassword: 'Abcdef1!',
}

const issuesFor = (result: ReturnType<typeof signUpFormSchema.safeParse>) =>
	result.success ? [] : result.error.issues

describe('signUpFormSchema', () => {
	it('accepts a fully valid sign-up payload', () => {
		expect(signUpFormSchema.safeParse(base).success).toBe(true)
	})

	it('rejects an invalid email with a friendly message', () => {
		const result = signUpFormSchema.safeParse({ ...base, email: 'nope' })
		expect(result.success).toBe(false)
		expect(issuesFor(result).map((i) => i.message)).toContain(
			'Please enter a valid email address'
		)
	})

	it('rejects an empty name', () => {
		const result = signUpFormSchema.safeParse({ ...base, name: '' })
		expect(result.success).toBe(false)
		expect(issuesFor(result).map((i) => i.message)).toContain(
			'Please enter your name'
		)
	})

	it('flags mismatched passwords on the confirmPassword path', () => {
		const result = signUpFormSchema.safeParse({
			...base,
			confirmPassword: 'Different1!',
		})
		expect(result.success).toBe(false)
		const issue = issuesFor(result).find((i) => i.path[0] === 'confirmPassword')
		expect(issue?.message).toBe("Passwords don't match")
	})

	it('rejects a password shorter than 8 characters', () => {
		const result = signUpFormSchema.safeParse({
			...base,
			password: 'Ab1!',
			confirmPassword: 'Ab1!',
		})
		expect(result.success).toBe(false)
		expect(issuesFor(result).map((i) => i.message)).toContain(
			'Password must be at least 8 characters'
		)
	})

	describe('password complexity (superRefine)', () => {
		const complexityMessage =
			'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.'

		const expectComplexityFailure = (password: string) => {
			const result = signUpFormSchema.safeParse({
				...base,
				password,
				confirmPassword: password,
			})
			expect(result.success).toBe(false)
			const issue = issuesFor(result).find((i) => i.path[0] === 'password')
			expect(issue?.message).toBe(complexityMessage)
		}

		it('requires an uppercase letter', () => expectComplexityFailure('abcdef1!'))
		it('requires a lowercase letter', () => expectComplexityFailure('ABCDEF1!'))
		it('requires a number', () => expectComplexityFailure('Abcdefg!'))
		it('requires a special character', () => expectComplexityFailure('Abcdefg1'))
	})

	it('documents that a space is counted as a number by the complexity check', () => {
		// `!isNaN(+ch)` treats a space as 0 (a number), so a space satisfies the
		// "contains a number" rule even though there is no digit. This is a latent
		// quirk in the validator preserved here intentionally.
		const password = 'Abcdef !'
		const result = signUpFormSchema.safeParse({
			...base,
			password,
			confirmPassword: password,
		})
		expect(result.success).toBe(true)
	})
})
