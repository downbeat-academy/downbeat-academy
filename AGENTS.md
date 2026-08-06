# AGENTS.md

Operational contract for AI coding agents working in the Downbeat Academy monorepo.
This is the canonical agent-facing document; `CLAUDE.md` points here.

Each app and package also has its own `AGENTS.md` with local detail. Read the one for
the workspace you are changing — this file covers only what is true repo-wide.

Deep dives live in [`docs/`](./docs/README.md). Start with
[`docs/architecture/monorepo.md`](./docs/architecture/monorepo.md). For anything with a
visual surface, start instead with [`DESIGN.md`](./DESIGN.md).

---

## What this repo is

A pnpm + Turbo monorepo for Downbeat Academy, a music education platform, and for
Cadence — the design system it is built on. Maintained by a single developer.

**Apps** (all deployed on Railway):

| App | What it is | Port | Domain |
| --- | --- | --- | --- |
| `apps/www` | Main Next.js website. Content from Sanity, auth via OAuth. | 3000 | `downbeatacademy.com` |
| `apps/auth` | Centralized auth service. **OAuth 2.1 provider** for every other app. | 3002 | `auth.downbeatacademy.services` |
| `apps/cadence-links` | URL shortener. | 3001 | `links.downbeatacademy.services`, `dwnbe.at` |
| `apps/cms-sanity` | Sanity Studio v5. Source of all editorial content. | 3333 | Sanity-hosted |

**Packages:**

| Package | What it is | Has a build step? |
| --- | --- | --- |
| `packages/cadence-core` | React component library (27 components). The design system. | Yes — rollup |
| `packages/cadence-tokens` | Design tokens via style-dictionary. Emits `--cds-*` CSS custom properties. | Yes — style-dictionary |
| `packages/cadence-icons` | 79 icons, SVG → SVGR → React components. | Yes — vite |
| `packages/cadence-core-web-components` | Lit port of a 13-component subset. **No consumer yet.** | Yes — vite |
| `packages/auth-permissions` | Shared RBAC: roles, permission statements, route guards. | **No** — consumed as raw TypeScript source |
| `packages/email` | react-email templates. | **No** — consumed as raw source |
| `packages/typeface-favorit` | Favorit font files + CSS. | **No** — plain CSS |
| `packages/typeface-tiempos-text` | Tiempos Text font files + CSS. | **No** — plain CSS |

## Dependency graph

```
cadence-tokens ─┬─→ cadence-core ──┬─→ www
cadence-icons ──┤                  ├─→ auth
typeface-* ─────┘                  └─→ cadence-links

cadence-tokens ───→ cadence-core-web-components   (no consumer)
auth-permissions ─→ www, auth, cadence-links      (raw source, no build)
email ────────────→ auth only                     (raw source, no build)

cms-sanity ── no workspace dependencies at all
```

Three consequences worth internalizing:

1. **`cms-sanity` is fully isolated.** It does not use Cadence. Changing a component
   cannot break the Studio, and vice versa. Its coupling to `www` is by *convention* —
   a schema type name must match the GROQ query that reads it.
2. **`auth-permissions` and `email` have no build step.** They are imported as
   TypeScript/TSX source and transpiled by whichever app consumes them. Editing them
   takes effect immediately, with no rebuild — but a type error there surfaces in every
   consuming app's typecheck, not in the package's own.
3. **Everything else needs a build before apps see it.** `pnpm dev` runs
   `dependsOn: ["^build"]`, so Turbo handles this. If you are debugging a
   "component doesn't exist" error, this is almost always the cause — run
   `pnpm build:packages`.

## Commands

Run these from the repo root.

```bash
pnpm install                # pnpm 9 — see packageManager in package.json
pnpm build:packages         # build every package (do this after cloning)
pnpm dev                    # all apps
pnpm dev:fresh              # build packages first, then dev — use after pulling
```

Per target:

```bash
pnpm www:dev       pnpm www:build       pnpm www:cypress
pnpm auth:dev      pnpm auth:build
pnpm links:dev     pnpm links:build
pnpm cms:dev       pnpm cms:build
pnpm core:build    pnpm core:storybook      # Cadence React, Storybook on :6006
pnpm wc:build      pnpm wc:storybook        # Web components, Storybook on :6007
pnpm tokens:build  pnpm icons:build
pnpm email:dev
```

### The verification gate

**Before claiming any change is done, run:**

```bash
pnpm verify        # === turbo run lint typecheck test, across every workspace
```

