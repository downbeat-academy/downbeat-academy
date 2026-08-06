/**
 * Proves the parts of analytics that unit tests structurally cannot reach.
 *
 * The vitest suites prove `capture()` was called with the right arguments.
 * They say nothing about whether PostHog initialised, whether the `/ingest`
 * rewrite resolves, or whether `proxy.ts` swallows the request — and every one
 * of those fails silently. Before this work, `/ingest` was matched by the proxy
 * and every event triggered a database session lookup, with nothing failing.
 *
 * ## Why this asserts on `window.posthog` rather than request bodies
 *
 * An earlier version decoded the `/ingest` payloads directly. That coupled the
 * spec to posthog-js's wire format — base64 vs gzip compression, `batch`
 * wrappers, the `/flags` config handshake that has to succeed before any event
 * is sent at all — and it broke on all three. Those are SDK implementation
 * details that will churn, and getting them wrong produces a spec that reports
 * "no events" when the app is working perfectly.
 *
 * So the split is: **network assertions prove the transport** (the rewrite and
 * the proxy exclusion, which is what actually regressed), and **capture
 * assertions use the SDK instance** exposed on `window` in debug mode. Neither
 * depends on how PostHog happens to encode a payload this month.
 */

type CaptureCall = [event: string, properties?: Record<string, unknown>]

type PostHogWindow = Window & {
	posthog?: {
		__loaded?: boolean
		capture: (event: string, properties?: Record<string, unknown>) => void
	}
	__captureCalls?: CaptureCall[]
}

/**
 * Records every `capture` call, installed *before* the page script runs.
 *
 * Attaching a spy after load does not work for content events: they fire from a
 * `useEffect` on mount, so they are already gone by the time the test can reach
 * `window`. Worse, whether that is even possible depends on how the user got
 * there — the articles index navigates with a full document load, which
 * discards any spy along with the old document. (That cost a CI run: the spy
 * recorded `$pageleave` and nothing else.)
 *
 * Defining the property up front means the wrapper is in place the instant
 * `instrumentation-client.ts` assigns `window.posthog`, regardless of
 * navigation type. Deliberately plain JS — Cypress commands must not be
 * invoked inside `onBeforeLoad`.
 */
const installCaptureRecorder = (win: Window) => {
	const calls: CaptureCall[] = []
	;(win as PostHogWindow).__captureCalls = calls

	let instance: PostHogWindow['posthog']

	Object.defineProperty(win, 'posthog', {
		configurable: true,
		get: () => instance,
		set: (value: NonNullable<PostHogWindow['posthog']>) => {
			instance = value

			const original = value.capture.bind(value)
			value.capture = (event, properties) => {
				calls.push([event, properties])
				return original(event, properties)
			}
		},
	})
}

const visitRecording = (url: string) =>
	cy.visit(url, { onBeforeLoad: installCaptureRecorder })

const capturedCalls = () =>
	cy.window().its('__captureCalls') as Cypress.Chainable<CaptureCall[]>

const expectCaptured = (event: string) =>
	capturedCalls().should((calls) => {
		expect(calls.map(([name]) => name)).to.include(event)
	})

describe('PostHog analytics', () => {
	beforeEach(() => {
		cy.clearAllData()
		// A spy, not a stub: the requests go out for real, which is the only way
		// to prove the rewrite and the proxy exclusion actually work. CI builds
		// with a throwaway token, so PostHog discards whatever arrives.
		cy.intercept('POST', '**/ingest/**').as('ingest')
	})

	describe('transport', () => {
		it('initialises on a permitted host', () => {
			// The gate in src/lib/posthog/config.ts blocks unknown hosts. CI opts
			// in via NEXT_PUBLIC_POSTHOG_DEBUG; production is allow-listed. If this
			// fails in CI the gate has become unconditional, which would mean
			// preview traffic polluting the production project.
			cy.visit('/')

			cy.window()
				.its('posthog')
				.should('exist')
				.its('__loaded')
				.should('be.true')
		})

		it('routes analytics through /ingest, never directly to PostHog', () => {
			// The reverse proxy exists so ad blockers, which match on
			// `*.posthog.com`, cannot silently drop analytics. A request going
			// direct means a chunk of traffic has become invisible.
			cy.visit('/')

			cy.wait('@ingest')

			cy.get('@ingest.all').should((interceptions) => {
				const all = interceptions as unknown as Array<{
					request: { url: string }
				}>

				expect(all.length, 'at least one /ingest request').to.be.greaterThan(0)

				all.forEach(({ request }) => {
					expect(request.url).to.include('/ingest/')
					expect(request.url).not.to.include('posthog.com')
				})
			})
		})

		it('is not intercepted by the auth proxy', () => {
			// `/ingest` must stay in the negative lookahead of the proxy.ts
			// matcher. When it was not, every event ran a full
			// `auth.api.getSession()` database lookup — including for anonymous
			// visitors — and nothing anywhere reported a problem.
			cy.visit('/')

			cy.wait('@ingest').then((interception) => {
				expect(interception.response?.statusCode, 'ingest should not redirect')
					.to.be.lessThan(300)
			})
		})
	})

	describe('content events', () => {
		it('captures article_viewed with a real slug and title', () => {
			// Take a real slug from the index, then load that article directly
			// with the recorder installed. Going via a click would couple this to
			// whether the index happens to link client-side or with a full load.
			cy.visit('/articles')
			cy.get('a[href^="/articles/"]')
				.first()
				.invoke('attr', 'href')
				.then((href) => {
					visitRecording(href as string)

					expectCaptured('article_viewed')

					capturedCalls().should((calls) => {
						const [, properties] =
							calls.find(([name]) => name === 'article_viewed') ?? []

						// An event arriving with an empty slug is as useless as one
						// that never arrives, and reports built on it would look
						// perfectly plausible.
						expect(properties?.slug, 'slug').to.be.a('string').and.not.be.empty
						expect(properties?.title, 'title').to.be.a('string').and.not.be
							.empty
					})
				})
		})

		it('captures handbook_page_viewed with a real slug and title', () => {
			cy.visit('/handbook')
			cy.get('a[href^="/handbook/"]')
				.first()
				.invoke('attr', 'href')
				.then((href) => {
					visitRecording(href as string)

					expectCaptured('handbook_page_viewed')

					capturedCalls().should((calls) => {
						const [, properties] =
							calls.find(([name]) => name === 'handbook_page_viewed') ?? []

						expect(properties?.slug, 'slug').to.be.a('string').and.not.be.empty
						expect(properties?.title, 'title').to.be.a('string').and.not.be
							.empty
					})
				})
		})

		it('captures a pageview on client-side navigation', () => {
			// App Router navigations do not reload the document. Whether
			// `$pageview` still fires depends entirely on the `defaults`
			// preset — which cannot be determined by reading the config, only
			// observed. If this fails, SPA navigation is invisible in reporting
			// and needs an explicit usePathname-driven capture.
			visitRecording('/')

			cy.get('[data-testid="nav-articles"]').click()
			cy.url().should('include', '/articles')

			expectCaptured('$pageview')
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
