---
"auth-permissions": minor
"auth": patch
"www": patch
"cadence-links": patch
---

Create shared auth-permissions package with expanded RBAC roles and permissions. Replaces duplicated permissions.ts files across all apps with a single shared source of truth. Integrates Better Auth's defaultStatements for proper admin endpoint RBAC gating. Defines four differentiated roles: student, educator, admin, and superAdmin.
