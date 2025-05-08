import { z } from 'zod'

export const newsletterSignupSchema = z
	.object({
		email: z.string().email(),
	})
	.refine((data) => data.email)

export type TNewsletterSignupSchema = z.infer<typeof newsletterSignupSchema>
