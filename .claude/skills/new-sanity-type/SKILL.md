---
name: new-sanity-type
description: Add a Sanity content type and wire it all the way through to rendering on www — schema, registration, desk structure, GROQ query, route, and Portable Text renderer. Use when adding or surfacing any CMS content type.
---

# New Sanity content type

Five steps across two apps. **The last step is the one that gets missed**, and its
failure mode is silent: content fetches correctly and renders as nothing.

Full context: [`docs/architecture/content.md`](../../../docs/architecture/content.md).

## First: is it a document or an object?

- **Document** — standalone, queryable, has its own entry in the Studio.
  `article`, `handbook`, `person`.
- **Object** — embedded inside a document. `mainImage`, `blockquote`, `inlineChord`.

The distinction changes steps 3 and 5.

**Also check whether it already exists.** Ten document types are registered but not yet
rendered by `www` — `landingPage`, `course`, `curriculum`, `lesson`, `podcast`,
`resource`, `snippet`, `newsletter`, `errorPage`, and the taxonomies `difficulty`,
`instrument`, `genre`. If the ask is "put courses on the site", the schema already exists
and you start at step 4.

## 1. Define the schema

`apps/cms-sanity/schemas/documents/<type>.ts` or `schemas/objects/<type>.ts`.

Use `defineType` / `defineField`. Copy the shape of a comparable existing type. For a
document, include a `slug` field with a source, and `metadata` if it needs SEO. Give it a
`preview` block — editors rely on it.

## 2. Register it

`apps/cms-sanity/schemas/index.ts` — import it and add it to the flat array.

**There is no auto-discovery.** A schema file not in that array does nothing at all: no
error, no warning, it simply never appears.

## 3. Surface it in the Studio

`apps/cms-sanity/deskStructure.ts`. Add a list item in the right group, with an icon from
`react-icons/bi`.

Objects usually need nothing here — they appear inside their parent document. Singletons
use `S.editor().documentId('<type>')`.

Check it: `pnpm cms:dev`, then find it in the sidebar and create a document.

## 4. Query it from `www`

`apps/www/src/lib/queries/sanity.<types>.ts` — one file per type, plural filename by
convention. Export the query, then re-export from `src/lib/queries/index.ts`.

Model it on an existing query. Project only the fields you need. Dereference references
with `->`.

> Use `src/lib/queries/`, not the legacy monolith `src/lib/sanity/sanity.queries.ts`,
> which still exists and duplicates the article queries.

## 5. Render it

**For a document** — add the route under `apps/www/src/app/(pages)/`, usually in the
`(educational-content)` group:

```ts
const data = await sanityClient.fetch(query, params, { next: { revalidate: 60 } })
```

Add `generateStaticParams` and `generateMetadata` if it is a `[slug]` route.

**For an object used inside `richText`** — register the renderer in
`apps/www/src/components/rich-text/components.tsx`, under `types` (block-level) or
`marks` (inline).

**This is the step that gets missed.** An object present in the content but absent from
that map renders as nothing, with no warning anywhere.

If the type should be linkable from rich text, also teach
`apps/www/src/utils/link-resolver.ts` how to build its URL.

## Verify

```bash
pnpm cms:dev      # create a real document with real content
pnpm www:dev      # confirm it renders — not just that the page loads
pnpm verify
```

**Check the rendered page, not the fetch.** If `NEXT_PUBLIC_SANITY_PROJECT_ID` is unset,
`sanity.client.ts` monkey-patches `fetch` to return `[]` — so an empty page can mean a
missing env var rather than missing content.

Add a changeset covering `cms-sanity` and `www`.

## Checklist

- [ ] Schema defined, with a `preview`
- [ ] Added to the flat array in `schemas/index.ts`
- [ ] Visible in the Studio via `deskStructure.ts`
- [ ] GROQ query added and exported from `src/lib/queries/index.ts`
- [ ] Route added, or renderer registered in `rich-text/components.tsx`
- [ ] `link-resolver.ts` updated if linkable
- [ ] Verified against a real document in a running app
- [ ] Changeset for `cms-sanity` and `www`

## Related

- [`apps/cms-sanity/AGENTS.md`](../../../apps/cms-sanity/AGENTS.md)
- [`apps/www/AGENTS.md`](../../../apps/www/AGENTS.md)
