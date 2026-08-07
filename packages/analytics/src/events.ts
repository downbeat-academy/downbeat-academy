/**
 * The Downbeat Academy analytics event taxonomy.
 *
 * Every event captured in any app must appear here. Before this existed, event
 * names were free-form string literals scattered across eight files, which had
 * already produced one silent inconsistency: the same concept was sent as
 * `registration_method` on one event and `method` on another.
 *
 * ## Conventions
 *
 * - `object_verb`, snake_case, past tense — PostHog's convention.
 *   `article_viewed`, not `viewArticle` or `article_view`.
 * - Property keys are snake_case and shared across events wherever they mean
 *   the same thing. `method` is the one and only key for "how did they
 *   authenticate".
 * - Content events carry `slug` and `title` so a report can be read without
 *   joining back to Sanity.
 * - Do not add a `$`-prefixed name. Those are PostHog's own (`$pageview`,
 *   `$autocapture`) and are captured by the SDK, not by us.
 */

/** How a user authenticated. */
export type AuthMethod = 'oauth' | 'email'

/** Where a newsletter signup originated. */
export type NewsletterSource = 'newsletter_page' | 'article' | 'footer'

/**
 * Maps every event name to its properties. `never` means the event carries no
 * properties of its own — PostHog still attaches its automatic context.
 */
export interface AnalyticsEventMap {
	// --- Authentication ------------------------------------------------------
	// Captured server-side in `apps/auth`, which is where sign-in actually
	// happens. `apps/www` cannot see these; it only receives the session.
	sign_up_completed: { method: AuthMethod }
	sign_in_completed: { method: AuthMethod }
	sign_out_completed: never
	password_reset_requested: never
	password_reset_completed: never
	/** Which downstream app the user authorised through the OAuth provider. */
	oauth_authorization_granted: { client_id: string }

	// --- Conversion ----------------------------------------------------------
	contact_form_submitted: never
	newsletter_subscribed: { source: NewsletterSource }
	newsletter_unsubscribed: never
	profile_updated: never

	// --- Educational content -------------------------------------------------
	article_viewed: { slug: string; title: string }
	/**
	 * Distinct from `article_viewed` — fires only once a reader has plausibly
	 * finished, so the two together give a completion rate.
	 */
	article_read: { slug: string; title: string; reading_time_minutes: number }
	handbook_page_viewed: { slug: string; title: string }
	lexicon_term_viewed: { slug: string; title: string }
	category_browsed: { slug: string; title: string }
	contributor_viewed: { slug: string; title: string }
	notation_rendered: { slug: string | null }
}

export type AnalyticsEvent = keyof AnalyticsEventMap

/**
 * Argument tuple for a typed `capture` wrapper. Events with no properties take
 * one argument; events with properties require them.
 *
 * Each app supplies its own wrapper because the clients differ — `posthog-js`
 * in the browser, `posthog-node` on the server — but both type against this.
 *
 * @example
 * function capture<E extends AnalyticsEvent>(...args: CaptureArgs<E>) {
 *   posthog.capture(...args)
 * }
 */
export type CaptureArgs<E extends AnalyticsEvent> = [
	AnalyticsEventMap[E],
] extends [never]
	? [event: E]
	: [event: E, properties: AnalyticsEventMap[E]]

/**
 * Every event name, for tests and documentation that need to enumerate them.
 * Kept in sync with `AnalyticsEventMap` by a type assertion in
 * `__tests__/events.test.ts` — adding an event to the map without adding it
 * here fails typecheck.
 */
export const ANALYTICS_EVENT_NAMES = [
	'sign_up_completed',
	'sign_in_completed',
	'sign_out_completed',
	'password_reset_requested',
	'password_reset_completed',
	'oauth_authorization_granted',
	'contact_form_submitted',
	'newsletter_subscribed',
	'newsletter_unsubscribed',
	'profile_updated',
	'article_viewed',
	'article_read',
	'handbook_page_viewed',
	'lexicon_term_viewed',
	'category_browsed',
	'contributor_viewed',
	'notation_rendered',
] as const satisfies readonly AnalyticsEvent[]