It should finish in roughly 10 seconds warm and exit 0. Individually:

```bash
pnpm lint          # eslint — www, auth, cadence-links, cms-sanity
pnpm typecheck     # tsc --noEmit — every workspace
pnpm test          # vitest run — www, cadence-links, cadence-core,
                   #   cadence-core-web-components, cadence-icons, auth-permissions
```

`pnpm test` runs **once and exits**. If you ever see it hang, something has
regressed a `test` script back to bare `vitest` (watch mode) — fix that, don't
work around it.

E2E is separate and needs a database and real secrets; it does not run in `verify`:

```bash
pnpm --filter www test:e2e
pnpm --filter auth test:e2e
```

### What `verify` does *not* cover

Do not assume a green `verify` means everything is checked:

- **`pnpm format:check` is not gated.** 1063 files currently fail it. Do not run
  `pnpm format` across the repo as a side effect of another change; it belongs in a
  dedicated commit added to `.git-blame-ignore-revs`.
- **`cadence-core` has no linting.** It is the largest package and the only one with no
  ESLint setup at all.
- **`cms-sanity` has no tests.** Neither do `cadence-tokens`, `email`, or the typefaces.
- **`www` coverage is below its own thresholds** (72.5% lines against 80%), so the
  coverage job is non-blocking.
- **14 `radio-card` tests are quarantined** pending an accessibility fix. See
  [`docs/adr/0002-known-gaps.md`](./docs/adr/0002-known-gaps.md).

## Where to make a change

| You want to… | Go to | Then |
| --- | --- | --- |
| Add or change a UI component | `packages/cadence-core/src/components/` | Add to the `src/index.ts` barrel, `pnpm core:build`, check Storybook |
| Change a color, space, radius, type scale | `packages/cadence-tokens/tokens/` | `pnpm tokens:build && pnpm build:packages` |
| Add an icon | `packages/cadence-icons/src/assets/` (drop the SVG) | `pnpm icons:build` |
| Add or change a content type | `apps/cms-sanity/schemas/` | Register in `schemas/index.ts`, add to `deskStructure.ts`, then add the GROQ query in `www` |
| Render new content on the site | `apps/www/src/lib/queries/`, then the route | Wire Portable Text types in `src/components/rich-text/components.tsx` |
| Change roles or permissions | `packages/auth-permissions/src/` | Affects all three Next apps at once — no rebuild, but re-run `pnpm typecheck` |
| Change sign-in / OAuth behavior | `apps/auth/src/lib/auth/auth.ts` | Consumers must keep matching `genericOAuth` config |
| Change a transactional email | `packages/email/emails/` | `pnpm email:dev` to preview. Note: `www` does **not** use this package |

**Do not** add a component to an app when Cadence should own it. If `www` needs a
button, the button belongs in `cadence-core`. `apps/auth` currently violates this with
local copies of `link`, `tabs`, `toast`, and `ui/button` — treat those as debt, not
precedent.

## Conventions

### Typography: productive vs expressive

Cadence has two type families. Pick by asking **"is this application UI, or is this brand
and editorial?"**

- **Productive** (`--cds-typography-font-family-productive-*`;
  `<Text type="productive-body" | "productive-headline">`) — traditional web application
  elements: forms, buttons, tables, navigation, dashboards, settings, admin surfaces,
  in-app microcopy. **The default for UI.**
- **Expressive** (`--cds-typography-font-family-expressive-*`;
  `<Text type="expressive-body" | "expressive-headline">`) — brand-oriented and editorial:
  marketing headlines, hero sections, long-form article/handbook/lexicon bodies, quotes.

Never mix the two within one surface. An expressive headline above productive-body form
labels in a settings panel is a bug.

### Spelling: US English

**Write `color`, not `colour`.** US English throughout — prose, comments, commit messages,
PR descriptions, docs, skills, and agent definitions, not just code.

This is not a style preference. The code is US English and cannot be otherwise: the CSS
property is `color`, the tokens are `--cds-color-*`, the props are `color` and
`backgroundColor`, and `currentColor` is a keyword. Prose that says "colour" cannot be
grepped alongside the thing it describes, and an agent that reads "colour" in a doc will
write `--cds-colour-*` in a stylesheet.

The same applies to every other British form: `behavior`, `license`, `optimize`,
`initialize`, `analyze`, `recognize`, `organize`, `normalize`, `center`, `catalog`,
`modeling`, `labeled`.

