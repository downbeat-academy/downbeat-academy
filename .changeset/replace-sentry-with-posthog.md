---
'www': minor
---

Replace Sentry with PostHog error tracking (DBA-289). Browser exceptions are captured by posthog-js (`capture_exceptions: true`) and `global-error.jsx`; server errors are captured by `onRequestError` through a new `posthog-node` client, attributed to the visitor via their PostHog cookie. `@sentry/nextjs`, its config files, and `withSentryConfig` are removed.
