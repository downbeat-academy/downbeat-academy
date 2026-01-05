---
"cadence-core": major
---

**BREAKING CHANGE**: Refactor Button component to use `children` prop instead of `text`

The Button component now follows standard React patterns by using `children` for button content instead of the `text` prop.

### Migration

```jsx
// Before
<Button text="Click me" variant="primary" />
<Button text={isLoading ? 'Loading...' : 'Submit'} />

// After
<Button variant="primary">Click me</Button>
<Button>{isLoading ? 'Loading...' : 'Submit'}</Button>
```

### Changes

- `children` prop is now **required** (was optional)
- `text` prop has been **removed** (was deprecated)
- All Button usages in www and cadence-links apps have been migrated
