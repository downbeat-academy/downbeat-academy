'use server'

import { z } from 'zod'
import { revalidatePath, updateTag } from 'next/cache'
import { requireAdmin } from '@/lib/auth/require-auth'
import { deleteContact } from '@/actions/email/delete-contact'

const Input = z.object({
	email: z.string().email(),
})

export type RemoveSubscriberResult = { ok: true } | { ok: false; error: string }

export async function removeSubscriber(
	raw: z.infer<typeof Input>
): Promise<RemoveSubscriberResult> {
	try {
		await requireAdmin('/admin')
		const input = Input.parse(raw)
		await deleteContact({ email: input.email })
		updateTag('admin:subscribers')
		revalidatePath('/admin/subscribers')
		return { ok: true }
	} catch (err) {
		return { ok: false, error: err instanceof Error ? err.message : 'Remove failed' }
	}
}
