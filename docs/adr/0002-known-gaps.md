# 2. Known gaps register

**Status:** Living document
**Date:** 2026-07-29

## Context

Several things in this repo look broken, and are. They are known, they are not currently
being fixed, and each one has a reason. Without a register, every reader — human or
agent — rediscovers them, and some will "fix" them in ways that cause real damage.

**Read this before concluding something is an accident.**

Each entry states what is wrong, why it is still that way, and what fixing it would take.
When you close a gap, delete its entry in the same PR.

---

## Severity: high

### Drizzle runs `push`, with no committed migrations

**What.** All four drizzle-kit configs declare `out: './drizzle'`, and every app exposes
a `db:migrate` script, but **no `drizzle/` directory exists anywhere**. There are no SQL
migrations and no `meta/_journal.json`. The real workflow is `drizzle-kit push`, which
diffs the schema against the live database and applies changes directly.

**Why it matters.** `push` has no history and no rollback, and can be destructive — it
will happily drop a column. Nothing runs migrations in CI or at deploy time, so schema
changes reach production by someone running `push` against it by hand. There is no record
of what changed or when.

**Why it is still like this.** Converting to versioned migrations against a live shared
production database is genuinely risky work: the first generated migration has to be
reconciled with the existing schema and baselined, or it will try to recreate everything.
That deserves its own carefully-tested change, not a side quest.

**To fix.** Baseline the current schema as migration `0000`, mark it applied in each
environment, switch `db:push` usage to `db:generate` + `db:migrate`, and add a migrate
step to the Railway deploy. Do the auth database last — it is shared by three apps.

### `www` and `auth` each own a copy of the auth schema

**What.** `apps/www/src/lib/db/schema/auth.ts` and `apps/auth/src/lib/db/schema/auth.ts`
both define `user`, `session`, `account`, `verification`, `organization`, `member`,
`invitation` — for the **same** shared database. `cadence-links` has a third copy.
`apps/auth` additionally owns the OAuth provider tables the others do not need.

**Why it matters.** Two sources of truth for one schema, kept in sync by hand, with
`push`-based deployment and no drift detection. Editing one and pushing can silently
contradict the other.

**Why it is still like this.** The obvious fix — extract a shared `db-schema` package —
is straightforward but touches all three apps' database layers and interacts with the
migrations gap above. Sequence it after migrations exist.

**To fix.** Extract `packages/auth-schema` as a source package (following
`auth-permissions`), have all three apps import it, and keep the provider-only tables in
`apps/auth`.

---

## Severity: medium

### `cadence-core` has no linting

**What.** The largest package in the repo, ~142 source files, has no ESLint setup. Its
`.eslintrc` was removed because it referenced six plugins (`@typescript-eslint/parser`,
`eslint-plugin-react`, `eslint-plugin-prettier`, `eslint-config-prettier`,
`eslint-plugin-react-hooks`, `eslint-plugin-storybook`) and `eslint` itself — none of
which were installed. It had been dead for a long time.

**Why it is still like this.** Standing it up means adding those dependencies and then
triaging whatever violations appear across 142 files. That is a real piece of work with
its own review burden, and bundling it into a repo-health change would have made that
change unreviewable.

**To fix.** Add a flat `eslint.config.mjs` matching the other workspaces, add the
dependencies, add a `lint` script, then fix or explicitly disable each rule class in a
dedicated PR.

### `apps/www` does not meet its own coverage thresholds

**What.** `apps/www/vitest.config.ts` sets thresholds of 80% lines/functions/statements
and 75% branches over a deliberately scoped surface (`src/utils`, `src/lib/types`,
`src/actions`, the music-notation transformers, one calculator). Actual: **72.53% lines,
73.89% statements, 68.83% branches**. Functions passes at 90.56%.

**Why it is still like this.** The `www Coverage` job in `ci-monorepo.yml` is marked
`continue-on-error: true` so the report is still collected and visible without a
permanently red pipeline. Writing enough tests to clear the thresholds is real work —
mostly the error paths in `src/actions/**` — and does not belong inside an
infrastructure change.

