import { z } from "zod";

export const fileDownloadSchema = z.object({
  email: z.string().min(1, 'Email is required').email()
}).refine(data => data.email)

export type TFileDownloadSchema = z.infer<typeof fileDownloadSchema>