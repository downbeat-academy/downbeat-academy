# 3. Browser support floor

**Status:** Accepted
**Date:** 2026-08-05

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
January 2026 when Firefox 147 shipped it, so it may be used. `@position-try` may not be
relied on — Safari 18.2 and 18.3 support `anchor()` without it — so viewport flipping
degrades to a static fallback placement rather than breaking. An overlay that cannot flip
is acceptable. An overlay that renders in the wrong place is not.

Nothing enforces this yet. `browserslist@4.28.2` is already in the lockfile and does
support a literal `baseline newly available` query, so the floor can be encoded rather
than only described. That is deliberately left as follow-up work: adding the key changes
compilation targets across every app and package, which is a behaviour change needing its
own verification, not a line smuggled into a documentation change.

## Consequences

The design system can own behaviour it previously delegated. Native `<dialog>` with
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

Until the `browserslist` key exists, this is a convention enforced by reading. That is
weaker than a config, and is the main reason to finish the follow-up.

## Related

- [`0001-record-architecture-decisions.md`](./0001-record-architecture-decisions.md)
- [`0002-known-gaps.md`](./0002-known-gaps.md) — records `dropdown-menu`'s deliberate
  retention on Radix