Two exceptions, both about not breaking identifiers:

- **Never rewrite an identifier to match.** `aria-labelledby` is an ARIA attribute and
  `@img/colour` is a real npm package. Spelling is a rule about prose.
- **Never edit a `CHANGELOG.md`.** They are generated records of what was written at the
  time.

### Components

- Prefer a `cadence-core` component over hand-rolled markup, always.
- Folder-per-component: `x.tsx`, `x.module.css`, `types.ts`, `index.ts`, `__test__/`,
  `__docs__/`.
- Styling is CSS Modules referencing `--cds-*` custom properties. Never hardcode a
  color, spacing value, or font stack.
- A new component is invisible to consumers until it is re-exported from
  `packages/cadence-core/src/index.ts` — both the component *and* its `*Props` type.

### Browser support

- The floor is **Baseline Newly Available**. A feature at that level may be used directly.
- Anything below the floor is an enhancement over a working fallback, never the mechanism
  a component depends on to function. Say what happens without it.
- Nothing enforces this yet — there is no `browserslist` config. See
  [`docs/adr/0003-browser-support-floor.md`](./docs/adr/0003-browser-support-floor.md).

### TypeScript

- `apps/www` and `apps/auth` are `strict: false`; `cadence-links`, `cadence-core`, and
  `auth-permissions` are `strict: true`. Don't assume strictness.
- No shared base `tsconfig` — each workspace owns its own.

### Changesets

**Every change to a versioned package needs a changeset.** Add a markdown file under
`.changeset/`:

```md
---
'www': patch
'cadence-core': minor
---

What changed and why.
```

`patch` for fixes, `minor` for features, `major` for breaking changes. Merging to `main`
opens a "Version Packages" PR via `.github/workflows/release.yml`. Nothing is published
to a registry — versioning here exists for changelogs and internal coordination.

### Branches and commits

`feat/`, `fix/`, `chore/`, `docs/` prefixes. Never commit directly to `main`.

### Secrets

All secrets live in **Infisical**, injected at dev time — that is why the dev scripts
read `infisical run --path=/www -- next dev`. Never write a secret into a file. Never
commit `.env*` (now gitignored). `.mcp.json` is gitignored and holds local credentials.

## Gotchas that have bitten before

- **`www` silently renders empty content when Sanity is unconfigured.**
  `src/lib/sanity/sanity.client.ts` monkey-patches `fetch` to return `[]` if
  `NEXT_PUBLIC_SANITY_PROJECT_ID` is unset. Tests can pass against nothing.
- **jsdom does not resolve `var()`.** Any test asserting a computed style on a
  token-driven property will read the CSS initial value (`borderStyle: 'none'`), not the
  token. Assert the declared rule instead.
- **`www` and `auth` each own a copy of the auth Drizzle schema** for the *same* shared
  database, and migrations are `drizzle-kit push` with nothing committed. There is no
  drift detection. Be careful.
- **Railway internal hostnames (`*.railway.internal`) only resolve inside Railway.**
  Use the public `*.proxy.rlwy.net` host for database connections.
- Several dead paths exist and will mislead you — `sanity.fetch.ts` (unused draft-mode
  wrapper), `www`'s email sign-in server actions (the provider is disabled), and
  `apps/auth`'s configured-but-nonexistent `/consent` route. See
  [`docs/adr/0002-known-gaps.md`](./docs/adr/0002-known-gaps.md) before "fixing" any of
  them.

## Further reading

- [`docs/architecture/monorepo.md`](./docs/architecture/monorepo.md) — workspace graph, Turbo pipeline, build order
- [`docs/architecture/auth.md`](./docs/architecture/auth.md) — OAuth 2.1 topology and the role model
- [`docs/architecture/content.md`](./docs/architecture/content.md) — Sanity → GROQ → route → Portable Text
- [`docs/architecture/design-system.md`](./docs/architecture/design-system.md) — tokens → core → apps
- [`docs/architecture/infrastructure.md`](./docs/architecture/infrastructure.md) — Railway, Cloudflare, Infisical, observability
- [`DESIGN.md`](./DESIGN.md) — the ladder for making a visual decision
- [`docs/design/design-language.md`](./docs/design/design-language.md) — which token to use and why: ramps, semantic families, contrast, space, motion, iconography
- [`docs/design/figma-workflow.md`](./docs/design/figma-workflow.md) — how design and code stay in sync
- [`docs/adr/`](./docs/adr/) — architecture decisions and the known-gaps register
