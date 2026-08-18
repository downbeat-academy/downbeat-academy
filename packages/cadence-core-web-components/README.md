# cadence-core-web-components

A [Lit](https://lit.dev)-based port of a 13-component subset of `cadence-core`, so Cadence
can be used outside React.

> **Exploratory.** Nothing in this monorepo consumes it yet. A change in `cadence-core`
> does not need mirroring here.

```bash
pnpm wc:storybook     # port 6007
pnpm wc:build
```

## Components

`badge`, `banner`, `blockquote`, `button`, `flex`, `grid`, `link`, `section-container`,
`section-title`, `separator`, `skeleton-loader`, `summary`, `text`.

Styling consumes the same `--cds-*` custom properties from `cadence-tokens` as the React
library — custom properties pierce the shadow DOM, which is what makes this work.

ESM-only output (`dist/index.es.js`). Tests use `@open-wc/testing`.

## Documentation

- [`AGENTS.md`](./AGENTS.md)
- [`../cadence-core/`](../cadence-core/) — the React library this mirrors

<!-- Railway PR-environment control test; this branch is not for merge. -->
