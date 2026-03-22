/** All available role names in the system */
export type Role = 'student' | 'educator' | 'admin' | 'superAdmin'

/** Roles that have admin dashboard access */
export type AdminRole = 'admin' | 'superAdmin'

/** All available role names as an array for runtime checks */
export const ROLES = ['student', 'educator', 'admin', 'superAdmin'] as const

/** Roles with admin dashboard access */
export const ADMIN_ROLES: readonly AdminRole[] = ['admin', 'superAdmin'] as const

/** The default role assigned to new users */
export const DEFAULT_ROLE: Role = 'student'
