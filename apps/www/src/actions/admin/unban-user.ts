'use server'

import { z } from 'zod'
import { headers } from 'next/headers'
import { revalidatePath, updateTag } from 'next/cache'
import { auth } from '@/lib/auth/auth'
import { requireAdmin } from '@/lib/auth/require-auth'
import type { UnbanUserResult } from './types'

const Input = z.object({
	userId: z.string().min(1),
})

export async function unbanUser(raw: z.infer<typeof Input>): Promise<UnbanUserResult> {
	try {
		await requireAdmin('/admin')
		const input = Input.parse(raw)
		await auth.api.unbanUser({
			body: { userId: input.userId },
			headers: await headers(),
		})
		updateTag('admin:users')
		revalidatePath('/admin/users')
		return { ok: true }
	} catch (err) {
		return { ok: false, error: err instanceof Error ? err.message : 'Unban failed' }
	}
}
