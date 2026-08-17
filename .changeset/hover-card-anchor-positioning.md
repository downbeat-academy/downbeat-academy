---
'cadence-core': major
---

Rebuild `HoverCard` on the shared anchored-overlay base, removing
`@radix-ui/react-hover-card`.

## The shared `overlay/` module

Placement is now extracted into an internal `components/overlay/` module that `Tooltip`
and `HoverCard` both consume — `useAnchoredOverlay`, `useAnchorName`,
`computeFallbackPosition` and `supportsAnchorPositioning`. Not barrel-exported, the same
status as `modal/`, `slot/` and `test-utils/`.

The boundary is deliberate: **placement is shared, interaction timing is not.** A tooltip's
hover delay and a hover card's open/close grace period look alike and are different
behaviours; merging them would produce a component that is neither. If `DropdownMenu` ever
leaves Radix (task C.4), this is where its positioning belongs.

## API

| Before | After |
| --- | --- |
| `HoverCardArrow` | **Removed** — a bare Radix alias with no consumer in the repo |
| Props inherited from Radix | Hand-written: `open`, `defaultOpen`, `onOpenChange`, `openDelay`, `closeDelay`, `side`, `align` |
| — | `HoverCardProps`, `HoverCardSide`, `HoverCardAlign` now exported |

`openDelay` (300), `closeDelay` (150), `align` (`center`) and `sideOffset` (4) keep their
defaults, and `hasIcon` / `iconAriaLabel` are unchanged. `asChild` is retained on the
in-house `Slot` — this is the only component whose public API documents it, and
`handbook-reference.tsx` in `www` passes a `Link` through it.

The content is now `role="dialog"` with `aria-labelledby` pointing at the trigger. Radix
rendered a plain `div` with no role, so a screen reader had nothing to announce the card
as. A hover card holds links and is meant to be entered, which is what separates it from a
tooltip and what makes `dialog` the right role.

## A real bug this found, in both components

Escape did not work for anyone using a mouse.

Dismissing removes the overlay from the top layer, the browser re-runs hit-testing, and a
trigger still sitting under a resting cursor receives a fresh `pointerenter` — which
reopens the overlay in the same frame. Closing was never enough on its own.

Both components now latch dismissed until the pointer leaves the trigger, which is what
APG describes. It surfaced as a browser spec that failed only when an earlier spec had
physically moved the mouse over the trigger first — which is also the only condition a real
user is ever in. Diagnosing it took ruling out event delivery (the trusted keydown *did*
reach `document`) and refocusing (no `focus` event fired) before the hit-test explanation
was the only one left.

## Tests

The previous 576-line suite is not carried over wholesale, for the same reason the
tooltip's was not: seven of its assertions were `not.toThrow()`, and `renders within a
Portal` checked no portal. The parts that asserted something — `Title`/`Main`/`Footer`,
`hasIcon`, `asChild` — are kept and extended.

What replaces it: **35 jsdom specs**, a new `hover-card-a11y.test.tsx`, and **9 browser
specs** covering placement on all three engines plus the interactivity that defines the
component — that the pointer can leave the trigger, cross the gap, and use a link inside
the card.

`setup-tests.browser.ts` now raises Testing Library's `asyncUtilTimeout` to 5s. With every
spec running three times over, a real browser under that contention can take longer than
the 1s default to commit and repaint; one of the specs this fixed (`drawer.browser.test.tsx`)
predates the third engine entirely, which is what identified it as scheduling pressure
rather than a defect.
