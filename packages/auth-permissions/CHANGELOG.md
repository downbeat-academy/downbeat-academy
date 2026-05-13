# auth-permissions

## 1.1.0

### Minor Changes

- 6a1710d: Create shared auth-permissions package with expanded RBAC roles and permissions. Replaces duplicated permissions.ts files across all apps with a single shared source of truth. Integrates Better Auth's defaultStatements for proper admin endpoint RBAC gating. Defines four differentiated roles: student, educator, admin, and superAdmin.

### Patch Changes

- 2ea6f1c: Update tier 1 and tier dependencies
