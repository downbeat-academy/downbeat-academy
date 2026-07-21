---
"www": minor
---

Add admin dashboard at `/admin`, gated to `admin` and `superAdmin` roles.

- Overview page with user KPIs, users-over-time chart, auth provider breakdown, and recent-activity lists
- Users page with server-side paginated/filterable table and moderation actions (ban, unban, change role, revoke all sessions) backed by better-auth's admin plugin
- Subscribers page listing the Resend audience with a remove action
- Guards against self-modification and demoting the last super admin
- Adds `recharts` for chart visualization
