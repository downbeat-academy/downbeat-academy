---
'cadence-icons': minor
---

Make icons safe by default — `aria-hidden` unless they are named.

Every icon rendered as `role="img"` unconditionally. With no `title` — the overwhelmingly
common case, because these icons are decorative — `titleId` is `undefined`, React omits
`aria-labelledby`, and the result is a `role="img"` with no accessible name. Axe reports
`svg-img-alt`, and when such an icon is the only child of a button, that button is nameless
too and axe adds `button-name`.

That single root cause produced six shipped defects across four PRs, each fixed at the call
site: the close button in `dialog`, `drawer` and `toast`, and three nameless icons in one
open `dropdown-menu`. The API was unsafe by default — the correct usage was the one you had
to remember, and forgetting it failed silently in review.

Now:

- No `title`, `aria-label` or `aria-labelledby` → `aria-hidden="true"` and **no** `role`. An
  `aria-hidden` element cannot trip `svg-img-alt`.
- Named → `role="img"`, wired to `aria-labelledby` as before.
- An explicit `aria-hidden` or `role` from the caller still wins; `{...props}` is spread
  after the computed defaults.

The logic lives in `svgProps` in `.svgrrc.json`, so it is the SVGR template rather than 79
hand-edited files, and all 79 components are regenerated. A new suite in
`src/__test__/icon-accessibility.test.tsx` pins all three cases — the first tests in this
package.

**This changes rendered output.** Code that finds a decorative icon with
`getByRole('img', { hidden: true })` no longer matches, because an untitled icon has no
role. Two tests in `cadence-core`'s `summary` suite did exactly that and are updated. The
per-call-site `aria-hidden` added in #312, #314 and #316 is now redundant — verified by
removing all thirteen and re-running the suite, including the axe specs for `dialog`,
`drawer`, `toast` and `sidebar`, with no regression. They are kept as defence in depth.
