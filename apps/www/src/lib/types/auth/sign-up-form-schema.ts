import { z } from 'zod'

export const signUpFormSchema = z.object({
	email: z.string().email('Please enter a valid email address'),
	name: z.string().min(1, 'Please enter your name'),
	password: z.string().min(8, 'Password must be at least 8 characters'),
	confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords don't match",
	path: ["confirmPassword"],
})

export type TSignUpFormSchema = z.infer<typeof signUpFormSchema>
