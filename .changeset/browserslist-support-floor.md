---
'cadence-core': patch
---

Encode the browser-support floor as a `browserslist` config, and correct two facts in
ADR-0003 that were wrong.

The floor has been written down since ADR-0003 (2026-08-05) but nothing enforced it, so
every tool picked its own compilation target. The root `package.json` now carries:

```json
"browserslist": ["baseline widely available on 2026-08-16"]
```

resolving to `chrome/edge >= 121`, `firefox >= 122`, `safari/ios_saf >= 17.2`.

**The literal `baseline newly available` query, which ADR-0003 and task 0.6 both specified,
could not be used.** It parses, but browserslist implements it as "widely available on
`new Date()` + 30 months": it re-resolves on every build, and today matches Chrome, Edge
and Chrome for Android only — Safari 26.5 and Firefox 152 do not qualify. As a compilation
target it would tell autoprefixer and postcss-preset-env that no engine but Chromium
matters. The pinned `widely available on <date>` form is deterministic and broad, and the
Newly Available policy is retained as the *authoring* rule, which is what it always
described. The ADR now states that split explicitly.

**ADR-0003 also claimed Safari 18.2/18.3 support `anchor()` without `@position-try`.** They
support neither; CSS anchor positioning is absent below Safari 26.0. That matters for the
Tooltip and HoverCard work, where the consequence is not a missing viewport flip but an
overlay rendering in normal flow — the case the ADR itself calls unacceptable. Anchor
positioning now requires an `@supports` fallback.

Effects, measured rather than assumed. `dist/cadence-core.min.css` goes 87,335 → 85,822
bytes (12,589 → 12,483 gzipped), entirely from Firefox prefixes that are no longer
generated (`-moz-appearance`, `-moz-user-select`, `-moz-fit-content`) plus three
`-webkit-appearance` declarations. Vendor pseudo-elements with no standard equivalent are
untouched, as are the `-webkit-` prefixes Safari still needs. `::backdrop`, `:has()` and
`[popover]` all survive the changed postcss and cssnano pass. `apps/www` is unchanged to
within eight bytes — Next 16 already defaulted to a modern target and only consults
browserslist when a config exists.

Two supporting fixes this required:

- `turbo.json` had no `globalDependencies`, so the root `package.json` was not in the build
  hash — editing the floor and rebuilding returned `FULL TURBO` and served a `dist` built
  against the old target. Verified fixed in both directions.
- The browser-test project ran Chromium only, which cannot verify a multi-engine floor. It
  now runs Chromium, WebKit and Firefox. WebKit immediately surfaced that its Tab order
  skips buttons entirely (macOS full keyboard access is off by default), so the `Dialog`
  and `Drawer` focus-trap specs were asserting an engine preference rather than component
  behaviour. The modals themselves are correct on WebKit. That half of the assertion is now
  gated on a runtime probe, `tabVisitsButtons()` in `src/test-utils/keyboard.ts`; the half
  that matters, focus never escaping, stays unconditional.

`transpileClientSDK: true` is removed from `apps/www/next.config.js`. It declared IE11
support, which contradicts any modern floor, though it saved nothing — the option was
dropped in `@sentry/nextjs` v8 and this repo is on v10.
