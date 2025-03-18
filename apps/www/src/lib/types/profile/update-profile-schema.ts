import { z } from 'zod'

export const updateProfileSchema = z.object({
	name: z.string(),
})

export type TUpdateProfileSchema = z.infer<typeof updateProfileSchema>
