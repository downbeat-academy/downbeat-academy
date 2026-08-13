---
'cadence-core': patch
---

Add a browser-mode vitest project, so behaviour jsdom cannot host has somewhere to live.

jsdom does not implement `HTMLDialogElement` — `showModal` and `close` are `undefined` on
every installed version (26.1.0, 28.1.0, 29.1.1). Focus trapping, `Escape`, top-layer
placement and background inerting are therefore unverifiable in the default suite, and
those are precisely the four behaviours the upcoming native-`<dialog>` rewrite exists to
obtain. Stubbing `showModal` in a setup file would assert against the stub rather than the
platform, which is the `form/radio-card/` failure mode the test-backfill gate exists to
prevent.

`vite.config.ts` now defines two vitest projects. `jsdom` keeps every existing spec and
stays the default `pnpm test`, so the shared CI job never downloads a browser. `browser`
runs `src/**/*.browser.test.{ts,tsx}` under Playwright/Chromium via `pnpm test:browser`,
in its own workflow (`.github/workflows/ci-cadence-browser.yml`). Both projects set
`extends: true` and so share the CSS-module hashing, which matters because browser specs
assert on the same `cds-*` class bindings.

`Dialog`'s five modal-behaviour tests move out of the fenced block in `dialog.test.tsx`
into `dialog.browser.test.tsx`. They pass unchanged against the current Radix
implementation — which is the point: the harness is proven against the component being
replaced, before anything is rewritten.

No source or public API change. Phase C reuses this project for CSS anchor positioning,
which jsdom equally cannot compute.
