---
"www": patch
---

Add a Vitest unit/integration test layer for `apps/www` covering pure utilities,
Zod form schemas, the reading-length calculator, the music-notation transformers,
and the server actions (auth, email, profile). Fix bugs surfaced by the new tests:

- `limitDescription()` now returns its result and compares string length (it
  previously returned `undefined` for every input).
- `transformAccidental()` handles the `"sharp"` accidental (was a `"share"`
  typo) and returns `null` for unsupported input instead of `undefined`.
- `linkResolver()` drops a duplicate, unreachable `category` case.
- The update-password schema maps its "passwords do not match" error to the
  real `confirmNewPassword` field.
