# 3. Browser support floor

**Status:** Accepted
**Date:** 2026-08-05
**Amended:** 2026-08-16 — see [Amendments](#amendments). The decision is unchanged; two
statements of fact in it were wrong, and the follow-up work it describes is now done.

## Context

This repository has never stated which browsers it supports. There is no
`.browserslistrc`, no `browserslist` key in any `package.json`, and no prose statement in
any `AGENTS.md` or architecture document. Every tool falls back to its own default —
Next.js, esbuild, and the `cadence-core` Rollup build each pick a target independently,
and nobody chose any of them.

That was tolerable while the design system leaned on a dependency for anything difficult.
It stopped being tolerable when we started removing those dependencies. Deciding whether
`cadence-core` may use CSS anchor positioning, the Popover API, `@starting-style`, or
native `<dialog>` is not answerable without a floor, and the answer changes what the
design system is allowed to build.

The immediate forcing function was the Radix removal work, but the policy is not about
Radix. It governs every platform feature anyone reaches for from here on.

Two options were real:

**Baseline Widely Available** — a feature qualifies 30 months after it lands in all major
engines. Conservative, and it would have blocked native overlay positioning entirely,
which means keeping a dependency to do the same job.

**Baseline Newly Available** — a feature qualifies once it is in all major engines. Faster
to adopt, at the cost of an installed-base tail on older versions of those engines.

## Decision

**Target Baseline Newly Available, and use progressive enhancement for anything above the
floor.**

A feature at Newly Available may be used directly. A feature below it may be used only as
an enhancement over a working fallback — never as the mechanism the component depends on
to function.

Concretely, for the work this unblocked: CSS anchor positioning reached Baseline in
January 2026 when Firefox 147 shipped it, so it may be used — over a fallback, for the
reasons in the 2026-08-16 amendment below. An overlay that cannot flip is acceptable. An
overlay that renders in the wrong place is not.

Enforcement is deliberately left as follow-up work, because adding a `browserslist` key
changes compilation targets across every app and package, which is a behavior change
needing its own verification rather than a line smuggled into a documentation change.
That work is now done — see the 2026-08-16 amendment for what it turned out to require.

## Consequences

The design system can own behavior it previously delegated. Native `<dialog>` with
`showModal()` replaces a portal, an overlay, a focus scope, and presence tracking in one
move. Native form controls replace hand-rolled ARIA. This is what makes dependency removal
worth doing rather than merely a lateral trade.

It also means accepting real users on older engines get a degraded experience, and that
"degraded" has to be defined per feature rather than assumed. Every use of a
below-the-floor feature now carries an obligation to say what happens without it. That
obligation is easy to skip and will need catching in review.

Newly Available moves. A feature qualifying today did not six months ago, so this record
states a policy, not a fixed list. Re-read it against
[caniuse](https://caniuse.com/) and [Baseline](https://web.dev/baseline) at the time of
use rather than trusting the examples above, which are accurate as of the date on this
record and will age.

The `browserslist` key now exists, so the compilation target is enforced. The _authoring_
half of the policy — "reach for a feature only once it is Newly Available, and give
anything below that a working fallback" — remains a convention enforced by reading. A
config cannot express it, because it is a rule about what you write, not about what the
compiler emits.

## Amendments

### 2026-08-16 — encoding the floor, and two corrections

Encoding the floor was expected to be a one-line change. It was not, because the record
above got two facts wrong. The **decision** — Baseline Newly Available, with progressive
enhancement below it — is unchanged and still stands. What follows corrects the reasoning
attached to it.

**Correction 1: a literal `baseline newly available` query cannot be used as a
compilation target.** The original text said browserslist "does support a literal
`baseline newly available` query, so the floor can be encoded rather than only described."
It parses, but it does not mean what the sentence assumes. `browserslist/index.js`
implements it as _"widely available on `new Date()` + 30 months"_, which has two
consequences:

- It re-resolves on every build. The compilation target would silently drift day to day
  and differ between a developer's machine and CI. Builds stop being reproducible.
- Resolved on 2026-08-16 it yields **seven browser versions: Chrome, Edge and Chrome for
  Android only.** Safari 26.5 and Firefox 152 — the current releases of both — do not
  qualify. As a compilation target that instructs autoprefixer and postcss-preset-env that
  no engine but Chromium matters, which is the opposite of this record's intent.

**Correction 2: Safari 18.2 and 18.3 do not support `anchor()`.** The original text said
they support `anchor()` without `@position-try`, and drew the conclusion that only viewport
_flipping_ needed a fallback. Per `caniuse-lite@1.0.30001806`, CSS anchor positioning is
unsupported in Safari below **26.0** — not partially, not behind a flag, absent. The real
per-engine floors are Chrome 125, Edge 125, Firefox 147, Safari 26.0, iOS Safari 26.0.

That changes what a fallback has to do. Below the floor it is not that an overlay cannot
flip; it is that the entire positioning mechanism is absent and the overlay renders in
normal flow. By this record's own rule, that is the unacceptable case, not the acceptable
one. Any component using anchor positioning must ship a real `@supports` fallback that
places the overlay correctly without it.

**What was encoded.** The `browserslist` key in the root `package.json`:

```json
"browserslist": ["baseline widely available on 2026-08-16"]
```

resolving to `chrome/edge >= 121`, `firefox >= 122`, `safari/ios_saf >= 17.2`. The pinned
date is what makes it deterministic; re-pin it deliberately, never implicitly.

**This separates two things the original record ran together.** A support target and a
feature ceiling are not the same:

- **`browserslist` is the support target** — what compiled output must _run on_. It is
  broad on purpose, so nothing we emit breaks on an engine we still serve.
- **Baseline Newly Available is the authoring policy** — what a component may _reach for_.
  It is narrower and moves faster.

A feature between the two is exactly what "progressive enhancement over a working
fallback" was always meant to describe. Anchor positioning is the current example: usable,
but never as the mechanism a component depends on to function.

**Measured effects of the change.** The floor moves the design system's CSS and
essentially nothing else. Measured, not estimated:

| Output                                     | Before             | After              |
| ------------------------------------------ | ------------------ | ------------------ |
| `cadence-core` `dist/cadence-core.min.css` | 87,335 (12,589 gz) | 85,822 (12,483 gz) |
| `apps/www` client JS, all chunks           | 3,912,188          | 3,912,196          |
| `apps/www` CSS, all chunks                 | 120,542            | 120,542            |

The CSS delta is entirely Firefox prefixes that stopped being generated —
`-moz-appearance`, `-moz-user-select`, `-moz-fit-content` — plus three
`-webkit-appearance` declarations. Vendor _pseudo-elements_ with no standard equivalent
(`::-webkit-slider-thumb`, `::-moz-range-thumb`/`-track`/`-progress`) are untouched, as
are `-webkit-user-select` and `-webkit-text-decoration`, which Safari still needs.
`::backdrop`, `:has()` and `[popover]` all survive the changed postcss and cssnano pass.

The eight-byte movement in `apps/www` is noise, and that is the expected result rather
than a disappointment. Next 16 already defaults to `MODERN_BROWSERSLIST_TARGET` —
`chrome 111, edge 111, firefox 111, safari 16.4` — and only consults `browserslist` if a
config exists. Our floor is a little newer than that default, and there is essentially no
syntax left to down-level between the two. The value of setting it is that the target is
now _chosen and written down_ instead of inherited from a framework constant that can
change under us.

`transpileClientSDK: true` was removed from `apps/www/next.config.js` in the same change.
It contradicted any modern floor on its face, but removing it saved nothing: the option
was dropped in `@sentry/nextjs` v8 and this repo is on v10, so it had been silently
ignored for some time. Worth deleting as a false statement of intent, not as a saving.

**Two things this also required, worth knowing before touching the key again.**

`turbo.json` had no `globalDependencies`, so the root `package.json` was not part of the
build hash: editing the floor and rebuilding returned `FULL TURBO` and served a `dist`
compiled against the old target. `"globalDependencies": ["package.json"]` fixes it, and
the fix was verified in both directions.

The browser-test project ran Chromium only, which cannot verify a multi-engine floor. It
now runs Chromium, WebKit and Firefox. WebKit immediately found something: its Tab order
skips buttons entirely, because macOS ships "Press Tab to highlight each item on a
webpage" off and Playwright's WebKit inherits that default. The `Dialog` and `Drawer`
focus-trap tests were asserting an engine preference rather than component behaviour. The
modal itself is correct on WebKit — `:modal` matches and focus moves inside — so the
button half of those assertions is now gated on a runtime probe
(`src/test-utils/keyboard.ts`), and the half that matters, focus never escaping, stays
unconditional.

## Related

- [`0001-record-architecture-decisions.md`](./0001-record-architecture-decisions.md)
- [`0002-known-gaps.md`](./0002-known-gaps.md) — records `dropdown-menu`'s deliberate
  retention on Radix
