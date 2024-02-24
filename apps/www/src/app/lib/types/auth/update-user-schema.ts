import { z } from 'zod'

export const updateUserSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters'),
  name: z.string(),
});

export type TUpdateUserSchema = z.infer<typeof updateUserSchema>