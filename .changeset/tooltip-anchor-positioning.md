---
'cadence-core': major
---

Rebuild `Tooltip` on the Popover API and CSS anchor positioning, removing
`@radix-ui/react-tooltip`.

This was Phase C's proving ground: whether the platform can carry a positioned overlay. It
can, but not on its own — see the fallback below.

## API

| Before | After |
| --- | --- |
| `TooltipArrow` | **Removed.** A bare Radix alias with no consumer anywhere in the repo |
| `Tooltip` props inherited from Radix | Hand-written: `open`, `defaultOpen`, `onOpenChange`, `delayDuration`, `disableHoverableContent`, `side`, `align` |
| `TooltipContent` props inherited from Radix | Hand-written: `sideOffset`, `side`, `align`, plus `HTMLAttributes<HTMLDivElement>` |
| `TooltipTrigger` props inherited from Radix | `ButtonHTMLAttributes<HTMLButtonElement>` plus `asChild` |
| `TooltipProvider` required — Radix threw without one | Optional; falls back to a 700ms default |
| No exported types beyond content/trigger props | `TooltipProps`, `TooltipProviderProps`, `TooltipSide`, `TooltipAlign` also exported |

`asChild` is retained on `TooltipTrigger`, on the in-house `Slot` from A.6 —
`sidebar-link.tsx` depends on it. `delayDuration`, `sideOffset`, `side` and `align` keep
their previous defaults, so both apps' `<TooltipProvider delayDuration={500}>` behaves
exactly as before.

## Placement, and why there are two mechanisms

CSS anchor positioning does the work where the engine has it: `anchor-name` on the trigger,
`position-anchor` and `position-area` on the content, and `position-try-fallbacks` for
viewport flipping — gated separately, because Safari 26 ships `anchor()` without it.

**It is not usable alone.** Anchor positioning is absent below Chrome 125, Edge 125,
Firefox 147 and Safari 26.0 — not partial, absent. ADR-0003 originally recorded that Safari
18.2/18.3 supported `anchor()` without `@position-try`, which was wrong, and the correction
changes what a fallback has to do: below the floor the whole positioning mechanism is
missing and the tooltip would render in normal flow, which that ADR calls the unacceptable
case. So there is a ~40-line JS fallback that measures the trigger and sets viewport
coordinates. It does no collision detection and does not flip, which the ADR explicitly
permits.

The content is promoted into the top layer with `popover="manual"` — manual rather than
auto, because an auto popover joins the light-dismiss group and force-closes every other
open auto popover, so a tooltip inside a menu would dismiss the menu.

## Behaviour

Pointer-out now closes after a 150ms grace period rather than immediately. There is a real
`sideOffset` gap between trigger and tooltip, so reaching the tooltip means leaving the
trigger first; closing on that event unmounted the content before the pointer could arrive
and made hoverable content unreachable. `TooltipProvider` also gained `skipDelayDuration`
(300ms), so moving along a row of triggers does not re-pay the delay each time.

Otherwise: focus opens with no delay, blur/Escape/click close immediately, touch pointers
are ignored (a tap fires `pointerenter` before `click` and would leave an undismissable
tooltip), and `aria-describedby` is set only while open so it never dangles.

## Tests

The previous 732-line suite is replaced rather than ported, and most of it did not survive
review rather than the migration. `accepts and forwards props to Radix provider` asserted
only `not.toThrow()`, which passes against an empty component; `renders within a Portal`
asserted that a trigger was an `HTMLElement` and the content's text existed somewhere, both
true of an implementation with no portal. It was described as a strong regression contract
and largely was not one.

What replaces it: 38 jsdom specs for wiring, delay, controlled/uncontrolled and `asChild`;
a new `tooltip-a11y.test.tsx`, which this component never had; and 11 browser specs for
placement. The browser specs assert geometry rather than mechanism, so the same assertions
cover both paths — Chromium and Firefox take the CSS route, WebKit the JS fallback, and a
fallback that silently did nothing would fail them.

Two implementation bugs those tests caught, both of which would have shipped: a consumer's
`style` prop replaced the anchor custom property wholesale, leaving the tooltip unanchored
at its static position; and the popover-promotion effect ran once against a null ref and
never again, so the content was correctly positioned but never entered the top layer.
