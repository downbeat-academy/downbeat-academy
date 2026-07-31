# AGENTS.md — `packages/cadence-core-web-components`

A [Lit](https://lit.dev)-based port of a 13-component subset of `cadence-core`, so that
Cadence can be used outside React.

Repo-wide rules live in [`../../AGENTS.md`](../../AGENTS.md).

## Status: exploratory. Nothing consumes this.

No app in the monorepo imports it. It exists to keep the option open, and to validate
that the token layer works outside React.

Practical consequences:

- **A change in `cadence-core` does not need mirroring here.** Do not treat parity as a
  requirement, and do not let this package block work on the React library.
- Do not add a dependency on it from an app without deciding that is the direction.
- It is versioned by changesets like everything else, but at `0.2.0` and moving slowly.

## Commands

```bash
pnpm wc:storybook                                     # port 6007
pnpm wc:build                                         # clean && vite build && tsc --emitDeclarationOnly
pnpm --filter cadence-core-web-components test        # vitest run
pnpm --filter cadence-core-web-components typecheck
pnpm wc:build-storybook
```

## Layout

Same folder-per-component convention as `cadence-core`, including `__test__/` and
`__docs__/`:

```
src/components/<name>/
├── <name>.ts        Lit element
├── <name>.css       or styles co-located per the component
├── index.ts
├── __test__/        @open-wc/testing
└── __docs__/        *.stories.ts
```

The 13 components: `badge`, `banner`, `blockquote`, `button`, `flex`, `grid`, `link`,
`section-container`, `section-title`, `separator`, `skeleton-loader`, `summary`, `text`.

## Key differences from `cadence-core`

| | `cadence-core` | this package |
| --- | --- | --- |
| Framework | React 18/19 | Lit 3 |
| Output | ESM + CJS | **ESM only** (`dist/index.es.js`) |
| Bundler | rollup | vite |
| Tests | vitest + Testing Library (jsdom) | vitest + `@open-wc/testing` |
| Storybook | react-vite, port 6006 | web-components-vite, port 6007 |
| Deps | Radix, TanStack Table, etc. | `lit` and `cadence-tokens` only |

Styling still consumes `--cds-*` custom properties from `cadence-tokens` — that is the
whole point, and the reason this package is a useful test of the token layer. Note that
custom properties **do** pierce the shadow DOM, which is why the approach works.

## Related

- [`../cadence-core/AGENTS.md`](../cadence-core/AGENTS.md)
- [`../../docs/architecture/design-system.md`](../../docs/architecture/design-system.md)
