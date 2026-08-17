/**
 * Shared machinery for anchored overlays — `Tooltip` and `HoverCard`.
 *
 * **Internal.** Not re-exported from `src/index.ts`, the same status as `modal/`, `slot/`
 * and `test-utils/`. A third anchored overlay belongs here rather than assembled by a
 * consumer; `DropdownMenu` is the obvious candidate if Radix ever leaves it (task C.4).
 *
 * What lives here is *placement*: turning an anchor and a requested side into a position,
 * across the two mechanisms the browser-support floor forces us to carry. What does not
 * live here is interaction timing — a tooltip's hover delay and a hover card's open/close
 * grace period look alike but are different behaviours, and merging them would produce a
 * component that is neither.
 */
export { useAnchoredOverlay, useAnchorName } from './use-anchored-overlay'
export { computeFallbackPosition, supportsAnchorPositioning } from './position'
export type { OverlaySide, OverlayAlign } from './types'
