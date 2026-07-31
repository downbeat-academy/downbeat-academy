<!--
Keep this short. The commit message carries the detail; this is for the reviewer.
-->

## What and why

<!-- One or two sentences. Lead with the problem, not the diff. -->

**Notion task:** <!-- link, or "n/a" -->

## Affected workspaces

<!-- Tick what this touches. Package changes affect every consuming app. -->

- [ ] `apps/www`
- [ ] `apps/auth` ⚠️ OAuth provider — affects sign-in for every app
- [ ] `apps/cadence-links`
- [ ] `apps/cms-sanity`
- [ ] `packages/cadence-core`
- [ ] `packages/cadence-tokens` ⚠️ requires rebuilding `cadence-core`
- [ ] `packages/cadence-icons`
- [ ] `packages/auth-permissions` ⚠️ lands in all three Next apps at once
- [ ] `packages/email`
- [ ] Other / docs only

## Verification

<!-- What you actually ran and looked at. Be specific; "tested locally" says nothing. -->

- [ ] `pnpm verify` passes
- [ ] Changeset added (or: docs-only, none needed)

Beyond the gate:

<!--
Delete what does not apply.
- Storybook: rendered the component, tabbed through it
- App: ran `pnpm www:dev` and checked the page
- Sanity: created a real document and confirmed it renders
- Auth: walked sign-in AND sign-out across apps
- DB: reviewed the `drizzle-kit push` diff
-->

## Screenshots

<!-- Required for anything visual. Before/after if it is a change. -->

## Notes for the reviewer

<!--
Anything deliberately left undone, a trade-off you made, or a part you are unsure
about. If this is part of a stack, say what it is stacked on.
-->
