'use server'

import { z } from 'zod'
import { headers } from 'next/headers'
import { revalidatePath, revalidateTag } from 'next/cache'
import { auth } from '@/lib/auth/auth'
import { requireAdmin } from '@/lib/auth/require-auth'

const Input = z.object({
	userId: z.string().min(1),
})

export type RevokeUserSessionsResult = { ok: true } | { ok: false; error: string }

export async function revokeUserSessions(
	raw: z.infer<typeof Input>
): Promise<RevokeUserSessionsResult> {
	try {
		const session = await requireAdmin('/admin')
		const input = Input.parse(raw)
		if (input.userId === session.user.id) {
			return { ok: false, error: 'You cannot revoke your own sessions from here.' }
		}
		await auth.api.revokeUserSessions({
			body: { userId: input.userId },
			headers: await headers(),
		})
		revalidateTag('admin:users')
		revalidatePath('/admin/users')
		return { ok: true }
	} catch (err) {
		return { ok: false, error: err instanceof Error ? err.message : 'Session revoke failed' }
	}
}
