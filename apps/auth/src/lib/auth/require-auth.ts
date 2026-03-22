import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from './auth'
import { createGuards } from 'auth-permissions'

const guards = createGuards({
	auth,
	getHeaders: () => headers(),
	redirect,
})

export const requireAuth = guards.requireAuth
export const requireRole = guards.requireRole
export const requireAdmin = guards.requireAdmin

/**
 * Get the current session without requiring authentication.
 * Returns null if not authenticated.
 */
export async function getOptionalSession() {
	return auth.api.getSession({
		headers: await headers(),
	})
}
