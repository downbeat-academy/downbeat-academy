# AGENTS.md — `apps/cms-sanity`

Sanity Studio v5. The source of all editorial content rendered by `apps/www`.

Repo-wide rules live in [`../../AGENTS.md`](../../AGENTS.md). The full content chain is in
[`../../docs/architecture/content.md`](../../docs/architecture/content.md).

## Deliberately isolated

This app has **zero workspace dependencies**. It does not use Cadence, tokens, icons, or
`auth-permissions`. Changing a component cannot break the Studio, and changing the Studio
cannot break a component.

Its coupling to `www` is a **naming convention, not a compile-time contract**. A schema
type registered here is read by a GROQ query in `apps/www/src/lib/queries/`. Nothing
verifies they agree — rename a field and `www` breaks at runtime, silently, with no
build error and no failing test.

Project `v5w3t766`, dataset `production`.

## Commands

```bash
pnpm cms:dev                      # sanity dev (port 3333)
pnpm cms:build
pnpm --filter cms-sanity lint     # eslint, flat config
pnpm --filter cms-sanity typecheck
pnpm --filter cms-sanity deploy   # deploys the Studio
pnpm --filter cms-sanity deploy-graphql
```

There are no tests in this app.

## Layout

```
sanity.config.ts     projectId, dataset, plugins
sanity.cli.ts
deskStructure.ts     hand-rolled sidebar, react-icons/bi
eslint.config.mjs    flat config (@sanity/eslint-config-studio v6)
schemas/
├── index.ts         FLAT ARRAY — the registry
├── documents/       23 document types
└── objects/         structural + music-notation objects
utils/               getTime, slugify, timestamp-format
static/
```

## Key patterns

### Registration is manual and flat

`schemas/index.ts` is a single flat array. **There is no auto-discovery.** A schema file
that exists but is not in that array does nothing at all — no error, no warning, it
simply never appears in the Studio.

Adding a type means: write the file, import it, add it to the array, then add it to
`deskStructure.ts` so editors can find it.

### Desk structure

`deskStructure.ts` builds the sidebar by hand with grouped list items. Singletons use
`S.editor().documentId('settings')` so exactly one document exists — `settings`,
`brandAsset`, `navigation`, and `banner` are handled this way under "General settings".

### Documents vs objects

**Documents** are standalone, queryable, have their own URL in the Studio: `article`,
`handbook`, `lexicon`, `page`, `landingPage`, `errorPage`, `person`, `category`, `course`,
`curriculum`, `lesson`, `podcast`, `resource`, `newsletter`, `snippet`, `navigation`,
`banner`, `settings`, `brandAsset`, `difficulty`, `instrument`, `genre`, `linkInBio`.

**Objects** are embedded inside documents: `richText` (the Portable Text type),
`mainImage`, `metadata`, `moduleContent`, `blockquote`, `fileDownload`,
`handbookReference`, `changelogEntry`, `audio`, `documentUpload`, `socialLink`, `form`
(+ `input`, `textarea`), `navigationSection`, and the link family `link` / `customLink` /
`internalLink` / `externalLink`.

**An object used inside `richText` must also be registered in
`apps/www/src/components/rich-text/components.tsx`, or it renders as nothing** — silently.
This is the most-missed step in the whole chain.

### Music notation

`musicNotation`, `flatNotation`, `inlineChord`, `inlineMusicText`, `musicText`, plus
primitives in `objects/primitives/`: `accidental`, `clef`, `barValue`, `rhythmicValue`,
`musicSymbol`. These back the OpenSheetMusicDisplay rendering in `www` and are the
domain-specific heart of the CMS. Treat them carefully — they encode music theory, not
just data shapes.

## Gotchas

- **Ten document types are registered but not rendered by `www`**: `landingPage`,
  `course`, `curriculum`, `lesson`, `podcast`, `resource`, `snippet`, `newsletter`,
  `errorPage`, plus the taxonomies `difficulty`, `instrument`, `genre`. **They are not
  dead code** — they are modelled ahead of the site, and editors may already have content
  in them. Do not delete them because nothing renders them.
- **`schemas/objects/video.ts` is parked.** Commented out at `schemas/index.ts:33`,
  imports an uninstalled `react-player`, and is excluded in `tsconfig.json`. Finish it or
  delete it deliberately — don't stumble into it.
- **The `layout` prop on dashboard widgets takes an object**, not a string:
  `{ width: 'medium' }`, per `@sanity/dashboard` v5's `LayoutConfig`.
- **No `.env.example` exists** for this app, unlike the other three.

## Don't

- Don't import from `cadence-core` or any workspace package here. The isolation is
  deliberate.
- Don't rename a field without grepping `apps/www/src/lib/queries/` first — nothing will
  warn you.
- Don't delete an unrendered document type.

## Related

- [`../../docs/architecture/content.md`](../../docs/architecture/content.md) — the full chain and type map
- [`../www/AGENTS.md`](../www/AGENTS.md) — the consuming side
