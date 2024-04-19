import { z } from 'zod'

export const subscribeToNewsletterSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

export type TSubscribeToNewsletterSchema = z.infer<typeof subscribeToNewsletterSchema>