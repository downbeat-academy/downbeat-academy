---
"cadence-core": minor
"www": patch
---

Migrate Banner component from www app to cadence-core package

- Move Banner, BannerActions, and BannerContent components to cadence-core
- Add comprehensive Storybook stories for Banner component variants
- Add basic test coverage for Banner components
- Update www app to use Banner components from cadence-core instead of local components
- Remove original Banner component files from www app