---
"cadence-core": minor
"www": patch
---

Migrate Card component from www app to cadence-core package

- Move Card, CardContent, and CardImage components to cadence-core
- Add comprehensive Storybook stories for Card component variants and usage patterns
- Add basic test coverage for Card components including props, tag rendering, and children handling
- Update www app to use Card components from cadence-core instead of local components
- Remove original Card component files from www app
- Simplify CardImage component to work without Next.js dependencies for better portability