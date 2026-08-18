# cadence-core

The React component library for the Cadence Design System. 27 top-level components, built
on design tokens from `cadence-tokens` and icons from `cadence-icons`.

Consumed by `www`, `auth`, and `cadence-links`.

```bash
pnpm core:build         # build the package
pnpm core:storybook     # interactive playground on :6006
```

## Usage

```tsx
import { Button, Card, Flex, Text } from 'cadence-core'
import 'cadence-core/styles.css'   // includes the design tokens
```

Everything is exported from a single root barrel — there are no subpath exports.

## Working in this package

**Read [`AGENTS.md`](./AGENTS.md) first.** Two things catch people out:

- A new component is invisible to consumers until it is added to `src/index.ts` —
  the component *and* its `*Props` type.
- Class names are hashed at build time, and jsdom does not resolve `var()`. Both affect
  how tests must be written.

## Documentation

- [`AGENTS.md`](./AGENTS.md) — conventions, testing rules, build pipeline, gotchas
- [`docs/`](./docs/) — development guide and component reference
- [`../../docs/architecture/design-system.md`](../../docs/architecture/design-system.md)

<!-- Railway PR-environment control test; this branch is not for merge. -->
<!-- redeploy trigger: pnpm 10 isolation step -->