**To fix.** Drive the number up (start with `src/actions/**`), then remove
`continue-on-error` from the job. Do **not** lower the thresholds to match reality —
that silently ratchets the standard down.

### 1063 files fail `pnpm format:check`

**What.** Prettier is configured at the root (tabs, no semicolons, single quotes) but has
never been applied repo-wide. The `format:check` script exists; CI deliberately does not
gate on it.

**Why it is still like this.** Running `pnpm format` produces a 1063-file diff that
destroys `git blame` for the whole repo. It needs to be a single isolated commit.

**To fix.** One commit that only runs `pnpm format`, its SHA added to a
`.git-blame-ignore-revs` file, then re-enable the `Format check` step in
`.github/workflows/ci-monorepo.yml` (the step is present and commented with this note).

### Draft-mode preview is wired but unused

**What.** `apps/www/src/lib/sanity/sanity.fetch.ts` implements a correct draft-aware
fetch — `server-only`, `draftMode()`, `previewDrafts` perspective, tag-based
revalidation — and **nothing imports it**. Every page calls `sanityClient.fetch` directly.
`src/components/preview-provider/` is dead for the same reason.

**Why it matters.** Editors have no working preview of unpublished content, and the code
suggests otherwise.

**To fix.** Route page fetches through `sanityFetch`, add the draft-mode enable/disable
API routes, and configure the Studio's presentation tool to point at them. Then delete
the legacy monolith `src/lib/sanity/sanity.queries.ts`, which duplicates the article
queries that already live in `src/lib/queries/`.

### Six status color pairings fail WCAG AA

**What.** Measured 2026-08-05 against `packages/cadence-tokens/tokens/color/`. The neutral
foregrounds are all comfortably safe; the status roles are not:

| Pairing                                         | Ratio | Needs                                |
| ----------------------------------------------- | ----- | ------------------------------------ |
| `foreground.warning` on any light ground        | 1.9   | 4.5 text / 3.0 non-text — fails both |
| `foreground.success` on any light ground        | 2.3   | 4.5 / 3.0 — fails both               |
| `foreground.critical` on any light ground       | 3.2   | 4.5 for text — fails                 |
| `foreground.interactive` on any light ground    | 4.1   | 4.5 for text — fails                 |
| `foreground.high-contrast` on `surface.warning` | 3.7   | 4.5 for text — fails                 |
| `foreground.high-contrast` on `surface.success` | 3.7   | 4.5 for text — fails                 |

`foreground.brand` (9.1) and `foreground.high-contrast` on `surface.brand` (15.3),
`surface.interactive` (5.6), and `surface.critical` (4.8) pass.

**Why it matters.** `foreground.interactive` is the link color, so the most common
colored text on the site is below AA. `warning` and `success` fail even the 3:1 non-text
bar, which means they are not usable as icon or border colors either — a status
communicated by those colors alone is not communicated at all to a significant number of
readers.

**Why it is still like this.** The palette was tuned for hue relationships across six
ramps at consistent steps, and contrast was not measured per semantic pairing afterwards.
Nothing checks it: `pnpm verify` has no contrast step, and jsdom cannot resolve `var()`, so
a unit test could not check it either.

**To fix.** Retune the affected semantic tokens — most likely mapping the failing
`foreground.*` roles to a darker step (600 or 700) and the failing `surface.*` roles
darker, rather than changing the palette itself. Verify every pairing after, not just the
ones changed. Longer term, add a contrast check over the built `tokens.css` to CI; it is
one of the few design properties that can be tested deterministically. Do not work around
individual failures in component CSS.

### `cadence-core` references palette tokens directly in 21 CSS Modules

