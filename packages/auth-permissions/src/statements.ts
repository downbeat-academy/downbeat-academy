import { createAccessControl } from 'better-auth/plugins/access'
import { defaultStatements } from 'better-auth/plugins/admin/access'

/**
 * Domain-specific resource statements for Downbeat Academy.
 *
 * These are merged with Better Auth's defaultStatements which provide:
 *   user: ['create', 'list', 'set-role', 'ban', 'impersonate', 'impersonate-admins', 'delete', 'set-password', 'get', 'update']
 *   session: ['list', 'revoke', 'delete']
 */
const domainStatements = {
	/** Sanity CMS content: articles, handbooks, lexicons, resources */
	content: ['create', 'read', 'update', 'delete', 'publish'],
	/** Courses and lessons */
	course: ['create', 'read', 'update', 'delete', 'publish', 'enroll'],
	/** Cadence Links */
	link: ['create', 'read', 'update', 'delete'],
	/** Email communications */
	newsletter: ['create', 'read', 'update', 'send'],
} as const

export const statements = {
	...defaultStatements,
	...domainStatements,
} as const

export const ac = createAccessControl(statements)
