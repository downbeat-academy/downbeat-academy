export { ac, statements } from './statements'
export { student, educator, admin, superAdmin } from './roles'
export {
	type Role,
	type AdminRole,
	ROLES,
	ADMIN_ROLES,
	DEFAULT_ROLE,
} from './types'
export { createGuards } from './guards'
export { hasRole, isAdmin } from './hooks'
