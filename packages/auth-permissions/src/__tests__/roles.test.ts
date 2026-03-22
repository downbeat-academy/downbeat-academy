import { describe, it, expect } from 'vitest'
import { student, educator, admin, superAdmin, ac } from '../index'
import { hasRole, isAdmin } from '../hooks'
import { ROLES, ADMIN_ROLES, DEFAULT_ROLE } from '../types'

describe('Role definitions', () => {
	it('exports all four roles', () => {
		expect(student).toBeDefined()
		expect(educator).toBeDefined()
		expect(admin).toBeDefined()
		expect(superAdmin).toBeDefined()
	})

	it('has correct ROLES constant', () => {
		expect(ROLES).toEqual(['student', 'educator', 'admin', 'superAdmin'])
	})

	it('has correct ADMIN_ROLES constant', () => {
		expect(ADMIN_ROLES).toEqual(['admin', 'superAdmin'])
	})

	it('has student as default role', () => {
		expect(DEFAULT_ROLE).toBe('student')
	})
})

describe('Student permissions', () => {
	it('can read content', () => {
		const result = student.authorize({ content: ['read'] })
		expect(result.success).toBe(true)
	})

	it('can read and enroll in courses', () => {
		expect(student.authorize({ course: ['read'] }).success).toBe(true)
		expect(student.authorize({ course: ['enroll'] }).success).toBe(true)
	})

	it('cannot create content', () => {
		expect(student.authorize({ content: ['create'] }).success).toBe(false)
	})

	it('cannot manage users', () => {
		expect(student.authorize({ user: ['list'] }).success).toBe(false)
	})

	it('cannot manage links', () => {
		expect(student.authorize({ link: ['create'] }).success).toBe(false)
	})
})

describe('Educator permissions', () => {
	it('can create and publish content', () => {
		expect(educator.authorize({ content: ['create'] }).success).toBe(true)
		expect(educator.authorize({ content: ['publish'] }).success).toBe(true)
	})

	it('can create and publish courses', () => {
		expect(educator.authorize({ course: ['create'] }).success).toBe(true)
		expect(educator.authorize({ course: ['publish'] }).success).toBe(true)
	})

	it('can manage links', () => {
		expect(educator.authorize({ link: ['create'] }).success).toBe(true)
		expect(educator.authorize({ link: ['delete'] }).success).toBe(true)
	})

	it('cannot delete content', () => {
		expect(educator.authorize({ content: ['delete'] }).success).toBe(false)
	})

	it('cannot manage users', () => {
		expect(educator.authorize({ user: ['list'] }).success).toBe(false)
		expect(educator.authorize({ user: ['ban'] }).success).toBe(false)
	})

	it('cannot manage sessions', () => {
		expect(educator.authorize({ session: ['list'] }).success).toBe(false)
	})
})

describe('Admin permissions', () => {
	it('can manage all content', () => {
		expect(admin.authorize({ content: ['create'] }).success).toBe(true)
		expect(admin.authorize({ content: ['delete'] }).success).toBe(true)
		expect(admin.authorize({ content: ['publish'] }).success).toBe(true)
	})

	it('can list and ban users', () => {
		expect(admin.authorize({ user: ['list'] }).success).toBe(true)
		expect(admin.authorize({ user: ['ban'] }).success).toBe(true)
		expect(admin.authorize({ user: ['set-role'] }).success).toBe(true)
	})

	it('cannot impersonate users', () => {
		expect(admin.authorize({ user: ['impersonate'] }).success).toBe(false)
	})

	it('cannot delete users', () => {
		expect(admin.authorize({ user: ['delete'] }).success).toBe(false)
	})

	it('cannot set passwords', () => {
		expect(admin.authorize({ user: ['set-password'] }).success).toBe(false)
	})

	it('can list and revoke sessions', () => {
		expect(admin.authorize({ session: ['list'] }).success).toBe(true)
		expect(admin.authorize({ session: ['revoke'] }).success).toBe(true)
	})

	it('cannot delete sessions', () => {
		expect(admin.authorize({ session: ['delete'] }).success).toBe(false)
	})
})

describe('SuperAdmin permissions', () => {
	it('has full user management access', () => {
		expect(superAdmin.authorize({ user: ['create'] }).success).toBe(true)
		expect(superAdmin.authorize({ user: ['list'] }).success).toBe(true)
		expect(superAdmin.authorize({ user: ['set-role'] }).success).toBe(true)
		expect(superAdmin.authorize({ user: ['ban'] }).success).toBe(true)
		expect(superAdmin.authorize({ user: ['impersonate'] }).success).toBe(true)
		expect(superAdmin.authorize({ user: ['delete'] }).success).toBe(true)
		expect(superAdmin.authorize({ user: ['set-password'] }).success).toBe(true)
	})

	it('has full session management access', () => {
		expect(superAdmin.authorize({ session: ['list'] }).success).toBe(true)
		expect(superAdmin.authorize({ session: ['revoke'] }).success).toBe(true)
		expect(superAdmin.authorize({ session: ['delete'] }).success).toBe(true)
	})

	it('has full content access', () => {
		expect(superAdmin.authorize({ content: ['create'] }).success).toBe(true)
		expect(superAdmin.authorize({ content: ['delete'] }).success).toBe(true)
		expect(superAdmin.authorize({ content: ['publish'] }).success).toBe(true)
	})
})

describe('hasRole utility', () => {
	it('returns true when user has matching role', () => {
		const session = { user: { role: 'admin' } }
		expect(hasRole(session, ['admin', 'superAdmin'])).toBe(true)
	})

	it('returns false when user has non-matching role', () => {
		const session = { user: { role: 'student' } }
		expect(hasRole(session, ['admin', 'superAdmin'])).toBe(false)
	})

	it('returns false for null session', () => {
		expect(hasRole(null, ['admin'])).toBe(false)
	})

	it('returns false for undefined role', () => {
		const session = { user: {} }
		expect(hasRole(session, ['admin'])).toBe(false)
	})
})

describe('isAdmin utility', () => {
	it('returns true for admin', () => {
		expect(isAdmin({ user: { role: 'admin' } })).toBe(true)
	})

	it('returns true for superAdmin', () => {
		expect(isAdmin({ user: { role: 'superAdmin' } })).toBe(true)
	})

	it('returns false for student', () => {
		expect(isAdmin({ user: { role: 'student' } })).toBe(false)
	})

	it('returns false for educator', () => {
		expect(isAdmin({ user: { role: 'educator' } })).toBe(false)
	})
})
