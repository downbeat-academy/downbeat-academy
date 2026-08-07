---
'www': minor
---

Instrument educational content and enrich person identification.

Nothing about content engagement was tracked, on a site whose whole purpose is
educational content. Adds `article_viewed`, `handbook_page_viewed`,
`lexicon_term_viewed`, `category_browsed`, and `contributor_viewed` via a shared
`TrackContentView` component, mounted from the server component that already fetched
the slug and title — so the analytics cannot disagree with what was rendered.

Adds `article_read`, which fires when the reader reaches the end of an article. Paired
with `article_viewed` it gives a completion rate, which is the question actually worth
asking of a lesson.

Adds `notation_rendered` on the first successful OSMD render, so it is possible to tell
whether the music-notation feature is used and whether it renders successfully.

`PostHogIdentify` now sets `email`, `role`, and `is_admin` alongside `name`. Without
`is_admin` there was no way to exclude staff traffic from product metrics.
