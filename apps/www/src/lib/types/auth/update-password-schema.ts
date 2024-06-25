import { z } from 'zod'

export const updatePasswordSchema = z
	.object({
		newPassword: z.string().min(1, 'New password is required'),
		confirmNewPassword: z.string(),
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})
	.superRefine(({ newPassword }, checkPassComplexity) => {
		const containsUppercase = (ch: string) => /[A-Z]/.test(ch)
		const containsLowercase = (ch: string) => /[a-z]/.test(ch)
		const containsSpecialChar = (ch: string) =>
			/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch)
		let countOfUpperCase = 0,
			countOfLowerCase = 0,
			countOfNumbers = 0,
			countOfSpecialChar = 0
		for (let i = 0; i < newPassword.length; i++) {
			let ch = newPassword.charAt(i)
			if (!isNaN(+ch)) countOfNumbers++
			else if (containsUppercase(ch)) countOfUpperCase++
			else if (containsLowercase(ch)) countOfLowerCase++
			else if (containsSpecialChar(ch)) countOfSpecialChar++
		}
		if (
			countOfLowerCase < 1 ||
			countOfUpperCase < 1 ||
			countOfSpecialChar < 1 ||
			countOfNumbers < 1
		) {
			checkPassComplexity.addIssue({
				code: 'custom',
				message:
					'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
				path: ['newPassword'],
			})
		}
	})

export type TUpdatePasswordSchema = z.infer<typeof updatePasswordSchema>
