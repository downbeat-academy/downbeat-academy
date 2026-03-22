---
name: RBAC and admin dashboard initiative
description: Auth service admin dashboard for user/session management — current state, patterns, and known limitations
type: project
---

The admin dashboard lives in `apps/auth/src/app/(admin)/admin/` and provides user management, session management, and dashboard stats.

**Architecture decisions:**
- User detail page fetches user data server-side via Drizzle (not better-auth's `listUsers` API, which doesn't support `searchField: 'id'`). The server component passes `initialUser` as a serialized prop to the client component.
- After admin actions (role change, ban, etc.), the client refreshes user data via `listUsers` with `searchField: 'email'` and `searchOperator: 'is'`.
- Test accounts are filtered: client-side toggle (default on) in the users table, server-side `NOT ILIKE '%test%'` on name/email for dashboard recent signups.

**Why:** The admin dashboard was built as part of the RBAC expansion (PR #244). The test account filtering uses a name/email "test" substring match — brittle but no better identifier exists currently.

**How to apply:** When extending admin features, follow the pattern of server-side data fetching for initial loads and client-side API calls for mutations. All UI should use Cadence components (Button, Select, Link, Badge, DataTable, Text) — never raw HTML with inline styles.
