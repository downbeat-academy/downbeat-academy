# Content architecture

All editorial content lives in Sanity and is rendered by `apps/www`. The two are coupled
only by naming convention — nothing checks that they agree.

## The chain

Adding a content type means touching five places, in this order. Missing the last one is
the most common mistake: the content fetches fine and then renders as nothing.

```
1. apps/cms-sanity/schemas/<documents|objects>/<type>.ts     define the schema
2. apps/cms-sanity/schemas/index.ts                          register it (flat array)
3. apps/cms-sanity/deskStructure.ts                          surface it in the Studio
4. apps/www/src/lib/queries/sanity.<type>.ts                 GROQ query + barrel export
5. apps/www/src/app/…                                        the route that calls it
   └─ and, if it is an *object* used inside rich text:
      apps/www/src/components/rich-text/components.tsx       register the renderer
```

There is **no type generation** between Sanity and `www`. A field renamed in the Studio
breaks `www` at runtime, not at build time. `pnpm typecheck` will not catch it.

## Studio — `apps/cms-sanity`

Sanity Studio v5. `sanity.config.ts` wires projectId `v5w3t766`, dataset `production`,
and four plugins: `dashboardTool`, `structureTool` (with the hand-rolled
`deskStructure`), `media` (sanity-plugin-media), and `visionTool`.

Schemas are registered in a **flat array** in `schemas/index.ts`. There is no
auto-discovery — a file that exists but is not in that array does nothing. (`video.ts` is
exactly this: present, commented out at line 33, and importing an uninstalled
`react-player`. It is excluded from typecheck.)

`deskStructure.ts` builds the sidebar by hand, with `react-icons/bi` icons. Singletons
use `S.editor().documentId('settings')` so there is one and only one document.

### Document types (23 registered)

| Type | Rendered by `www`? | Where |
| --- | --- | --- |
| `article` | ✅ | `(pages)/(educational-content)/articles[/[slug]]` |
| `handbook` | ✅ | `(pages)/(educational-content)/handbook[/[slug]]` |
| `lexicon` | ✅ | `(pages)/(educational-content)/lexicon[/[slug]]` |
| `category` | ✅ | `(pages)/(educational-content)/categories/[slug]` |
| `person` | ✅ | `(pages)/contributors[/[slug]]` |
| `page` | ✅ | `(pages)/[slug]` — the catch-all |
| `linkInBio` | ✅ | `(pages)/(marketing)/links` |
| `navigation` | ✅ | Site chrome |
| `banner` | ✅ | Site chrome |
| `settings` | ⚠️ | Singleton; read indirectly |
| `landingPage` | ❌ | Registered, no query, no route |
| `course` | ❌ | Registered, no query, no route |
| `curriculum` | ❌ | Registered, no query, no route |
| `lesson` | ❌ | Registered, no query, no route |
| `podcast` | ❌ | Registered, no query, no route |
| `resource` | ❌ | Registered, no query, no route |
| `snippet` | ❌ | Registered, no query, no route |
| `newsletter` | ❌ | Registered, no query, no route |
| `errorPage` | ❌ | Registered, no query, no route |
| `brandAsset` | ❌ | Studio-only asset management |
| `difficulty` | ❌ | Taxonomy — referenced by other documents |
| `instrument` | ❌ | Taxonomy — referenced by other documents |
| `genre` | ❌ | Taxonomy — referenced by other documents |

The ❌ rows are **not dead code**. They are modelled ahead of the site — the course and
curriculum tree in particular is the backbone of planned functionality. Editors may
already have content in them. Do not delete them because "nothing renders them".

### Object types

Structural: `richText` (the Portable Text type), `mainImage`, `metadata`,
`moduleContent`, `blockquote`, `fileDownload`, `handbookReference`, `changelogEntry`,
`audio`, `documentUpload`, `socialLink`, `form` (+ `input`, `textarea`), `navigationSection`,
and the link family `link` / `customLink` / `internalLink` / `externalLink`.

Music notation: `musicNotation`, `flatNotation`, `inlineChord`, `inlineMusicText`,
`musicText`, plus primitives `accidental`, `clef`, `barValue`, `rhythmicValue`,
`musicSymbol`. These are the domain-specific heart of the CMS and back the
OpenSheetMusicDisplay rendering in `www`.

## Fetching — `apps/www`

One GROQ file per content type in `src/lib/queries/`, re-exported from
`src/lib/queries/index.ts`:

```
sanity.articles.ts     sanity.categories.ts   sanity.contributors.ts
sanity.handbook.ts     sanity.homepage.ts     sanity.lexicon.ts
sanity.link-in-bio.ts  sanity.navigation.ts   sanity.pages.ts
```

Pages call the client directly:

```ts
sanityClient.fetch(query, params, { next: { revalidate: 60 } })
```

### Two traps in the client layer

**`sanity.client.ts` fakes success when unconfigured.** If
`NEXT_PUBLIC_SANITY_PROJECT_ID` is unset it monkey-patches `sanityClient.fetch` to
return `[]`. This exists so CI can build without Sanity credentials, but it means a
misconfigured environment renders empty pages instead of erroring, and tests can pass
against nothing. If content is mysteriously missing, check that variable first.

**`sanity.fetch.ts` is dead.** It implements a proper draft-mode-aware wrapper —
`server-only`, `draftMode()`, `previewDrafts` perspective, tag-based revalidation — and
**nothing imports it**. `src/components/preview-provider/` is dead for the same reason.
Draft preview is effectively unwired. See
[`../adr/0002-known-gaps.md`](../adr/0002-known-gaps.md).

A legacy monolith `src/lib/sanity/sanity.queries.ts` also survives alongside the
per-type files and duplicates the article queries. Prefer `src/lib/queries/`.

## Rendering rich text

`src/components/rich-text/components.tsx` maps Sanity types to React. This is the
registration point that is easy to forget.

| Portable Text `types` | Renders |
| --- | --- |
| `blockquote` | Pull quote |
| `mainImage` | Sanity image with `@sanity/image-url` |
| `fileDownload` | Downloadable asset |
| `handbookReference` | Cross-link into the handbook |
| `musicNotation` | OpenSheetMusicDisplay score |
| `inlineChord` | Inline chord symbol |
| `inlineMusicText` | Inline music glyphs |

| Portable Text `marks` | Renders |
| --- | --- |
| `link` | External link |
| `internalLink` | Resolved via `src/utils/link-resolver.ts` |

An object type present in `richText` but absent from this map renders as **nothing** —
silently, with no warning.

`src/components/module-content/module-renderer.tsx` does the same job for the
`moduleContent` page-builder array.

## Adding a content type: worked example

Say you want `podcast` (already modelled, not yet rendered) to appear on the site:

1. Schema already exists and is registered — skip steps 1–3.
2. Add `apps/www/src/lib/queries/sanity.podcasts.ts` with the GROQ, export it from
   `src/lib/queries/index.ts`.
3. Add `apps/www/src/app/(pages)/(educational-content)/podcasts/page.tsx` and
   `[slug]/page.tsx`, calling `sanityClient.fetch` with `{ next: { revalidate: 60 } }`.
4. If the schema's body uses `richText` with an object type not already in the map,
   register it in `src/components/rich-text/components.tsx`.
5. If it should be linkable from rich text, teach `src/utils/link-resolver.ts` the route.
6. `pnpm verify`, then check the page renders with real content.

## Related

- [`monorepo.md`](./monorepo.md) — why `cms-sanity` shares no code with `www`
- [`../adr/0002-known-gaps.md`](../adr/0002-known-gaps.md) — the unused draft-mode path
