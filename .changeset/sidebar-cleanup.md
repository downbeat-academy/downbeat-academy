---
"cadence-core": patch
"cadence-icons": minor
---

Sidebar cleanup — fix collapsed-rail behaviour for `asChild` links and tighten the rail's visual treatment.

- `SidebarLink` with `asChild` now wraps the consumer's label in the hideable label span before Radix Slot promotes the element, so the collapsed rail actually hides label text (previously the label leaked through as bare text)
- Collapsed tooltips render plain text instead of re-rendering the consumer's `<Link>`/`<a>`, which nested an anchor inside the tooltip
- New optional `label` prop on `SidebarLink` for the collapsed tooltip and accessible name; falls back to string `children`. Collapsed links now carry an `aria-label` so they keep an accessible name once the visible label is hidden
- `Sidebar` fills its container height (`height: 100%`) and scrolls internally, letting consumers own the viewport math
- Border now runs the full perimeter with `--cds-radii-medium`, replacing the single `border-right`
- Hover states use the semantic `--cds-color-surface-faint` token instead of a raw palette reference
- `SidebarLink` and `SidebarSeparator` no longer emit an orphan `<li>` when used outside a `SidebarSection`, which was invalid HTML under `<nav>`; separators inside a section now render as a listitem wrapping the divider so list semantics survive

Adds `Layout`, `UserPlus`, and `MailPlus` icons to cadence-icons.

Test infrastructure (cadence-core):

- `@testing-library/jest-dom` matchers are now actually loaded — `vite.config.ts` pointed at a setup file that skipped them while a second, unused setup file imported them, so any suite using `toBeInTheDocument`/`toHaveAttribute` failed with "Invalid Chai property"
- Added the missing `@testing-library/user-event` and `axe-core` dev dependencies
- Enabled `test.css` so CSS modules are compiled and injected into jsdom, making CSS-driven behaviour (collapsed rails, hidden labels) testable
