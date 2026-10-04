---
'www': minor
'analytics': minor
---

Add "Delete user" to the www admin dashboard (DBA-416). superAdmins can permanently delete an account from `/admin/users` after typing the user's email to confirm; plain admins do not see the action, and the server action refuses them and self-deletion. Deleting also removes the user's PostHog person and events (needs `POSTHOG_PERSONAL_API_KEY` with `person:write`), and records an `account_deleted` event on the acting superAdmin as an audit trail. `analytics` gains the `account_deleted` event and `AccountDeletionMethod` type.
