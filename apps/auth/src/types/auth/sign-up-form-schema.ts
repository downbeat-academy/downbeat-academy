import { z } from 'zod'

export const signUpFormSchema = z.object({
	email: z.string().email('Please enter a valid email address'),
	name: z.string().min(1, 'Please enter your name'),
	password: z.string()
		.min(8, 'Password must be at least 8 characters'),
	confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords don't match",
	path: ["confirmPassword"],
})
.superRefine(({ password }, checkPassComplexity) => {
	const containsUppercase = (ch: string) => /[A-Z]/.test(ch)
	const containsLowercase = (ch: string) => /[a-z]/.test(ch)
	const containsSpecialChar = (ch: string) => /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch)

	let countOfUpperCase = 0,
		countOfLowerCase = 0,
		countOfNumbers = 0,
		countOfSpecialChar = 0

	for (let i = 0; i < password.length; i++) {
		let ch = password.charAt(i)
		if (!isNaN(+ch)) countOfNumbers++
		else if (containsUppercase(ch)) countOfUpperCase++
		else if (containsLowercase(ch)) countOfLowerCase++
		else if (containsSpecialChar(ch)) countOfSpecialChar++
	}

	if (countOfLowerCase < 1 || countOfUpperCase < 1 || countOfSpecialChar < 1 || countOfNumbers < 1) {
		checkPassComplexity.addIssue({
			code: 'custom',
			message: 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
			path: ['password'],
		})
	}
})

export type TSignUpFormSchema = z.infer<typeof signUpFormSchema>
