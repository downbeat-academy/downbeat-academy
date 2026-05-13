---
"www": patch
---

Resolve all 42 React Compiler lint warnings introduced by eslint-config-next 16.2.

- `react-hooks/error-boundaries`: remove try/catch wrappers around JSX in server page route functions; data fetching errors now propagate naturally via Next.js error handling
- `react-hooks/set-state-in-effect`: replace setState-in-effect patterns with `useMemo`, during-render state resets, and `useSyncExternalStore` for browser API subscriptions (window resize, mount detection)
- `react-hooks/immutability`: replace `window.location.href` assignment with `window.location.assign()` in header navigation
- `react-hooks/incompatible-library`: replace react-hook-form `watch()` with `useWatch()` and derive computed values in render instead of via effect
