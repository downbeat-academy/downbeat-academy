import { z } from 'zod'

export const signUpSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }).min(8, { message: 'Password must be at least 8 characters' }),
})

export type TSignUpFormSchema = z.infer<typeof signUpSchema>