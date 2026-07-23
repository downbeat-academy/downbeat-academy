---
"www": patch
---

Prevent dynamic page `generateMetadata` from throwing on missing content.

The articles, handbook, lexicon, categories, and contributors routes re-threw errors from their `catch` blocks and accessed Sanity fields without null checks, so a slug resolving to `null` (unpublished, deleted, draft-only, or stale ISR paths) surfaced as a thrown error in Sentry. These routes now null-check the fetched document (and nested metadata) and return empty metadata instead of throwing, mirroring the existing `[slug]` route. Also hardened the shared helpers: `getOgTitle` no longer emits `"undefined ♪ Downbeat Academy"` for missing titles, and `limitDescription` now correctly returns a truncated value.
