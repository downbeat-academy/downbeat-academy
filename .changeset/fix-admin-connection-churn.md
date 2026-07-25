---
"www": patch
---

Fix the two Sentry issues raised by the admin dashboard work: connection churn on `/admin` and a subscriber cache shape hazard.

`DOWNBEATACADEMY-4E` was filed as an N+1 query, but there is no per-row loop — `/admin` issues nine distinct queries and the repeated span is the connection acquire, one per query. The cost came from those acquires missing a warm pool: in production `/admin` averaged 30ms per `pg-pool.connect` while `GET /api/auth/[...all]` on the same pool averaged 0.23ms.

- `lib/db/drizzle.ts` passed a connection string straight to `drizzle()`, which builds a `pg.Pool` with zero options and so inherited pg's 30s idle timeout. Connections were dropped between page views and the next render paid a fresh TCP+TLS+auth handshake per query. The pools are now built explicitly with a 60s idle timeout, a 10s connection timeout, and `keepAlive`.
- There was also no `globalThis` guard, so dev HMR leaked a new pool on every edit and connections were never warm locally — the reason development connects averaged 180–260ms against the remote database versus 30ms in production. Guarded following the pattern already used in `cadence-links`.
- better-auth shares `authDb`, so session lookups get the warm pool too — a win on every authenticated route, not just `/admin`.
- The four scalar counts (`countUsers`, `countUsersSince` ×2, `activeSessionCount`) collapse into a single `dashboardStats()` round trip. Because the page fans them out through `Promise.all`, four separate queries meant four *concurrent* acquires against an empty pool, which is what forced new physical connections. `/admin` drops from ~9 queries to ~6.
- `requireAdmin` / `requireAuth` are wrapped in React `cache()`. `/admin/users` guards in both the admin layout and the page itself, and each call was a full better-auth session lookup.

`DOWNBEATACADEMY-4F` (`subscribers.filter is not a function`) was already fixed, but the change that fixed it altered `listSubscribers` from returning `Subscriber[]` to `{ subscribers, error }` without changing its `unstable_cache` key. Two versions reading the same persistent cache therefore collide in both directions: old code on a new-shape entry throws exactly the reported error, and new code on an old-shape entry destructures an array into `undefined` and throws instead.

- The cache key is now versioned, which is what makes a rollback safe.
- A shared `readCache()` narrows the entry with `Array.isArray` before use, so an unexpected shape degrades into the existing error banner rather than throwing. `countSubscribers` goes through it too — it runs on the overview page, so an unguarded throw there took down the whole dashboard and not just `/admin/subscribers`.
- `usersOverTime` gets the same versioned-key treatment. `MetricPoint` is JSON-native so a stale entry is harmless today, but the hazard is identical if its shape ever changes.

Sentry SDK configuration, which is why both issues were raised from localhost in the first place:

- `sentry.edge.config.ts` existed but nothing imported it, so edge-runtime errors went unreported. `instrumentation.ts` now uses the canonical `register()` runtime split and the server init moves to `sentry.server.config.ts`.
- Neither server config set `environment` — only `instrumentation-client.ts` did. Both set it now.
- `tracesSampleRate` drops to 0.1 outside production. Sampling every local request burns quota and distorts triage: a dev machine reaches the database over the internet, so its spans run roughly an order of magnitude slower than production and trip detectors production would not.
