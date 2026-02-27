---
'cadence-core': minor
'cms-sanity': minor
'www': minor
---

Add changelog feature for tracking content changes

Introduces a changelog system that lets editors document meaningful content updates in Sanity CMS, displayed to readers via a slide-out drawer on article, handbook, and lexicon pages.

- **cadence-core**: New Drawer component built on Radix UI Dialog, with slide-in animation, scrollable body, left/right side support, and full keyboard accessibility. Includes DrawerContent, DrawerTrigger, DrawerHeader, DrawerBody, DrawerFooter, DrawerTitle, and DrawerDescription sub-components.
- **cms-sanity**: New `changelogEntry` object schema (date, summary, description) and `changelog` array field added to article, handbook, and lexicon document types with a dedicated Changelog tab.
- **www**: New ChangelogDrawer component with an "Updated" badge trigger near content metadata. GROQ queries updated to fetch changelog data for all educational content types.
