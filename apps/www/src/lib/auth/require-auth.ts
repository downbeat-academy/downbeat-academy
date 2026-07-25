import { cache } from 'react'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from './auth'
import { createGuards } from 'auth-permissions'

const guards = createGuards({
	auth,
	getHeaders: () => headers(),
	redirect,
})

// Each guard call is a full better-auth session lookup, and nested routes guard at more
// than one level — `/admin/users` runs `requireAdmin('/admin')` in both the admin layout
// and the page itself. Memoizing per request collapses those into one query. The path
// argument is a plain string, so repeated calls with the same path share a cache entry.
export const requireAuth = cache(guards.requireAuth)
export const requireRole = guards.requireRole
export const requireAdmin = cache(guards.requireAdmin)

/**
 * Get the current session without requiring authentication.
 * Returns null if not authenticated.
 */
export async function getOptionalSession() {
	return auth.api.getSession({
		headers: await headers(),
	})
}
