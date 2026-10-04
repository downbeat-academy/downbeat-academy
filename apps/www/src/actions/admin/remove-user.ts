'use server'

import { z } from 'zod'
import { headers } from 'next/headers'
import { revalidatePath, updateTag } from 'next/cache'
import { auth } from '@/lib/auth/auth'
import { requireAdmin } from '@/lib/auth/require-auth'
import { deletePostHogPerson } from '@/lib/posthog/persons'
import { captureServerEvent } from '@/lib/posthog/server'
import type { RemoveUserResult } from './types'

const Input = z.object({
	userId: z.string().min(1),
})

/**
 * Permanently deletes a user. superAdmin only.
 *
 * better-auth's `removeUser` deletes the user and cascades to their sessions
 * and accounts. The PostHog person is removed separately, and that cleanup is
 * best-effort: once the account is gone the deletion has happened, so a
 * PostHog failure is logged rather than reported as a failed delete.
 */
export async function removeUser(raw: z.infer<typeof Input>): Promise<RemoveUserResult> {
	try {
		const session = await requireAdmin('/admin')
		// `requireAdmin` admits plain admins too. better-auth would refuse them on
		// `removeUser`, but check here so they get a clear message, not an API error.
		if (session.user.role !== 'superAdmin') {
			return { ok: false, error: 'Only super admins can delete users.' }
		}
		const input = Input.parse(raw)
		if (input.userId === session.user.id) {
			return { ok: false, error: 'You cannot delete your own account.' }
		}

		await auth.api.removeUser({
			body: { userId: input.userId },
			headers: await headers(),
		})

		const cleanup = await deletePostHogPerson(input.userId)
		if (cleanup.status === 'failed') {
			console.error(`PostHog person cleanup failed for ${input.userId}: ${cleanup.error}`)
		}

		captureServerEvent({
			distinctId: session.user.id,
			event: 'account_deleted',
			properties: { method: 'admin', deleted_user_id: input.userId },
		})

		updateTag('admin:users')
		revalidatePath('/admin/users')
		return { ok: true }
	} catch (err) {
		// better-auth and zod messages are not written for this dialog; log them, show a plain one.
		console.error('removeUser failed:', err)
		return { ok: false, error: 'Could not delete this user. Try again, or check the server logs.' }
	}
}
