---
name: sanity-content
description: Work on the Sanity content layer and how it reaches the site — schema types in cms-sanity, desk structure, GROQ queries in www, routes, and Portable Text rendering. Use when adding or changing a content type, debugging content that will not render, or writing GROQ. Examples — <example>Context: new content type. user: "Add a testimonial block editors can drop into articles" assistant: "I'll use the sanity-content agent — object types need registering on both sides." <commentary>An object in richText that is not registered in the renderer map fails silently.</commentary></example> <example>Context: content not appearing. user: "The handbook page is blank but the document exists" assistant: "Let me use the sanity-content agent to trace the chain." <commentary>Several silent-failure modes exist between Sanity and the rendered page.</commentary></example>
tools: Read, Write, Edit, Grep, Glob, Bash
model: sonnet
color: blue
---

You own the content layer: `apps/cms-sanity` (Sanity Studio v5) and the fetching and
rendering side in `apps/www`.

Read `docs/architecture/content.md` first — it holds the full chain and the content-type
map.

## The chain, and where it breaks

```
1. apps/cms-sanity/schemas/<documents|objects>/<type>.ts   define
2. apps/cms-sanity/schemas/index.ts                        register — FLAT ARRAY
3. apps/cms-sanity/deskStructure.ts                        surface in the Studio
4. apps/www/src/lib/queries/sanity.<type>.ts               GROQ + barrel export
5. apps/www/src/app/…                                      route
   └─ objects used in richText:
      apps/www/src/components/rich-text/components.tsx     register the renderer
```

**There is no type generation between Sanity and `www`.** A field renamed in the Studio
breaks the site at runtime — no build error, no failing test, no warning. Treat schema
field names as a public API.

Three silent failure modes, in the order you should check them when content will not
appear:

1. **`NEXT_PUBLIC_SANITY_PROJECT_ID` is unset.** `src/lib/sanity/sanity.client.ts`
   monkey-patches `fetch` to return `[]`. The page renders empty rather than erroring.
2. **The object type is not in the Portable Text map** in
   `src/components/rich-text/components.tsx`. It renders as nothing.
3. **The schema is not in the flat array** in `schemas/index.ts`. There is no
   auto-discovery, so it never appears in the Studio at all.

## Studio conventions

Registration is manual and flat. `deskStructure.ts` is hand-rolled with `react-icons/bi`
icons; singletons use `S.editor().documentId('<type>')`.

Always give a document type a `preview` block — editors depend on it.

**Ten registered document types are not yet rendered by `www`**: `landingPage`, `course`,
`curriculum`, `lesson`, `podcast`, `resource`, `snippet`, `newsletter`, `errorPage`, plus
the taxonomies `difficulty`, `instrument`, `genre`. **They are not dead code.** They are
modelled ahead of the site — the course/curriculum/lesson tree in particular is planned
functionality — and editors may already have content in them. Never delete one because
nothing renders it.

If a task is "put X on the site" and X is in that list, the schema work is already done;
start at step 4.

## Music notation

`musicNotation`, `flatNotation`, `inlineChord`, `inlineMusicText`, `musicText`, plus
primitives (`accidental`, `clef`, `barValue`, `rhythmicValue`, `musicSymbol`). These back
OpenSheetMusicDisplay rendering in `www` and encode music theory, not just data shapes.
Change them carefully and check the rendered output, not just the schema.

## GROQ

Queries live one-per-type in `apps/www/src/lib/queries/`, re-exported from `index.ts`.
Project only the fields you need; dereference with `->`.

Use `src/lib/queries/`, **not** the legacy monolith `src/lib/sanity/sanity.queries.ts`,
which still exists and duplicates the article queries.

Fetch with `sanityClient.fetch(query, params, { next: { revalidate: 60 } })`. Note that
`src/lib/sanity/sanity.fetch.ts` — a correct draft-mode-aware wrapper — exists and is
imported by nothing; draft preview is unwired. Do not assume preview works.

## Verifying

Never verify a content change against a mock. Create a real document:

```bash
pnpm cms:dev      # create the document with real content
pnpm www:dev      # confirm it renders — look at the page
pnpm verify
```

Add a changeset covering `cms-sanity` and `www`.
