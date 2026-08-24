# PostHog live-event QA

Run this against a **deployed** environment after any change to analytics wiring, and once
after the initial rollout.

It exists because `pnpm verify` and the Cypress suite, between them, still cannot tell you
whether a single event reached PostHog. They run against a fake token with `/ingest` stubbed.
Everything below needs the real project, the real domain, and a real browser.

## Before you start

- [ ] `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` is set in Infisical at `/www` **and** present in the
      Railway service environment. It appears in no committed `.env.example`, so it is easy for
      this to be silently missing — in which case nothing initialises and nothing errors.
- [ ] The same token is set for the `auth` service — in Infisical at `/auth`, which is a
      **separate path from `/www` and does not inherit from it** — along with
      `AUTH_SERVICE_URL` pointing at `https://auth.downbeatacademy.services`. `apps/auth`
      gates on that URL, not on `NODE_ENV`.
- [ ] The `auth` service has been **redeployed since** that token was added. `getClient()` in
      `src/lib/analytics/posthog-server.ts` caches its gate decision in a module-level
      singleton, so a synced Railway variable does not take effect until the process restarts.
      Check for a fresh successful deployment rather than assuming the sync was enough.
- [ ] You are on `downbeatacademy.com` or `www.downbeatacademy.com`. Nowhere else reports —
      see `POSTHOG_ALLOWED_HOSTS` in `apps/www/src/lib/posthog/config.ts`.
- [ ] Open PostHog → **Activity** (live events) and filter to your own person once identified.

## 1. The chain works at all

- [ ] Load the homepage. A `$pageview` appears within a few seconds.
- [ ] In the browser network tab, the request goes to `downbeatacademy.com/ingest/...`, **not**
      to `us.i.posthog.com`. If it goes direct, the rewrite has broken and ad blockers will
      start eating traffic.
- [ ] The `/ingest` request does **not** carry a `set-cookie` from the auth service and returns
      promptly. `/ingest` is excluded from the `proxy.ts` matcher; if that exclusion is lost,
      every event runs a database session lookup.

## 2. Establish what `defaults: '2026-01-30'` actually does

**This cannot be determined by reading the code**, and everything downstream depends on it.

Three of these are already settled — the Cypress spec
(`cypress/e2e/analytics/posthog-events.cy.ts`) established them empirically against a real
build, so do not re-derive them:

- ✅ **A full page load produces `$pageview`.**
- ✅ **Client-side navigation produces another `$pageview`.** This was the open risk — the
      classic App Router failure, with no `usePathname`-driven capture as a backstop. The
      preset handles it, and there is now a test that fails if that ever stops being true.
- ✅ **Leaving a page produces `$pageleave`.** Observed incidentally while debugging the
      spec: a full-document navigation away from a page fires it.

Still to confirm against the real project:

- [ ] Does clicking produce `$autocapture`? …
- [ ] Are person profiles created for anonymous visitors, or only identified ones? …
- [ ] Is session recording on? It should not be — Sentry owns replay. …

Record the answers here.

## 3. Identity

- [ ] Sign in. A person appears whose distinct ID is the better-auth `user.id` (a cuid-style
      string), not an anonymous UUID.
- [ ] That person has `email`, `name`, `role`, and `is_admin` set.
- [ ] **Events from both apps land on the same person.** Check that the `sign_in_completed`
      captured by `apps/auth` and the `$pageview` captured by `www` share one distinct ID.
      This is the single most important assertion here: the two apps are on different domains
      with no shared cookie, and that id is the only thing joining them. If it breaks, the
      funnel silently splits in two.
- [ ] Sign out. A new anonymous distinct ID is issued (`posthog.reset()` ran).

## 4. Every event in the taxonomy

Each of these should be seen at least once, carrying the properties declared in
`packages/analytics/src/events.ts`. Anything still at zero after a full pass is either
unreachable or broken — that is the exact condition this whole effort was created to find.

**Auth** (captured server-side by `apps/auth`)

If every event in this group is at zero while the `www` groups below are fine, do not start
debugging the `databaseHooks` — check the token and the redeploy in "Before you start" first.
That is the failure this group has actually had, and it presents identically to broken
instrumentation.

- [ ] `sign_up_completed` — `{ method }`
- [ ] `sign_in_completed` — `{ method }`. Check **both** `method: 'email'` and `method: 'oauth'`.
- [ ] `sign_out_completed`
- [ ] `password_reset_requested`
- [ ] `password_reset_completed` — finish a reset by actually setting a new password. The
      pair gives the completion rate of the flow; `requested` alone cannot tell "reset it"
      apart from "never opened the email".
- [ ] `oauth_authorization_granted` — `{ client_id }`. Fires when a consumer app completes
      the token exchange, so signing in to `www` and to `cadence-links` should produce
      **different** `client_id` values. This is the only signal of which app people use.

Two negatives for `oauth_authorization_granted`, both silent if wrong:

- [ ] Stay signed in past an access-token expiry (an hour). The refresh must **not** produce
      another grant — otherwise the event measures session length, not authorisation.
- [ ] Its `distinctId` is the same person as `sign_in_completed`. It comes from the
      `sub` claim, which equals the better-auth `user.id` only while clients use the default
      public subject type. A client with `subject_type = 'pairwise'` would silently split
      the person in two.

Also confirm the negative: browse the signed-in site for a few minutes and check that
`sign_in_completed` does **not** tick up. Session refreshes create session rows, and the
`resolveAuthMethod` guard is what stops those counting as sign-ins.

**Conversion**

- [ ] `contact_form_submitted`
- [ ] `newsletter_subscribed` — `{ source: 'newsletter_page' }`
- [ ] `newsletter_unsubscribed`
- [ ] `profile_updated`

**Content**

- [ ] `article_viewed` — `{ slug, title }`
- [ ] `article_read` — `{ slug, title, reading_time_minutes }`. Scroll to the bottom of an
      article. Confirm it fires **once**, not on every subsequent scroll.
- [ ] `handbook_page_viewed`
- [ ] `lexicon_term_viewed` — title should read `Artist - Album - Track`
- [ ] `category_browsed`
- [ ] `contributor_viewed`
- [ ] `notation_rendered` — visit a lexicon entry with notation. Confirm it fires once, and
      **not** again when the window is resized or the excerpt transposed.

## 5. Adversarial checks

- [ ] Load the site with uBlock Origin (or similar) enabled. Events still arrive. This is the
      entire reason the `/ingest` reverse proxy exists.
- [ ] Navigate between two articles without a full reload. Both produce `article_viewed`.
      `TrackContentView` is keyed on `event:slug` precisely so the second one is not swallowed.
- [ ] Run the site locally. Confirm **no** events appear in PostHog, and the console explains
      why. If local traffic is landing in the production project, the host gate has broken and
      the data is no longer trustworthy.
- [ ] Confirm no `$exception` events. PostHog's `capture_exceptions` is off deliberately;
      Sentry owns errors.

## 6. Record the result

Update the "Evaluate consolidating Sentry into PostHog" and Fathom-comparison notes with
anything learned, and note the `defaults` answers from step 2 in `packages/analytics`.

If any event stayed at zero, it is not a reporting problem — treat it as a bug in the call
site and find out why the code path never runs.
