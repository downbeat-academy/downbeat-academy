---
'cadence-core': minor
'www': patch
---

Migrate Link, Blockquote, SectionContainer, SectionTitle, SkeletonLoader, and AudioPlayer from www to cadence-core

- **cadence-core**: Six new design system components with Storybook stories and vitest unit tests:
  - **Link**: Polymorphic component with `as` prop for framework-agnostic routing (defaults to `<a>`, accepts Next.js `Link` or any element type). Supports `primary`, `secondary`, `brand`, and `inherit` color variants.
  - **Blockquote**: Quote display with optional attribution and source link.
  - **SectionContainer**: Layout wrapper with background and border color variants, polymorphic `tag` prop.
  - **SectionTitle**: Section heading with alignment, border, and background options.
  - **SkeletonLoader**: Wraps `react-loading-skeleton` with Cadence design token defaults.
  - **AudioPlayer**: Multi-file audio player system (AudioPlayer, Controls, DisplayTrack, ProgressBar, PlayerButton) with a generic `Track` interface decoupled from Sanity CMS.
- **www**: All imports updated from local `@components/*` to `cadence-core`. Link usages now pass `as={NextLink}` for Next.js routing. AudioPlayer consumers resolve Sanity asset URLs before passing tracks. Deleted 7 local component directories (link, blockquote, section-container, section-title, loader, audio, separator).
