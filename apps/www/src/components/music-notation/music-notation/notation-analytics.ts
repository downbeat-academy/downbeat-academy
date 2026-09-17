/**
 * De-duplication for `notation_rendered`.
 *
 * The event means "a reader saw notation on this page" — one per page view,
 * not one per render. That cannot be tracked inside the OSMD component,
 * because the component is mounted once per excerpt and re-renders whenever
 * the reader transposes:
 *
 * - A page with six MusicXML excerpts mounts six components, each with its own
 *   refs. Six instances that each fire once produce six events carrying the
 *   same `slug`.
 * - Transposing swaps the `file` being rendered. A guard keyed on `file`
 *   therefore treats every key change as a new excerpt and fires again.
 *
 * Both are invisible in the data, because `slug` is the only property the
 * event carries — the result is a plausible-looking chart that overcounts by
 * however many excerpts and transposes a reader worked through.
 *
 * So the state lives at module scope, where it is shared by every excerpt on
 * the page. The module stays alive across App Router client navigations, which
 * gives the behaviour we want at both ends: navigating A → B → A captures A
 * again, because the last slug seen is B by the time the reader returns.
 */
let lastCapturedSlug: string | null = null

/**
 * Returns true the first time it is called for a given slug, and false for
 * every subsequent call until a different slug appears.
 *
 * Callers pass the slug of the page the notation sits on. A null slug (a route
 * with no trailing segment) is never captured — an event with an empty slug is
 * worse than no event, since it charts as a plausible value that is wrong.
 */
export function shouldCaptureNotationRender(slug: string | null): boolean {
	if (!slug) return false
	if (lastCapturedSlug === slug) return false

	lastCapturedSlug = slug
	return true
}

/** Test-only. Resets the module state between cases. */
export function resetNotationRenderTracking(): void {
	lastCapturedSlug = null
}
