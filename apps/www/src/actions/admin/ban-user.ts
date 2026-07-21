'use server'

import { z } from 'zod'
import { headers } from 'next/headers'
import { revalidatePath, updateTag } from 'next/cache'
import { auth } from '@/lib/auth/auth'
import { requireAdmin } from '@/lib/auth/require-auth'

const BAN_REASONS_MAX = 500

const Input = z.object({
	userId: z.string().min(1),
	banReason: z.string().max(BAN_REASONS_MAX).optional(),
	banExpiresIn: z.number().int().positive().optional(),
})

export type BanUserResult = { ok: true } | { ok: false; error: string }

export async function banUser(raw: z.infer<typeof Input>): Promise<BanUserResult> {
	try {
		const session = await requireAdmin('/admin')
		const input = Input.parse(raw)
		if (input.userId === session.user.id) {
			return { ok: false, error: 'You cannot ban yourself.' }
		}
		await auth.api.banUser({
			body: {
				userId: input.userId,
				banReason: input.banReason,
				banExpiresIn: input.banExpiresIn,
			},
			headers: await headers(),
		})
		updateTag('admin:users')
		revalidatePath('/admin/users')
		return { ok: true }
	} catch (err) {
		return { ok: false, error: err instanceof Error ? err.message : 'Ban failed' }
	}
}
