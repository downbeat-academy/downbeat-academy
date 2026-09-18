---
'www': patch
---

Fix `notation_rendered` firing many times per page view.

The de-duplication guard lived in a `useRef` inside `OpenSheetMusicDisplay` and was keyed
on the MusicXML `file`. Both halves of that were wrong for an event whose payload is
`{ slug }`:

- the component mounts once per notation excerpt, so a page with six excerpts fired six
  events all carrying the same slug
- transposing swaps the file being rendered, so every key change reset the guard and fired
  again

Neither is visible in the data, because `slug` is the only property the event carries. In
production this produced 19–31 events in a single session on one article — a chart that
looks plausible and overcounts by roughly 10–20×.

The guard now lives at module scope in `notation-analytics.ts` and is keyed on the slug, so
one page view produces one event however many excerpts it holds and however often the
reader transposes. Navigating away and back still counts as a new view, matching
`TrackContentView`. A null or empty slug is never captured.
