import type { Role } from './types'
import { ADMIN_ROLES } from './types'

/**
 * Check if a session's user has one of the allowed roles.
 * Pure function — no server call, works client-side.
 */
export function hasRole(
	session: { user?: { role?: string } } | null | undefined,
	allowedRoles: Role[]
): boolean {
	const userRole = session?.user?.role as Role | undefined
	return !!userRole && allowedRoles.includes(userRole)
}

/**
 * Check if a session's user has admin access (admin or superAdmin).
 */
export function isAdmin(
	session: { user?: { role?: string } } | null | undefined
): boolean {
	return hasRole(session, [...ADMIN_ROLES])
}
