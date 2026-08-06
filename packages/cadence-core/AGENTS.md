# AGENTS.md — `packages/cadence-core`

The Cadence React component library. 27 top-level components, 235 exported identifiers.
Consumed by `www`, `auth`, and `cadence-links`.

Repo-wide rules live in [`../../AGENTS.md`](../../AGENTS.md). The design-system pipeline
is in [`../../docs/architecture/design-system.md`](../../docs/architecture/design-system.md).

## The rule that matters most

**A component is invisible to consumers until it is re-exported from `src/index.ts` — both
the component and its `*Props` type.** There are no subpath exports. This is the number
one cause of "I added it but the app can't find it".

## Commands

```bash
pnpm core:build                            # clean && build:js && build:types
pnpm core:storybook                        # port 6006
pnpm --filter cadence-core test            # vitest run
pnpm --filter cadence-core test:watch
pnpm --filter cadence-core typecheck
pnpm core:build-storybook
```

There is **no `lint` script** — this package has no ESLint setup at all. See
[`../../docs/adr/0002-known-gaps.md`](../../docs/adr/0002-known-gaps.md).

## Anatomy of a component

```
src/components/button/
├── button.tsx           implementation
├── button-wrapper.tsx   optional composition layer
├── button.module.css    CSS Module
├── types.ts             ButtonProps and friends
├── index.ts             re-exports
├── __test__/            vitest specs
└── __docs__/            *.stories.tsx and *.mdx
```

Compound components nest: `form/` contains `input/`, `select/`, `checkbox/`, `radio/`,
`radio-card/`, `switch/`, `textarea/`, `field/`, `layout/`, `primitives/`,
`horizontal-wrapper/`.

## Adding a component

1. Create the folder above.
2. Style with CSS Modules against `--cds-*` tokens. **Never hardcode** a colour, spacing
   value, radius, or font stack. Use **semantic** colour tokens
   (`--cds-color-foreground-strong`), never palette tokens
   (`--cds-color-palette-blackberry-800`).
3. Pick the right type family — productive for chrome, expressive for content. See
   [`../../AGENTS.md`](../../AGENTS.md).
4. Write the test in `__test__/` and the story in `__docs__/`.
5. **Add both the component and its `*Props` type to `src/index.ts`.**
6. `pnpm core:build`, then check it in Storybook.
7. Add a changeset.

## Testing

`vite.config.ts` holds the vitest config (not a separate `vitest.config.ts` — that
differs from the apps): `environment: 'jsdom'`, `globals: true`,
`setupFiles: './setup-tests.ts'`, and **`css: true`** so CSS Modules compile and are
injected.

`setup-tests.ts` loads jest-dom matchers and mocks `ResizeObserver`, `scrollIntoView`,
and the pointer-capture APIs that Radix needs.

### Two testing rules that will bite you

**Class names are hashed at build time** into `cds-<component>-<name>--<hash>` by
`generateScopedName` in `vite.config.ts`. Assert against the imported module binding:

```ts
import s from '../button.module.css'
expect(el).toHaveClass(s.root)   // correct
expect(el).toHaveClass('root')   // never matches
```

**jsdom does not resolve `var()`.** A declaration like
`border: 1px solid var(--cds-color-border-faint)` computes to `borderStyle: 'none'`, and
`borderRadius` reads back as the literal string `"var(--cds-radii-medium)"`. The same
rule with a literal colour computes correctly. So a `getComputedStyle` assertion on any
token-driven property is meaningless — assert the **declared rule** instead, via
`declaredRule()` from `src/test-utils`.

### Shared test helpers

`src/test-utils/` holds helpers used across component suites. Import them by relative
path; they are **not** re-exported from `src/index.ts` and must not be — the barrel is the
public API. The folder is excluded from `tsconfig.json` exactly as `__test__/` is, so
nothing here reaches `dist/`.

| Helper | Use |
| --- | --- |
| `axeViolations(container, rules?)` | Runs axe and returns violations. Assert `toEqual([])` — a failure then names the rule and the node |
| `declaredRule(className)` | Declared `cssText` for one class. Pass the CSS-module binding, never a literal |
| `declaredRules(className)` | Every rule whose selector contains the class — for `:hover`, `[data-state]`, and other modifiers |
| `formatViolations(violations)` | Readable violation output when the raw array is too noisy |

`axeViolations` disables `color-contrast` and does not let you re-enable it: jsdom has no
layout engine, so axe cannot resolve computed colours and would report a false pass.
**Contrast is checked in a real browser** through the Storybook a11y addon panel, which is
registered in `.storybook/main.ts`.

## Build

- `build:js` — rollup → `dist/index.esm.js` and `dist/index.cjs.js`, both with a
  `'use client'` banner.
- `build:types` — separate `tsc --emitDeclarationOnly`.
- CSS — rollup extracts **all** styles, including `cadence-tokens`' compiled output, into
  one `dist/cadence-core.min.css`, exposed as the `./styles.css` export. This is why a
  token change requires rebuilding *this* package too.

## Storybook

Storybook 10 + react-vite on 6006. `.storybook/main.ts` globs `../src/**/*.stories.*` and
`**/*.mdx`, so `__docs__/` is picked up automatically. `viteFinal` aliases
`cadence-icons` to its `dist/` (falling back to source if unbuilt) and `cadence-tokens`
to its `dist/`. Published via Chromatic; served on Railway from `storybook-static`.

## Gotchas

- **14 `radio-card` tests are quarantined** (`it.skip`) pending an accessibility fix.
  `RadioCardItem` renders the Radix radio with `aria-hidden="true"` and `tabIndex={-1}`
  and moves selection onto a bare `<div onClick>`, so the control is invisible to
  assistive technology and unreachable by keyboard. **The tests are correct; the
  component is wrong.** Do not weaken or delete them — they are the acceptance criteria.
- **No linting exists here.** The old `.eslintrc` referenced six uninstalled plugins and
  was removed.
- `cadence-icons` and `cadence-tokens` appear in both `dependencies` and
  `devDependencies` — redundant but harmless.

## Related

- [`../../docs/architecture/design-system.md`](../../docs/architecture/design-system.md)
- [`docs/`](./docs/) — development guide and component reference
- [`../cadence-tokens/AGENTS.md`](../cadence-tokens/AGENTS.md)
