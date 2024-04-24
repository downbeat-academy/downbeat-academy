import { z } from 'zod'

export const updateEmailSchema = z.object({
	email: z.string().email('Invalid email address').min(1, 'Email is required'),
})

export type TUpdateEmailSchema = z.infer<typeof updateEmailSchema>