**What.** `--cds-color-palette-*` appears 162 times across 21 of the 51 CSS Modules in
`packages/cadence-core`, against the rule — stated in the root `AGENTS.md`,
`docs/architecture/design-system.md`, `packages/cadence-tokens/AGENTS.md`, and the
`/new-component` skill — that components consume semantic tokens only. Affected:
`audio-player` (3 files), `badge`, `blockquote`, `button`, `data-table`, `dialog`,
`drawer`, `dropdown-menu`, `hover-card`, `link`, `sidebar`, `summary`, `tabs`, `toast`,
and `form/{checkbox,checkbox-card,radio,radio-card,switch}`.

**Why it matters.** The semantic layer exists so a palette re-tune or a theme can change
values in one place. A component bound to a palette step will not follow either. This is
the single largest obstacle to the theming architecture in
`docs/proposals/tokenization-proposal.md` — dark mode requires the indirection these files
skip. It also means generating a Figma library from these components would bind Figma
variants to raw colors rather than to semantic variables.

**Why it is still like this.** The semantic layer was extended after several of these
components were written, and nothing enforces the rule — `cadence-core` has no linting, so
there is no check that would catch a new occurrence either.

**To fix.** Per component, map each palette reference to the semantic role it is standing
in for, adding semantic tokens where none exists (`badge`'s `light` style needs
surface-tint roles that the system does not currently have). Then add a stylelint rule
banning `--cds-color-palette-*` outside `cadence-tokens`, which depends on the
`cadence-core` linting gap above. Do this per component, not in one sweep — several
require a design decision, not a rename.

### `cadence-core`'s rollup does not inline token CSS, though the docs say it does

**What.** `packages/cadence-core/rollup.config.js` resolves
`../cadence-tokens/dist/tokens.css`. The real path is
`../cadence-tokens/dist/web/tokens.css`; `dist/` contains only `web/`. The token CSS is
therefore never inlined — `dist/cadence-core.min.css` contains 135 `var(--cds-*)`
references and zero `--cds-*` definitions.

**Why it matters.** Three documents assert the opposite.
`docs/architecture/design-system.md` and `packages/cadence-tokens/AGENTS.md` both explain
that a token change requires rebuilding `cadence-core` _because_ tokens are inlined — the
instruction is harmless but the reason given is wrong. More consequentially,
`packages/cadence-core/README.md` advertises importing `cadence-core/styles.css` on its
own, which yields completely unstyled components. Apps work only because
`apps/www/src/styles/index.css` and its equivalents import `tokens.css` on the line above.

**Why it is still like this.** It fails silently and in the direction that looks fine:
every existing consumer already imports both files.

**To fix.** Correct the path in `rollup.config.js`, rebuild, and confirm
`dist/cadence-core.min.css` contains a `:root` block. Then the three documents become
true. Best done together with the export-map fix below, since both change how the package
is consumed. Do not fix the docs to match the bug — the inlining is the intended
behavior.

---

## Severity: low

### `www` has dead email sign-in server actions

**What.** `apps/www/src/actions/auth/sign-in.ts` and `sign-up.ts` call
`auth.api.signInEmail` / `signUpEmail`, and `(auth)/sign-in/sign-in-form.tsx` posts to
them — but `www`'s better-auth instance no longer enables `emailAndPassword`. Those calls
fail. The rendered `(auth)/sign-in/page.tsx` bypasses the form entirely and triggers the
OAuth redirect on mount.

**Why it matters.** It reads as a working alternative sign-in path. It is not. Email and
password authentication belongs to `apps/auth` now.

**To fix.** Delete the actions and the form, keeping the redirect page.

### `apps/auth` configures a `/consent` page that does not exist

**What.** `oauthProvider` is configured with `consentPage: '/consent'`, and no `/consent`
route exists in `apps/auth/src/app/`.

**Why it has not bitten.** Both registered clients are first-party and have
`skip_consent = true`, so the consent page is never reached. It would 404 the moment a
third-party client is registered.

**To fix.** Build the route, or remove the config until it is needed.

### `cadence-tokens` export map points at the wrong file

