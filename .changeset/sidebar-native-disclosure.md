---
'cadence-core': patch
---

`SidebarSection` no longer uses `@radix-ui/react-collapsible`. Its collapsible mode is now
the WAI-ARIA disclosure pattern: a `<button>` carrying `aria-expanded` and `aria-controls`,
and the region it owns. **No public API change** — `collapsible`, `defaultOpen`, `open` and
`onOpenChange` all behave as before, in both controlled and uncontrolled modes, and the
collapsed-rail behaviour that forces sections open is untouched.

`<details>`/`<summary>` was the first choice, since `summary/` already uses it in this
package, but two things ruled it out. Controlled mode means fighting the element's own
toggling, and reproducing the existing exit animation would need `::details-content` with
`transition-behavior: allow-discrete` — not Baseline, and so below the floor in
`docs/adr/0003-browser-support-floor.md`. `summary/` animates only its chevron and never
its content, so it was not a precedent for this. The reasoning is recorded in the
component.

The content region stays mounted and toggles `hidden` rather than unmounting, so
`aria-controls` always resolves to a real element — a dangling `aria-controls` is worse
than none. `hidden` also takes the links out of the accessibility tree entirely when
closed, rather than leaving them merely invisible.

The exit animation is preserved with a small presence effect: the region stays in the DOM
until its animation ends. That effect first checks the computed `animationName` and hides
immediately when there is none — without that guard, `prefers-reduced-motion` (which sets
`animation: none`) would mean `animationend` never fires and the content stayed visible
forever.

`data-state` is retained on the trigger, since the chevron rotation already keys off it.

Testing: `SidebarSection`'s collapsible mode had **no coverage at all** — the existing
sidebar suites never passed the `collapsible` prop, so a whole interactive mode was
shipping untested. Adds 18 tests covering disclosure semantics, controlled and
uncontrolled modes, Enter/Space from the trigger, unique region ids across sibling
sections, the collapsed-rail override, and axe in both states.

Also adds the `'use client'` directive missing from `sidebar-header.tsx` and
`sidebar-footer.tsx`, previously masked by the whole-bundle Rollup banner.

`@radix-ui/react-collapsible` is dropped from `dependencies` and the Rollup `external`
array, and leaves `pnpm-lock.yaml` entirely.

**`cadence-core` now declares 6 Radix packages, down from 12** at the start of the epic —
`dialog`, `dropdown-menu`, `hover-card`, `tabs`, `toast` and `tooltip`. Phase A is
complete.
