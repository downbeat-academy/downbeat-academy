import { z } from 'zod'

export const signUpSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters'),
})

export type TSignUpFormSchema = z.infer<typeof signUpSchema>