**What.** The `exports` key `"./dist/web.tokens.css"` resolves to `dist/web/tokens.scss`,
and `.` also resolves to the `.scss`. There is no way to import the compiled CSS through
the package's public API.

**Why it matters.** Every consumer works around it with a raw
`node_modules/cadence-tokens/dist/web/tokens.css` path, which is brittle and bypasses
package resolution entirely.

**To fix.** Correct the export map to `{ "./tokens.css": "./dist/web/tokens.css",
"./tokens.scss": "./dist/web/tokens.scss" }`, then update the four consumers
(`apps/www/src/styles/index.css`, `apps/auth/src/styles/index.css`,
`packages/cadence-core/.storybook/preview.ts`, and the rollup config).

### `apps/auth` duplicates cadence-core components locally

**What.** `apps/auth/src/components/` contains local `link`, `tabs`, `toast`, and
`ui/button` implementations, despite the app depending on `cadence-core`.

**To fix.** Replace with the `cadence-core` equivalents. Treat the local copies as debt,
not as precedent — new UI in `apps/auth` should use `cadence-core`.

### `packages/email` declares a `main` that does not exist

**What.** `"main": "index.js"`, and there is no `index.js` at the package root.
`apps/auth` works around it by importing the deep path `email/emails/index`.

**To fix.** Add a root barrel or an `exports` map. Also decide whether `www` should use
this package — it currently duplicates email logic in `src/actions/email/`.

### `cms-sanity/schemas/objects/video.ts` is parked

**What.** Commented out at `schemas/index.ts:33`, imports an uninstalled `react-player`,
and is excluded from typecheck in `apps/cms-sanity/tsconfig.json`.

**To fix.** Finish and register it — adding `react-player` and removing the tsconfig
exclusion — or delete it.

### Packages are versioned but never published

**What.** `cadence-core`, `cadence-icons`, `cadence-core-web-components`, and `email` are
not marked `private`, and changesets bumps their versions, but `release.yml` passes no
`publish` input and no `NPM_TOKEN`. Nothing reaches a registry.

**Why it is fine.** Every consumer uses `workspace:^`. Versioning exists for changelogs
and coordination. Recorded only so nobody "fixes" it by wiring up a publish step that
was never wanted.

### Two `transition` tokens carry the same duration

**What.** In `packages/cadence-tokens/tokens/animation/transition.json`, `transition.09`
and `transition.03` are both `100ms ease-in-out`. The ladder is otherwise monotonic, so
`09` reads as the slowest step and behaves as one of the fastest.

**Why it matters.** Only mildly — nothing is broken, but anything reaching for `09`
expecting the top of the scale gets the wrong feel, and the duplicate makes the scale
untrustworthy to read.

**To fix.** Either give `09` a distinct duration above `08`, or remove it and migrate any
consumer. Check usage before changing the value: a consumer relying on the current
behavior would change visibly.

### The `transition` and `easing` tokens do not compose

**What.** `transition.*` tokens are complete `all <duration> ease-in-out` shorthands with
the curve baked in; `easing.*` tokens are standalone curves. There is no way to use an
`easing` token with a `transition` token without overriding the shorthand.

**Why it is like this.** The `transition` ladder predates the `easing` tokens, which were
added by `docs/proposals/tokenization-proposal.md`.

**To fix.** Split the ladder into `duration.*` tokens and compose duration, property, and
easing at the call site — the direction the tokenization proposal already points. Until
then, `docs/design/design-language.md` documents the workaround.

**Note.** The `@divriots/style-dictionary-to-figma` devDependency in `cadence-tokens` is
unused and unwired — that is not a gap, it is the intended Figma export target, pending
the work in `docs/design/figma-workflow.md`.

### A toast raised from a modal dialog is painted behind it

