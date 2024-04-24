import { z } from 'zod'

// Create the zod schema
export const contactFormSchema = z
	.object({
		name: z.string().min(1, 'Name is required'),
		email: z.string().min(1, 'Email is required').email(),
		message: z.string().min(1, 'Message is required'),
	})
	.refine((data) => data.name && data.email && data.message)

// Create a type from the zod schema
export type TContactFormSchema = z.infer<typeof contactFormSchema>
