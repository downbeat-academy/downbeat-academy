---
"cadence-core": minor
---

Add composable `Sidebar` navigation component with `SidebarHeader`, `SidebarFooter`, `SidebarToggle`, `SidebarSection`, `SidebarLink`, and `SidebarSeparator`.

- Uncontrolled + controlled collapsed state (`defaultCollapsed` / `collapsed` + `onCollapsedChange`); shared via `useSidebar()` hook
- Collapsible sections via `@radix-ui/react-collapsible`
- `SidebarLink` supports leading/trailing icons, `isActive` (sets `aria-current="page"`), a `badge` slot (accepts the existing `<Badge>` component), and `asChild` polymorphism via `@radix-ui/react-slot`
- Collapsed rail hides labels/badges/trailing icons and wraps each link in a right-side Tooltip so hover surfaces the label
- Productive typography, design-token driven CSS, responsive, respects `prefers-reduced-motion`
