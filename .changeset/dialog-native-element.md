---
'cadence-core': major
---

Rebuild `Dialog` on the native `<dialog>` element with `showModal()`.

The platform supplies focus trapping, `Escape` to dismiss, top-layer placement,
`::backdrop` and background inerting — replacing Radix's Portal, Overlay, focus-scope and
presence machinery in one move. `apps/www` uses `Dialog` in six places; all six work
unchanged.

**Breaking — two exports removed:**

| Removed | Why | What to do |
| --- | --- | --- |
| `DialogPortal` | The top layer places the dialog above everything without moving it in the tree. A portal has nothing left to do. | Delete the wrapper. `DialogContent` needs no parent. |
| `DialogOverlay` | `::backdrop` already *is* a full-viewport box painted beneath the dialog. | Delete it. Style `dialog::backdrop` instead. |

Neither had a consumer anywhere in the repo. `DialogOverlayProps` goes with them, and
`DialogProps` is now exported (it was previously a local type).

**Breaking — prop types no longer come from Radix.** Every interface was
`ComponentPropsWithoutRef<typeof DialogPrimitive.X>`; they are hand-written now, so
`asChild`, `forceMount` and the rest no longer arrive for free. `asChild` is deliberately
reimplemented on the in-house `Slot` from A.6 on both `DialogTrigger` and `DialogClose`,
because both ship in `apps/www/src/app/(pages)/account/update-profile/`.
`DialogContentProps` omits `open`: a modal dialog is opened with `showModal()`, and the
`open` attribute alone renders a *non-modal* one.

**Fixed:** `aria-describedby` is now emitted only when a `DialogDescription` is actually
rendered. Radix always emitted it, so a dialog without a description pointed at an id
naming nothing. Axe does not flag a dangling IDREF, which is why it survived the 0.3
backfill.

**Fixed, and only visible once the element stopped being unmounted:** `.content` declared
`display: flex`, which overrides the user agent's `dialog:not([open]) { display: none }`.
Radix removed the content from the DOM when closed so it never showed; a native
`<dialog>` stays put, and every closed dialog would have rendered an empty padded box on
the page. The layout now applies only under `[open]`.

**Toast no longer hides behind the dialog.** A modal `<dialog>` paints in the top layer
and inerts everything behind it, but `ToastViewport` is rendered inline by `Toaster` — so
a toast raised while a dialog was open would have appeared *underneath* the backdrop.
That is the shipping path in `ban-user-dialog.tsx`, `role-change-dialog.tsx` and
`remove-subscriber-dialog.tsx`, all of which `toast()` on failure while their dialog is
still open. The viewport is now promoted with `popover="manual"` and re-asserts itself
whenever a dialog opens, since top-layer ordering follows insertion. The attribute is set
from the same effect that shows it, never rendered — an engine that parses `popover` but
cannot show it would otherwise hide the viewport permanently.

**CSS.** `.overlay` is gone; its paint moved to `.content::backdrop`. `.content` loses
`position: fixed`, `top`/`left`, `transform` and `z-index` — a modal dialog is placed by
the UA at `inset: 0; margin: auto`, and z-index does nothing in the top layer. Every
dimension is unchanged, so Chromatic should be empty. Scroll locking is now
`html:has(.content[open])`, because `showModal()` inerts the document without stopping it
scrolling. Both `::backdrop` and `:has()` were confirmed to survive the cssnano build
unpolyfilled.

**`@radix-ui/react-dialog` is still declared.** `drawer` imports it from eight files; it
leaves in B.2. What this removes is every Radix type from
`dist/components/dialog/*.d.ts`, verified against the built output.
