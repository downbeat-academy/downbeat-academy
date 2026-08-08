import posthog from 'posthog-js'
import type { AnalyticsEvent, CaptureArgs } from 'analytics'

/**
 * Typed wrapper over `posthog.capture`. Only names in the shared taxonomy
 * (`packages/analytics`) compile, and each one requires exactly its declared
 * properties.
 *
 * Call sites used to pass free-form string literals, which is how the same
 * concept ended up sent as both `registration_method` and `method`.
 */
export function capture<E extends AnalyticsEvent>(
	...args: CaptureArgs<E>
): void {
	const [event, properties] = args as [E, Record<string, unknown> | undefined]

	posthog.capture(event, properties)
}
