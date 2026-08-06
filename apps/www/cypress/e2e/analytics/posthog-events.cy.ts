/**
 * Proves that analytics events actually leave the browser.
 *
 * This is the only layer that can. Unit tests prove `capture()` was called;
 * they cannot prove the event reached the network. Everything between the call
 * and the wire is untested by them — the `/ingest` rewrite in `next.config.js`,
 * the `proxy.ts` matcher, and the host gate in `instrumentation-client.ts`.
 *
 * That gap is not hypothetical. Before this work, `/ingest` was matched by the
 * proxy and every event triggered a database session lookup; nothing failed,
 * and nothing would have.
 *
 * All `/ingest` traffic is stubbed, so no request escapes to PostHog even
 * though CI builds with a token present.
 */

type CapturedEvent = {
	event: string
	properties?: Record<string, unknown>
}

/**
 * Unwraps a posthog-js request body.
 *
 * The wire format is not stable across transports or versions: the payload
 * arrives as a parsed object, as raw JSON, or — the default this SDK version
 * picks — form-encoded under `data=` with the JSON **base64-encoded**
 * (`Compression.Base64`). Handle all of them; a decoder that silently returns
 * nothing turns every assertion below into a false negative.
 */
const decodePayload = (body: unknown): unknown => {
	if (body && typeof body === 'object') return body
	if (typeof body !== 'string' || !body) return null

	let candidate = body

	const formData = new URLSearchParams(body).get('data')
	if (formData) candidate = formData

	try {
		return JSON.parse(candidate)
	} catch {
		// Not plain JSON — fall through to base64.
	}

	try {
		return JSON.parse(atob(candidate))
	} catch {
		return null
	}
}

/** Events may arrive singly, as a bare array, or wrapped in `{ batch: [...] }`. */
const parseEvents = (body: unknown): CapturedEvent[] => {
	const payload = decodePayload(body)
	if (!payload) return []

	const batch = Array.isArray(payload)
		? payload
		: ((payload as { batch?: unknown[] }).batch ?? [payload])

	return batch.filter(
		(entry): entry is CapturedEvent =>
			!!entry && typeof (entry as CapturedEvent).event === 'string'
	)
}

const stubIngest = () => {
	cy.intercept('POST', '**/ingest/**', (req) => {
		req.reply({ statusCode: 200, body: { status: 1 } })
	}).as('ingest')
}

const eventsFrom = (interceptions: unknown): CapturedEvent[] => {
	const all = (interceptions ?? []) as Array<{ request: { body: unknown } }>

	return all.flatMap((interception) => parseEvents(interception.request.body))
}

/** Every event seen so far, across however many batched requests. */
const capturedEvents = (): Cypress.Chainable<CapturedEvent[]> =>
	cy.get('@ingest.all').then((interceptions) => eventsFrom(interceptions))

/**
 * Asserts an event has been sent at least `count` times.
 *
 * Uses `.should()` rather than `.then()` so Cypress retries: posthog-js flushes
 * on its own schedule, and a bare read races the batcher.
 */
const expectEvent = (name: string, count = 1) => {
	cy.get('@ingest.all').should((interceptions) => {
		const matching = eventsFrom(interceptions).filter((e) => e.event === name)

		expect(
			matching.length,
			`expected at least ${count} "${name}" event(s)`
		).to.be.at.least(count)
	})
}

describe('PostHog event delivery', () => {
	beforeEach(() => {
		cy.clearAllData()
		stubIngest()
	})

	it('sends a pageview when a page loads', () => {
		// Confirms the whole chain works at all: init ran, the host gate allowed
		// it, the `/ingest` rewrite resolved, and the proxy did not swallow it.
		cy.visit('/')

		cy.wait('@ingest')
		expectEvent('$pageview')
	})

	it('sends events through the /ingest reverse proxy, not directly to PostHog', () => {
		// The rewrite exists so ad blockers, which match on `*.posthog.com`, do
		// not silently drop analytics. If a request ever goes direct, the proxy
		// has stopped doing its job and a chunk of traffic is invisible.
		cy.visit('/')
		cy.wait('@ingest')

		cy.get('@ingest.all').then((interceptions) => {
			const all = interceptions as unknown as Array<{
				request: { url: string }
			}>

			expect(all.length).to.be.greaterThan(0)

			all.forEach((interception) => {
				expect(interception.request.url).to.include('/ingest/')
				expect(interception.request.url).not.to.include('posthog.com')
			})
		})
	})

	it('captures a pageview on client-side navigation', () => {
		// App Router navigations do not reload the document. Whether `$pageview`
		// still fires depends entirely on the `defaults` preset, which cannot be
		// determined by reading the config — only observed.
		cy.visit('/')
		cy.wait('@ingest')

		cy.get('[data-testid="nav-articles"]').click()
		cy.url().should('include', '/articles')

		expectEvent('$pageview', 2)
	})

	it('captures article_viewed with the slug and title', () => {
		cy.visit('/articles')

		cy.get('a[href^="/articles/"]').first().click()
		cy.url().should('match', /\/articles\/.+/)

		expectEvent('article_viewed')

		capturedEvents().then((events) => {
			const viewed = events.find((e) => e.event === 'article_viewed')

			expect(viewed?.properties).to.have.property('slug')
			expect(viewed?.properties).to.have.property('title')
			expect(viewed?.properties?.slug).to.be.a('string').and.not.be.empty
		})
	})

	it('captures a content event with real properties, not placeholders', () => {
		// Guards against the shape of the payload silently regressing — an event
		// that arrives with an empty or undefined slug is as useless as one that
		// never arrives, and reports on it would look plausible.
		cy.visit('/handbook')

		cy.get('a[href^="/handbook/"]').first().click()
		cy.url().should('match', /\/handbook\/.+/)

		expectEvent('handbook_page_viewed')

		capturedEvents().then((events) => {
			const viewed = events.find((e) => e.event === 'handbook_page_viewed')

			expect(viewed?.properties?.slug).to.be.a('string').and.not.be.empty
			expect(viewed?.properties?.title).to.be.a('string').and.not.be.empty
		})
	})
})

/*
 * Deliberately not covered here: the conversion forms (contact, newsletter).
 *
 * They cannot complete in CI — the send goes through Resend, and this job runs
 * with a throwaway key, so the request fails and no event is captured. The
 * positive assertion would fail for a reason unrelated to analytics, and the
 * negative one ("no event on failure") would pass even if the entire
 * integration were broken. A test that passes when nothing works is worse than
 * no test.
 *
 * That coverage lives where it can be meaningful instead:
 *   - ordering — `src/app/(pages)/contact/__test__/contact-form.test.tsx`
 *     asserts `capture` runs after `sendEmail` resolves
 *   - end to end — `docs/testing/analytics-qa.md`, against a deployed
 *     environment with real credentials
 */