**What.** `ToastViewport` promotes itself into the top layer as `popover="manual"` and
re-asserts that promotion whenever `modal/modal-surface.tsx` dispatches `cds-dialog-open`.
The intent, from task B.1b, was that a toast raised while a modal `<dialog>` is open stays
readable. **It does not.** A modal dialog paints above a manual popover regardless of
insertion order, and re-showing the popover does not lift it.

Measured against the raw platform in C.1, with no components involved, identically in
Chromium, WebKit and Firefox:

```
popover alone            → the popover is the topmost element
after dlg.showModal()    → the DIALOG is topmost, popover still :popover-open
after hide + showPopover → the DIALOG is still topmost
```

Opening a modal dialog makes everything outside it inert, and an inert top-layer element
renders below the modal. Insertion order cannot beat that.

**Why it matters.** Three admin dialogs call `toast()` on their failure path —
`admin/users/_components/ban-user-dialog.tsx`, `role-change-dialog.tsx` and
`admin/subscribers/_components/remove-subscriber-dialog.tsx`. That is precisely when the
user needs to read the message, and it is behind the backdrop.

**Why it is still like this.** It was believed fixed. B.1b reasoned about top-layer
ordering and shipped the promotion without a test, and both the epic and
`packages/cadence-core/CHANGELOG.md` record it as resolved. C.1 wrote the first test that
checks it, which is how the claim was found to be wrong. The promotion is kept because it
genuinely works against ordinary stacked content — that half is real and is covered by a
passing spec.

**To fix.** Options, none of them free: render the viewport inside the topmost open
`<dialog>` while one exists; make those three dialogs report failure inline instead of
through a toast; or stop using modal dialogs for flows that can fail. The first is the
smallest behavioural change and the most invasive structurally. Pinned by
`toast.browser.test.tsx`, which asserts the _current_ behaviour — if an engine ever fixes
this, that spec fails and this entry should be deleted rather than the expectation
relaxed.

---

### `dropdown-menu` stays on Radix while everything else leaves

**What.** `cadence-core` is removing Radix from 9 of its 12 wrapping components.
`packages/cadence-core/src/components/dropdown-menu/` is deliberately excluded and keeps
`@radix-ui/react-dropdown-menu`. As that work lands, the package will look half-migrated:
most components on the platform, one still wrapping a dependency.

**Why it is fine.** A menu needs typeahead, submenu safe-triangle tracking, roving focus,
and collision-aware positioning. That is an estimated 5–8 days with real accessibility
risk, and this repo has one maintainer. The `RadioCardItem` entry above is what happens
when interaction semantics get hand-rolled here without that budget.

The cost is honest and was accepted: because `react-menu` depends on popper, roving-focus,
collection, dismissable-layer, focus-scope, portal, and presence, retaining this one
package retains roughly 25 of the ~38 transitive `@radix-ui/*` packages. Most of the
dependency-count win is deferred with it. This is a trade of dependency hygiene against
accessibility risk, not an oversight.

**Recorded so nobody finishes the job unprompted.** An agent seeing eleven components
migrated and one not will try to close the gap.

**To fix.** Only after native positioning has proven itself in `Tooltip`. Tracked as
`Radix C.4 — Re-decide whether to rebuild DropdownMenu` on the Remove Radix Dependencies
epic. Deleting this entry requires that re-decision, not just an implementation.

Relatedly: consolidating the remaining Radix packages onto the single `radix-ui` package
was considered and **rejected** — it declares all 56 primitives, which enlarges the
installed set rather than shrinking it, and `.github/dependabot.yml` already batches
`@radix-ui/*` updates into one PR.

---

## Related

- [`0001-record-architecture-decisions.md`](./0001-record-architecture-decisions.md)
- [`0003-browser-support-floor.md`](./0003-browser-support-floor.md)
- [`0004-design-source-of-truth.md`](./0004-design-source-of-truth.md)
- [`../architecture/monorepo.md`](../architecture/monorepo.md)
- [`../design/design-language.md`](../design/design-language.md)
- [`../../AGENTS.md`](../../AGENTS.md)
