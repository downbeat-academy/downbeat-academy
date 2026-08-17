---
'cadence-core': major
---

Rebuild `DropdownMenu` on the platform and remove `@radix-ui/react-dropdown-menu`.

**No component in `cadence-core` wraps a Radix primitive any more.** Twelve at the start of
the removal epic, zero now, and the built output contains no `@radix-ui` reference except
two comments describing what was replaced.

## The API is deliberately narrower

Removed, not deprecated — **nothing in the repo rendered any of them**:

`DropdownMenuGroup`, `DropdownMenuPortal`, `DropdownMenuSub`, `DropdownMenuSubTrigger`,
`DropdownMenuSubContent`, `DropdownMenuRadioGroup`, `DropdownMenuRadioItem`,
`DropdownMenuCheckboxItem`.

The two consumers use five exports between them: root, trigger, content, item and
separator. `DropdownMenuLabel` and `DropdownMenuShortcut` are kept because they are
non-interactive and cost nothing.

That scoping is the whole reason this was reversible. C.4 was recorded as a re-decision
whose estimate was 5–8 days at real accessibility risk — but that estimate was for full
Radix parity, and the expensive parts of it are precisely the parts with no callers:
submenu safe-triangle tracking and checkbox/radio indicator state. Positioning, which the
re-decision was gated on, was already solved by `components/overlay/` in C.2 and C.3.

## What was built

Roving tabindex with wrapping arrow keys, Home and End; typeahead that cycles when the same
character is repeated rather than searching for `"dd"` and matching nothing; Escape and
outside-press dismissal, both returning focus to the trigger; and the APG distinction
between a keyboard open (focuses the first item) and a pointer open (does not, so a mouse
user gets no focus ring they did not ask for). A disabled item keeps `aria-disabled` and
stays in the menu for a screen reader to find, while focus movement skips it.

Placement and top-layer promotion come from `components/overlay/`, now shared by three
components.

## Also in this change

`setup-tests.ts` loses the `scrollIntoView` and pointer-capture shims, both commented "for
Radix UI". The whole jsdom suite passes without them — verified, not assumed. Only the
`ResizeObserver` mock remains.

The previous 864-line suite went with the exports it tested. Replacing it: **46 jsdom
specs** and **12 browser specs** across Chromium, WebKit and Firefox. The a11y suite is
also now meaningful — it previously scanned the render container while Radix portalled the
menu to `document.body`, so it reported zero violations on a menu that had three.
