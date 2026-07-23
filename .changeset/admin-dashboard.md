---
"www": minor
---

Add admin dashboard at `/admin`, gated to `admin` and `superAdmin` roles.

- Overview page with user KPIs, users-over-time chart, auth provider breakdown, and recent-activity lists
- Users page with server-side paginated/filterable table and moderation actions (ban, unban, change role, revoke all sessions) backed by better-auth's admin plugin
- Subscribers page listing the Resend audience with a remove action
- Guards against self-modification and demoting the last super admin
- Adds `recharts` for chart visualization
- Admin button in the main header nav (banner + mobile menu), shown only to `admin` and `superAdmin` roles
- Admin layout uses the shared `AppFrame` + `HeaderNavigation` shell, with a sticky in-page sidebar for section navigation
- Admin sidebar migrated to the new `Sidebar` primitive from `cadence-core` (uses `SidebarLink asChild` + Next `Link`, `usePathname`-driven active state, and a `SidebarToggle` for collapsing the rail)
- Rename the header nav's on-dark-banner button CSS class from `.sign-out-button` to `.banner-ghost-button` in `header-navigation.module.css` so the name reflects intent (now shared by Sign Out + Admin buttons)
- Switch admin server actions from `revalidateTag(tag)` to `updateTag(tag)` — Next.js 16 requires a second `profile` argument on `revalidateTag`, and `updateTag` is the read-your-own-writes-safe replacement for Server Actions
- Extract admin action result types to a shared `apps/www/src/actions/admin/types.ts` (types declared inline in `'use server'` files were being lost during the Next.js 16 build type-check), and flatten the shape to `{ ok: boolean; error?: string }` so consumers don't rely on discriminated-union narrowing
- Minor admin UI fixes surfaced by the same type-check pass: swap invalid toast `variant: 'info'` → `'default'` in the two "copy to clipboard" toasts; use `type="text"` (not the invalid `"search"`) on the users filter search input
