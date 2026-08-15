---
'cadence-core': major
---

Rebuild `Drawer` on the native `<dialog>` base, removing the last `@radix-ui/react-dialog`
import.

**`@radix-ui/react-dialog` is now completely gone from `pnpm-lock.yaml`** — not merely
undeclared. `cadence-core` declares **four** Radix packages, down from twelve when the
epic started, which is the corrected end-of-Phase-B target. The four that remain
(`dropdown-menu`, `toast`, `tooltip`, `hover-card`) are deliberate Tier C retentions.

**The shared machinery moved to an internal `modal/` module.** `Drawer` needs the same
`showModal()` lifecycle, `cancel`/`close` round trip, backdrop hit test and focus return
that `Dialog` got in the previous release — the subtle part of this migration. Copying it
would have meant maintaining two versions of exactly the code most likely to go subtly
wrong. `Dialog` and `Drawer` are now thin skins over `ModalRoot`, `ModalSurface`,
`ModalTrigger`, `ModalClose`, `ModalTitle` and `ModalDescription`. That module is internal
and not exported from the package barrel, like `slot/` and `test-utils`; `Dialog` and
`Drawer` remain the supported surfaces.

**Breaking — two exports removed**, mirroring `Dialog`:

| Removed | Why | What to do |
| --- | --- | --- |
| `DrawerPortal` | The top layer places the drawer above everything without moving it in the tree | Delete the wrapper |
| `DrawerOverlay` | `::backdrop` already *is* a full-viewport box beneath the drawer | Delete it; style `dialog::backdrop` |

Neither had a consumer. `DrawerOverlayProps` goes with them; `DrawerProps` is now
exported. Prop types are hand-written rather than inherited from Radix, so `asChild` no
longer arrives for free — it is reimplemented on the in-house `Slot`, because
`apps/www/src/components/changelog/changelog-drawer.tsx` ships it.

**Fixed, same as `Dialog`:** `aria-describedby` is emitted only when a
`DrawerDescription` exists, rather than always pointing at an id that may name nothing.

**CSS.** `.overlay` is gone; its paint moved to `.content::backdrop`. Two things needed
deliberate handling. A modal `<dialog>` is centred by the UA at `inset: 0; margin: auto`,
so pinning to an edge now sets `margin-block: 0` with per-side `margin-inline` — without
it the drawer floats in the middle of the viewport. And `.content` declared
`display: flex`, which overrides the UA's `dialog:not([open]) { display: none }`; Radix
unmounted the content when closed so it never showed, but a native `<dialog>` stays in the
DOM and would have left a full-height panel on the page. Layout now applies only under
`[open]`. Every visual dimension is otherwise unchanged.

Verified against a real browser rather than assumed: the browser suite measures the
drawer's actual box on both sides, which is what proves the margin override works. Four
naive regressions were introduced and each was caught — dropping the margin overrides (2
failures), leaving `display: flex` when closed (3), ignoring the `side` prop (1), and
removing the scroll lock (1). That last one initially caught nothing, which exposed a
missing scroll-lock assertion in `Drawer`'s suite that `Dialog`'s had; it is now covered.
