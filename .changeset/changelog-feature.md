---
'cadence-core': minor
'cms-sanity': minor
'www': minor
---

Add changelog feature for tracking content changes

Introduces a changelog system that lets editors document meaningful content updates in Sanity CMS, displayed to readers via a slide-out drawer on content pages.

- **cadence-core**: New Drawer component built on Radix UI Dialog, with slide-in animation, scrollable body, left/right side support, and full keyboard accessibility. Includes DrawerContent, DrawerTrigger, DrawerHeader, DrawerBody, DrawerFooter, DrawerTitle, and DrawerDescription sub-components.
- **cms-sanity**: New `changelogEntry` object schema (date, summary, description) and `changelog` array field added to all educational content document types — articles, resources, snippets, handbook, lexicon, courses, lessons, and curricula — each with a dedicated Changelog tab (groups added where applicable).
- **www**: New ChangelogDrawer component with an "Updated" badge trigger near content metadata. GROQ queries updated to fetch changelog data for educational content types.
