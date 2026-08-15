---
'cadence-core': major
---

# Migrating to `cadence-core` 4.0.0

Nine components moved off Radix UI onto the platform. **Radix packages declared by
`cadence-core` went from 12 to 4**, and six left `pnpm-lock.yaml` entirely.

Most consumers need no changes. The breaking part is that prop types are now hand-written
rather than inherited from Radix primitives, so props you were getting for free — `asChild`
on parts that never used it, `forceMount`, `onEscapeKeyDown`, `onPointerDownOutside` — no
longer exist unless they were reimplemented deliberately.

## Removed exports

| Removed | Replacement |
| --- | --- |
| `DialogPortal`, `DrawerPortal` | Nothing. A modal `<dialog>` sits in the top layer, above everything, without moving in the DOM — the portal has no job left. Delete the wrapper. |
| `DialogOverlay`, `DrawerOverlay` | `::backdrop`. It already *is* a full-viewport box painted beneath the dialog. Style `dialog::backdrop` instead of rendering an element. |
| `DialogOverlayProps`, `DrawerOverlayProps` | — |

`DialogProps` and `DrawerProps` are now exported; they were previously internal.

## Changed props

| Component | Before | After |
| --- | --- | --- |
| `Checkbox` | `checked="indeterminate"` | `indeterminate={true}` — native inputs model this as a DOM property, not a value |
| `TabsContent` | `forceMount` also removed `hidden` | `forceMount` keeps children mounted and nothing more; the panel stays `hidden` while unselected |
| `Tabs` | tab stop lived on the `tablist`, handed off on first keypress | the selected tab carries `tabindex="0"` from first render (plain WAI-ARIA APG) |
| `Dialog`, `Drawer` | `aria-describedby` always emitted | emitted only when a `Description` is rendered, so it no longer points at a nonexistent id |

`asChild` **is** retained on `DialogTrigger`, `DialogClose`, `DrawerTrigger` and
`DrawerClose`, reimplemented on an in-house `Slot`. It behaves as before, including
child-props-win merging.

## Styling

`Dialog` and `Drawer` are now `<dialog>` elements. If you were targeting their content by
tag or overriding position:

- The scrim moved from an `.overlay` element to `dialog::backdrop`.
- A modal `<dialog>` is placed by the user agent at `inset: 0; margin: auto`. `Drawer`
  overrides the inline margins to pin to an edge; anything else you position will need to
  account for that too.
- **A `display` declaration on a `<dialog>` overrides the UA's
  `dialog:not([open]) { display: none }`.** If you style one, scope the layout to `[open]`
  or the closed element renders. This bit both `Dialog` and `Drawer` during the migration.
- Background scroll is locked with `html:has(.content[open])`, not JavaScript.

`Tabs` still emits `data-state="active" | "inactive"`, now as its own attribute rather
than Radix's, so existing selectors keep working.

## Testing against this release

`cadence-core` now runs two vitest projects. `pnpm test` is jsdom and covers markup and
wiring; `pnpm test:browser` runs Playwright/Chromium for behaviour jsdom cannot host.

That split is not optional for `<dialog>`: **jsdom does not implement
`HTMLDialogElement`** — `showModal` and `close` are `undefined`, and an unopened
`<dialog>` is `display: none` from the UA stylesheet. If your own tests assert on a
Cadence `Dialog` or `Drawer`, expect `getByRole('dialog')` not to find a closed one, and
do not stub `showModal`: that asserts against the stub.

## What still wraps Radix

`dropdown-menu`, `toast`, `tooltip` and `hover-card` — a deliberate retention recorded in
`docs/adr/0002-known-gaps.md`, not an unfinished job. They need collision-aware
positioning, typeahead and submenu tracking that the platform does not yet supply cheaply.

`@radix-ui/react-tabs` also remains in `pnpm-lock.yaml`, but not for `cadence-core`:
`apps/auth` declares it for its own duplicate tabs component.

## Fully removed from the lockfile

`react-separator`, `react-checkbox`, `react-radio-group`, `react-switch`,
`react-collapsible`, `react-dialog`. Distinct `@radix-ui/*` packages in the lockfile: 38 →
31. `react-slot` is no longer declared or bundled by `cadence-core` but remains
transitively, because the four retained packages depend on it — it leaves when the last of
them does.
