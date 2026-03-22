import { ac } from './statements'

/**
 * student — Default role for all new signups.
 * Can consume content and enroll in courses but cannot create or manage anything.
 */
export const student = ac.newRole({
	content: ['read'],
	course: ['read', 'enroll'],
})

/**
 * educator — Content creators who author and publish educational material.
 * Can manage their own content, courses, and links. No user management access.
 */
export const educator = ac.newRole({
	content: ['create', 'read', 'update', 'publish'],
	course: ['create', 'read', 'update', 'publish'],
	link: ['create', 'read', 'update', 'delete'],
	newsletter: ['create', 'read'],
})

/**
 * admin — Operational managers.
 * Full content access plus user management (list, set-role, ban).
 * Cannot impersonate, delete users, or reset passwords.
 */
export const admin = ac.newRole({
	content: ['create', 'read', 'update', 'delete', 'publish'],
	course: ['create', 'read', 'update', 'delete', 'publish', 'enroll'],
	link: ['create', 'read', 'update', 'delete'],
	newsletter: ['create', 'read', 'update', 'send'],
	user: ['create', 'list', 'set-role', 'ban', 'get', 'update'],
	session: ['list', 'revoke'],
})

/**
 * superAdmin — Unrestricted access across all resources.
 * Only role that can impersonate users, delete accounts, or reset passwords.
 */
export const superAdmin = ac.newRole({
	content: ['create', 'read', 'update', 'delete', 'publish'],
	course: ['create', 'read', 'update', 'delete', 'publish', 'enroll'],
	link: ['create', 'read', 'update', 'delete'],
	newsletter: ['create', 'read', 'update', 'send'],
	user: [
		'create',
		'list',
		'set-role',
		'ban',
		'impersonate',
		'impersonate-admins',
		'delete',
		'set-password',
		'get',
		'update',
	],
	session: ['list', 'revoke', 'delete'],
})
