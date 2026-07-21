'use server'

import { z } from 'zod'
import { and, count, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath, revalidateTag } from 'next/cache'
import { auth } from '@/lib/auth/auth'
import { requireAdmin } from '@/lib/auth/require-auth'
import { authDb } from '@/lib/db/drizzle'
import { user } from '@/lib/db/schema/auth'
import { ROLES, type Role } from '@/lib/auth/permissions'

const Input = z.object({
	userId: z.string().min(1),
	role: z.enum(ROLES as unknown as readonly [Role, ...Role[]]),
})

export type SetRoleResult = { ok: true } | { ok: false; error: string }

export async function setRole(raw: z.infer<typeof Input>): Promise<SetRoleResult> {
	try {
		const session = await requireAdmin('/admin')
		const input = Input.parse(raw)

		if (input.userId === session.user.id) {
			return { ok: false, error: 'You cannot change your own role.' }
		}

		// Guard: prevent demoting the last superAdmin
		const [target] = await authDb
			.select({ id: user.id, role: user.role })
			.from(user)
			.where(eq(user.id, input.userId))
			.limit(1)

		if (!target) {
			return { ok: false, error: 'User not found.' }
		}

		if (target.role === 'superAdmin' && input.role !== 'superAdmin') {
			const [superAdminCount] = await authDb
				.select({ value: count() })
				.from(user)
				.where(and(eq(user.role, 'superAdmin')))
			if ((superAdminCount?.value ?? 0) <= 1) {
				return {
					ok: false,
					error: 'Cannot demote the last super admin. Promote another user first.',
				}
			}
		}

		await auth.api.setRole({
			body: { userId: input.userId, role: input.role },
			headers: await headers(),
		})
		revalidateTag('admin:users')
		revalidatePath('/admin/users')
		return { ok: true }
	} catch (err) {
		return { ok: false, error: err instanceof Error ? err.message : 'Role change failed' }
	}
}
