# Monorepo architecture

pnpm workspaces + Turbo. Four apps, eight packages, one developer.

## Layout

`pnpm-workspace.yaml` declares three globs:

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
  - 'packages/email/.react-email'
```

The third is unusual: react-email generates a preview app inside `packages/email`, and it
has to be a workspace member for its dependencies to resolve.

## The dependency graph

```
                    ┌──────────────────┐
  cadence-tokens ──▶│                  │
  cadence-icons ───▶│   cadence-core   │──┬──▶ www
  typeface-favorit ▶│                  │  ├──▶ auth
  typeface-tiempos ▶└──────────────────┘  └──▶ cadence-links

  cadence-tokens ─────▶ cadence-core-web-components   (nothing consumes this yet)

  auth-permissions ───▶ www, auth, cadence-links
  email ──────────────▶ auth

  cms-sanity ─────────  (no workspace dependencies)
```

Every internal dependency is declared `workspace:^` and sits in `dependencies`, not
`peerDependencies`. The only peer dependencies anywhere are `react` / `react-dom` on
`cadence-core` and `cadence-icons`.

### Two classes of package

This distinction matters more than the graph itself.

**Built packages** — `cadence-tokens`, `cadence-icons`, `cadence-core`,
`cadence-core-web-components`. Each has a `build` script and publishes `dist/`. Consumers
import from `dist/`, so **a source change is invisible until the package is rebuilt**.
Turbo's `dependsOn: ["^build"]` handles this for `dev`, `build`, `test`, and `typecheck`,
but if you run a workspace's own command directly you can see stale output.

**Source packages** — `auth-permissions`, `email`, `typeface-favorit`,
`typeface-tiempos-text`. No build script at all. Their `main`/`exports` point straight at
source (`auth-permissions` → `./src/index.ts`) or at a CSS file (the typefaces →
`index.css`). Consumers transpile them as part of their own build.

Consequences of the source-package pattern:

- Edits take effect immediately — no rebuild, no stale `dist/`.
- They contribute **nothing** to the Turbo build graph, so `pnpm build:packages` appears
  to skip them. That is correct, not a bug.
- A type error inside `auth-permissions` does not fail `auth-permissions`' own typecheck
  boundary in isolation the way a built package would; it surfaces wherever it is
  imported. Changing it means re-running `pnpm typecheck` across the repo.
- `packages/email` declares `"main": "index.js"`, and **that file does not exist**.
  `apps/auth` works around it by importing the deep path `email/emails/index`.

### `cms-sanity` is deliberately isolated

The Studio shares no code with the rest of the repo. Its relationship to `www` is a
naming contract, not a compile-time one: a schema type registered in
`apps/cms-sanity/schemas/index.ts` is read by a GROQ query in
`apps/www/src/lib/queries/`. Nothing enforces that the two agree — rename a field in the
Studio and `www` fails at runtime, not at build time. See
[`content.md`](./content.md).

## The Turbo pipeline

`turbo.json` defines seven tasks:

| Task | `dependsOn` | Outputs | Notes |
| --- | --- | --- | --- |
| `build` | `^build` | `.next/**` (minus cache), `dist/**` | Also treats `.env` / `.env.local` as inputs |
| `test` | `^build` | — | Must build dependencies first, or component tests import stale code |
| `typecheck` | `^build` | — | Same reason: types come from `dist/*.d.ts` |
| `test:coverage` | `^build` | `coverage/**` | Only `www` defines this |
| `lint` | — | — | No dependency on build; eslint reads source |
| `dev` | `^build` | — | `cache: false`, `persistent: true` |
| `storybook` | `^build` | — | `cache: false`, `persistent: true` |
| `build:storybook` | `^build` | `storybook-static/**` | Deployed as its own Railway service |

`^build` means "build all of this workspace's dependencies first". That single directive
is what makes `pnpm dev` work from a clean checkout.

There is no `start`, `format`, or `db:*` task registered in Turbo. Those exist only as
package scripts and run per-workspace.

## Build order

Turbo derives it, but knowing it helps when debugging:

```
1. cadence-tokens        (style-dictionary → dist/web/tokens.css + .scss)
2. cadence-icons         (SVGR output → vite → dist/)
   (typeface-* and auth-permissions have no build and are skipped)
3. cadence-core          (rollup; inlines the token CSS into dist/cadence-core.min.css)
4. www / auth / cadence-links / cms-sanity
```

`cadence-core`'s rollup step **inlines** `cadence-tokens`' compiled CSS into its own
`dist/cadence-core.min.css`. So the token package must be built before the component
package, and apps that import `cadence-core/styles.css` get tokens for free.

## Verification

```bash
pnpm verify     # turbo run lint typecheck test
```

Roughly 10s warm across 21 tasks. See [`../../AGENTS.md`](../../AGENTS.md) for what it
covers and — importantly — what it does not.

## Versioning

Changesets. `.changeset/config.json` sets `baseBranch: main`,
`updateInternalDependencies: patch`, `access: restricted`, `commit: false`.

Merging to `main` triggers `.github/workflows/release.yml`, which runs
`changesets/action` and opens a "Version Packages" PR. Merging *that* bumps versions and
writes `CHANGELOG.md` files.

**Nothing is ever published to a registry.** The workflow passes no `publish` input and
no `NPM_TOKEN`. `cadence-core`, `cadence-icons`, `cadence-core-web-components`, and
`email` are not marked `private`, which makes this look like an oversight — it is not.
All consumers use `workspace:^`. Versioning exists for changelogs and coordination.

## Package manager

pnpm 9, pinned via `packageManager` in the root `package.json` and matched in both
workflows. The lockfile is `lockfileVersion: 9.0`. `pnpm install --frozen-lockfile`
should always succeed on a clean checkout — if it does not, the lockfile and manifests
have drifted.

## Related

- [`design-system.md`](./design-system.md) — what the Cadence packages actually contain
- [`auth.md`](./auth.md) — why `auth-permissions` is shared as source
- [`../adr/0002-known-gaps.md`](../adr/0002-known-gaps.md) — the unfinished edges
