---
'cadence-core': major
---

Rebuild `Toast` without `@radix-ui/react-toast`. `cadence-core` now declares **one** Radix
package — `react-dropdown-menu`, the deliberate Tier C retention.

## API

The public surface is unchanged for every existing call site. `Toast`, `ToastProvider`,
`ToastViewport`, `ToastTitle`, `ToastDescription`, `ToastClose`, `ToastAction`, `Toaster`,
`useToast` and `toast()` all keep their names and behaviour — this was the constraint, with
11 call sites in `apps/www` plus `apps/auth`.

| Before | After |
| --- | --- |
| Props inherited from Radix | Hand-written; nothing Radix-shaped reaches `dist/*.d.ts` |
| `ToastProvider` was a bare Radix alias | Owns `duration`, `label`, `swipeDirection`, `swipeThreshold`, and the live region |
| `ToastActionElement` was `ReactElement<typeof ToastPrimitive.Action>` | `ReactElement<ToastActionProps>` — the old form was wrong on its own terms, `typeof Component` being the component type rather than its props |
| — | `ToastProviderProps` and `ToastType` exported |

`duration` now accepts `Infinity` to pin a toast open, and `altText` on `ToastAction` keeps
the meaning Radix gave it: it is folded into the announcement rather than being decorative.

## What was rebuilt

Auto-dismiss timers that **pause on hover and on focus** and bank elapsed time rather than
restarting, so a toast cannot expire while it is being read or while the user is tabbing
towards its action. They also pause when the tab is hidden — a toast that times out in a
background tab is a message nobody saw. Tab visibility only, not window blur: another
application taking focus leaves the toast on screen. Swipe-to-dismiss for touch and pen, ignoring mouse
drags so text stays selectable. The F8 hotkey, which the viewport's own accessible label
promises. And announcement through a **persistent** live region built from the title and
description only, so the close button is excluded by construction rather than by a marker
attribute.

Toasts portal into the viewport's `<ol>`. The documented composition puts `<Toast>` as a
sibling of `<ToastViewport>`, so rendering in place left a bare `<li>` outside any list —
invalid HTML, an axe `listitem` violation, and no list semantics. `Toaster` reverses the
array before mapping, because the reducer prepends and DOM order must stay oldest-first;
the 0.3 backfill predicted precisely this as the thing a rewrite would get wrong.

## A defect this uncovered — B.1b's fix does not work

`ToastViewport` promotes itself to `popover="manual"` and re-asserts on `cds-dialog-open`,
which task B.1b concluded would keep a toast above a modal `<dialog>`. **It does not, and
never did.** Measured against the raw platform, identically in Chromium, WebKit and
Firefox:

```
popover alone            → the popover is topmost
after dlg.showModal()    → the DIALOG is topmost, popover still :popover-open
after hide + showPopover → the DIALOG is still topmost
```

Opening a modal dialog makes everything outside it inert, and an inert top-layer element
paints below the modal. Insertion order cannot beat that.

This rebuild neither caused nor cured it — B.1b shipped without a test, and C.1 wrote the
first one that checked. Three admin dialogs call `toast()` on their failure path, so the
message is behind the backdrop exactly when it is needed. Now recorded in
`docs/adr/0002-known-gaps.md` and pinned by a spec that asserts the *current* behaviour, so
it fails loudly if an engine ever changes it. The promotion is kept, because it genuinely
does keep toasts above ordinary stacked content.

## Tests

The 0.3 backfill's 61 specs are kept and satisfied — unlike `tooltip` and `hover-card`,
this suite was a real regression contract and earned its description. Two assertions were
rewritten rather than relocated, both because they named Radix's mechanism: one required
`data-radix-toast-announce-exclude`, which cannot survive the removal of Radix and is now
asserted as the behaviour it protected (the announcement contains the title and
description and not "Close"); the other queried text that the live region legitimately
duplicates, and is now scoped to the list.

Added: **10 browser specs** for what jsdom cannot host — real-clock auto-dismiss, pausing
on hover and focus, `Infinity`, the F8 hotkey, top-layer promotion, and the modal-dialog
gap above.
