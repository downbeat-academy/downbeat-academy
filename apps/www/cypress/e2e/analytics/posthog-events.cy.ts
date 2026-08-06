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
 * posthog-js batches events into a single request and encodes the payload in
 * more than one shape depending on transport (JSON body, or form-encoded
 * `data=`). Normalising here keeps the assertions readable.
 */
const parseEvents = (body: unknown): CapturedEvent[] => {
	if (!body) return []

	let raw: unknown = body

	if (typeof raw === 'string') {
		const formMatch = /^data=(.*)$/.exec(raw)
		const candidate = formMatch ? decodeURIComponent(formMatch[1]) : raw

		try {
			raw = JSON.parse(candidate)
		} catch {
			return []
		}
	}

	const batch = Array.isArray(raw) ? raw : [raw]

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

	it('captures contact_form_submitted only after a successful send', () => {
		cy.intercept('POST', '/contact*').as('contactSubmit')

		cy.visit('/contact')

		cy.get('[data-testid="contact-name-input"]').type('Ella Fitzgerald')
		cy.get('[data-testid="contact-email-input"]').type('ella@example.com')
		cy.get('[data-testid="contact-message-input"]').type(
			'A question about the handbook.'
		)
		cy.get('[data-testid="contact-submit"]').click()

		expectEvent('contact_form_submitted')
	})

	it('does not capture contact_form_submitted when the send fails', () => {
		// The unit test cannot cover this path: the form re-throws from its
		// catch, react-hook-form surfaces that as an unhandled rejection, and
		// vitest fails the run on it. Here the real error handling runs.
		cy.intercept('POST', '/contact*', {
			statusCode: 500,
			body: { error: 'Server error' },
		}).as('contactSubmit')

		cy.visit('/contact')

		cy.get('[data-testid="contact-name-input"]').type('Ella Fitzgerald')
		cy.get('[data-testid="contact-email-input"]').type('ella@example.com')
		cy.get('[data-testid="contact-message-input"]').type(
			'A question about the handbook.'
		)
		cy.get('[data-testid="contact-submit"]').click()

		cy.wait('@contactSubmit')

		// Give posthog-js a chance to flush anything it was going to.
		cy.wait(1000)

		capturedEvents().then((events) => {
			const submitted = events.filter(
				(e) => e.event === 'contact_form_submitted'
			)
			expect(submitted, 'a failed send must not count as a conversion').to.have
				.length(0)
		})
	})
})
