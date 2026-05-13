# cadence-links

## 1.2.0

### Minor Changes

- d927b23: Add OAuth 2.1 provider to auth service and integrate cadence-links via OAuth flow.

  The auth service now acts as an OAuth 2.1 provider, enabling cross-domain authentication for apps that don't share the `.downbeatacademy.com` cookie domain. Cadence-links uses the generic OAuth plugin to authenticate via the auth service, with auto-consent for trusted first-party clients.

- c539ead: Replace local authentication layer with centralized auth service integration. Auth operations (sign-in, sign-up, password reset) are now handled by the auth service at auth.downbeatacademy.com. The cadence-links app now only validates sessions against the shared auth database.

### Patch Changes

- 6a1710d: Create shared auth-permissions package with expanded RBAC roles and permissions. Replaces duplicated permissions.ts files across all apps with a single shared source of truth. Integrates Better Auth's defaultStatements for proper admin endpoint RBAC gating. Defines four differentiated roles: student, educator, admin, and superAdmin.
- 2ea6f1c: Update tier 1 and tier dependencies
- Updated dependencies [52bdad7]
- Updated dependencies [4d3d348]
- Updated dependencies [f7a0524]
- Updated dependencies [6a1710d]
- Updated dependencies [2ea6f1c]
  - cadence-core@3.2.1
  - cadence-icons@1.7.1
  - auth-permissions@1.1.0
  - cadence-tokens@2.3.1

## 1.1.0

### Minor Changes

- ad032e7: Created a Select and Data Table component, replaced in cadence-links and www.

### Patch Changes

- Updated dependencies [64f45b6]
- Updated dependencies [8b7e7d2]
- Updated dependencies [4ef0ac1]
- Updated dependencies [fe5605e]
- Updated dependencies [0c24c43]
- Updated dependencies [d35466e]
- Updated dependencies [ec4b702]
- Updated dependencies [3101235]
- Updated dependencies [09ae87b]
- Updated dependencies [b276e41]
- Updated dependencies [ad032e7]
  - cadence-core@3.0.0
  - cadence-icons@1.6.1
