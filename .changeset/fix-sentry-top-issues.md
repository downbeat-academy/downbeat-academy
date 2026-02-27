---
'www': patch
---

Fix top 5 Sentry issues for improved stability and reduced error noise

- **OSMD race condition**: Prevent `render()` calls before `load()` completes during component remount cycles by tracking load state with a dedicated ref.
- **OSMD mobile crash**: Wrap resize and transposition render calls in try/catch to gracefully handle OSMD internal layout errors on narrow viewports.
- **Music notation lazy loading**: Defer OSMD component loading with IntersectionObserver so notation blocks only fetch MusicXML files when near the viewport.
- **TableOfContents hydration mismatch**: Use a `hasMounted` pattern to ensure the initial client render matches SSR before applying viewport-based collapsed state.
- **Sentry noise filter**: Drop non-actionable `<unknown>` errors from `head > link` resource load failures via `beforeSend`.
