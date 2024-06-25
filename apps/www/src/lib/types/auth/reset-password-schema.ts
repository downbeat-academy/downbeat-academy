import { z } from 'zod'

export const resetPasswordSchema = z.object({
	email: z.string().email('Invalid email address').min(1, 'Email is required'),
})

export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>
