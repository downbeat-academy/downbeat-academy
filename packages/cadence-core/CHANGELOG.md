# cadence-core

## 4.0.0

### Major Changes

- 17303d1: # Migrating to `cadence-core` 4.0.0

  Nine components moved off Radix UI onto the platform. **Radix packages declared by
  `cadence-core` went from 12 to 4**, and six left `pnpm-lock.yaml` entirely.

  Most consumers need no changes. The breaking part is that prop types are now hand-written
  rather than inherited from Radix primitives, so props you were getting for free — `asChild`
  on parts that never used it, `forceMount`, `onEscapeKeyDown`, `onPointerDownOutside` — no
  longer exist unless they were reimplemented deliberately.

  ## Removed exports

  | Removed                                    | Replacement                                                                                                                                      |
  | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
  | `DialogPortal`, `DrawerPortal`             | Nothing. A modal `<dialog>` sits in the top layer, above everything, without moving in the DOM — the portal has no job left. Delete the wrapper. |
  | `DialogOverlay`, `DrawerOverlay`           | `::backdrop`. It already _is_ a full-viewport box painted beneath the dialog. Style `dialog::backdrop` instead of rendering an element.          |
  | `DialogOverlayProps`, `DrawerOverlayProps` | —                                                                                                                                                |

  `DialogProps` and `DrawerProps` are now exported; they were previously internal.

  ## Changed props

  | Component          | Before                                                        | After                                                                                           |
  | ------------------ | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
  | `Checkbox`         | `checked="indeterminate"`                                     | `indeterminate={true}` — native inputs model this as a DOM property, not a value                |
  | `TabsContent`      | `forceMount` also removed `hidden`                            | `forceMount` keeps children mounted and nothing more; the panel stays `hidden` while unselected |
  | `Tabs`             | tab stop lived on the `tablist`, handed off on first keypress | the selected tab carries `tabindex="0"` from first render (plain WAI-ARIA APG)                  |
  | `Dialog`, `Drawer` | `aria-describedby` always emitted                             | emitted only when a `Description` is rendered, so it no longer points at a nonexistent id       |

  `asChild` **is** retained on `DialogTrigger`, `DialogClose`, `DrawerTrigger` and
  `DrawerClose`, reimplemented on an in-house `Slot`. It behaves as before, including
  child-props-win merging.

  ## Styling

  `Dialog` and `Drawer` are now `<dialog>` elements. If you were targeting their content by
  tag or overriding position:
  - The scrim moved from an `.overlay` element to `dialog::backdrop`.
  - A modal `<dialog>` is placed by the user agent at `inset: 0; margin: auto`. `Drawer`
    overrides the inline margins to pin to an edge; anything else you position will need to
    account for that too.
  - **A `display` declaration on a `<dialog>` overrides the UA's
    `dialog:not([open]) { display: none }`.** If you style one, scope the layout to `[open]`
    or the closed element renders. This bit both `Dialog` and `Drawer` during the migration.
  - Background scroll is locked with `html:has(.content[open])`, not JavaScript.

  `Tabs` still emits `data-state="active" | "inactive"`, now as its own attribute rather
  than Radix's, so existing selectors keep working.

  ## Testing against this release

  `cadence-core` now runs two vitest projects. `pnpm test` is jsdom and covers markup and
  wiring; `pnpm test:browser` runs Playwright/Chromium for behaviour jsdom cannot host.

  That split is not optional for `<dialog>`: **jsdom does not implement
  `HTMLDialogElement`** — `showModal` and `close` are `undefined`, and an unopened
  `<dialog>` is `display: none` from the UA stylesheet. If your own tests assert on a
  Cadence `Dialog` or `Drawer`, expect `getByRole('dialog')` not to find a closed one, and
  do not stub `showModal`: that asserts against the stub.

  ## What still wraps Radix

  `dropdown-menu`, `toast`, `tooltip` and `hover-card` — a deliberate retention recorded in
  `docs/adr/0002-known-gaps.md`, not an unfinished job. They need collision-aware
  positioning, typeahead and submenu tracking that the platform does not yet supply cheaply.

  `@radix-ui/react-tabs` also remains in `pnpm-lock.yaml`, but not for `cadence-core`:
  `apps/auth` declares it for its own duplicate tabs component.

  ## Fully removed from the lockfile

  `react-separator`, `react-checkbox`, `react-radio-group`, `react-switch`,
  `react-collapsible`, `react-dialog`. Distinct `@radix-ui/*` packages in the lockfile: 38 → 31. `react-slot` is no longer declared or bundled by `cadence-core` but remains
  transitively, because the four retained packages depend on it — it leaves when the last of
  them does.

- dc2e8fc: `Checkbox` is now a native `<input type="checkbox">` instead of
  `@radix-ui/react-checkbox`. Radix rendered a `<button role="checkbox">` plus a second,
  hidden `<input>` bubbled in purely so the control would participate in form submission;
  that hack is gone, and there is now exactly one input in the DOM. Form participation,
  label association, `required` validity, and Space-to-toggle all come from the platform.

  **Breaking.** The change API is now native:

  | Before (Radix)                                                                  | After (native)                                            |
  | ------------------------------------------------------------------------------- | --------------------------------------------------------- |
  | `onCheckedChange={(checked) => …}`                                              | `onChange={(e) => … e.target.checked}`                    |
  | `checked="indeterminate"`                                                       | `indeterminate={true}`, independent of `checked`          |
  | `CheckboxProps extends ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>` | `extends Omit<ComponentPropsWithoutRef<'input'>, 'type'>` |
  | ref is `HTMLButtonElement`                                                      | ref is `HTMLInputElement`                                 |

  `onCheckedChange` is removed rather than kept as a shim — the point of the migration is to
  own a native surface, and a Radix-shaped callback name would outlive the dependency.
  `indeterminate` is a DOM property with no HTML attribute, so it is set imperatively via
  ref; it is orthogonal to `checked`, which is what the DOM has always modelled and what
  `checked="indeterminate"` obscured.

  `Checkbox` has no external consumers — it is used only by `form/checkbox-card/`, which is
  commented out of the form barrel and does not ship. That call site is updated.

  Styling moved off Radix's `[data-state]` and `[data-disabled]` attributes onto the native
  `:checked`, `:indeterminate` and `:disabled` pseudo-classes, with `appearance: none` on
  the input. Because a checkbox is a void element and cannot contain the check mark, the
  icon is now an `aria-hidden` sibling overlaid on the input and revealed by CSS — which
  keeps uncontrolled (`defaultChecked`) usage working, since React never learns the value in
  that case. Visual output is unchanged.

  Testing: the previous 13 tests asserted the Radix surface and two of them were vacuous
  (`expect(querySelector(…)).toBeDefined()` passes on `null`). Replaced with 29 tests
  covering the native contract — form participation via `FormData`, the `indeterminate` DOM
  property, Space toggling but not Enter, and label association — plus 7 new axe tests.
  Adds a `declaredSelectors()` helper to `src/test-utils/`, since asserting that styling
  moved from `[data-state]` to `:checked` needs rule selectors, and `declaredRules()`
  returns only rule bodies.

  `@radix-ui/react-checkbox` is dropped from `dependencies` and the Rollup `external` array,
  and leaves `pnpm-lock.yaml` entirely.

- 1eabdb6: Rebuild `Dialog` on the native `<dialog>` element with `showModal()`.

  The platform supplies focus trapping, `Escape` to dismiss, top-layer placement,
  `::backdrop` and background inerting — replacing Radix's Portal, Overlay, focus-scope and
  presence machinery in one move. `apps/www` uses `Dialog` in six places; all six work
  unchanged.

  **Breaking — two exports removed:**

  | Removed         | Why                                                                                                              | What to do                                           |
  | --------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
  | `DialogPortal`  | The top layer places the dialog above everything without moving it in the tree. A portal has nothing left to do. | Delete the wrapper. `DialogContent` needs no parent. |
  | `DialogOverlay` | `::backdrop` already _is_ a full-viewport box painted beneath the dialog.                                        | Delete it. Style `dialog::backdrop` instead.         |

  Neither had a consumer anywhere in the repo. `DialogOverlayProps` goes with them, and
  `DialogProps` is now exported (it was previously a local type).

  **Breaking — prop types no longer come from Radix.** Every interface was
  `ComponentPropsWithoutRef<typeof DialogPrimitive.X>`; they are hand-written now, so
  `asChild`, `forceMount` and the rest no longer arrive for free. `asChild` is deliberately
  reimplemented on the in-house `Slot` from A.6 on both `DialogTrigger` and `DialogClose`,
  because both ship in `apps/www/src/app/(pages)/account/update-profile/`.
  `DialogContentProps` omits `open`: a modal dialog is opened with `showModal()`, and the
  `open` attribute alone renders a _non-modal_ one.

  **Fixed:** `aria-describedby` is now emitted only when a `DialogDescription` is actually
  rendered. Radix always emitted it, so a dialog without a description pointed at an id
  naming nothing. Axe does not flag a dangling IDREF, which is why it survived the 0.3
  backfill.

  **Fixed, and only visible once the element stopped being unmounted:** `.content` declared
  `display: flex`, which overrides the user agent's `dialog:not([open]) { display: none }`.
  Radix removed the content from the DOM when closed so it never showed; a native
  `<dialog>` stays put, and every closed dialog would have rendered an empty padded box on
  the page. The layout now applies only under `[open]`.

  **Toast no longer hides behind the dialog.** A modal `<dialog>` paints in the top layer
  and inerts everything behind it, but `ToastViewport` is rendered inline by `Toaster` — so
  a toast raised while a dialog was open would have appeared _underneath_ the backdrop.
  That is the shipping path in `ban-user-dialog.tsx`, `role-change-dialog.tsx` and
  `remove-subscriber-dialog.tsx`, all of which `toast()` on failure while their dialog is
  still open. The viewport is now promoted with `popover="manual"` and re-asserts itself
  whenever a dialog opens, since top-layer ordering follows insertion. The attribute is set
  from the same effect that shows it, never rendered — an engine that parses `popover` but
  cannot show it would otherwise hide the viewport permanently.

  **CSS.** `.overlay` is gone; its paint moved to `.content::backdrop`. `.content` loses
  `position: fixed`, `top`/`left`, `transform` and `z-index` — a modal dialog is placed by
  the UA at `inset: 0; margin: auto`, and z-index does nothing in the top layer. Every
  dimension is unchanged, so Chromatic should be empty. Scroll locking is now
  `html:has(.content[open])`, because `showModal()` inerts the document without stopping it
  scrolling. Both `::backdrop` and `:has()` were confirmed to survive the cssnano build
  unpolyfilled.

  **`@radix-ui/react-dialog` is still declared.** `drawer` imports it from eight files; it
  leaves in B.2. What this removes is every Radix type from
  `dist/components/dialog/*.d.ts`, verified against the built output.

- 908a01d: Rebuild `Drawer` on the native `<dialog>` base, removing the last `@radix-ui/react-dialog`
  import.

  **`@radix-ui/react-dialog` is now completely gone from `pnpm-lock.yaml`** — not merely
  undeclared. `cadence-core` declares **four** Radix packages, down from twelve when the
  epic started, which is the corrected end-of-Phase-B target. The four that remain
  (`dropdown-menu`, `toast`, `tooltip`, `hover-card`) are deliberate Tier C retentions.

  **The shared machinery moved to an internal `modal/` module.** `Drawer` needs the same
  `showModal()` lifecycle, `cancel`/`close` round trip, backdrop hit test and focus return
  that `Dialog` got in the previous release — the subtle part of this migration. Copying it
  would have meant maintaining two versions of exactly the code most likely to go subtly
  wrong. `Dialog` and `Drawer` are now thin skins over `ModalRoot`, `ModalSurface`,
  `ModalTrigger`, `ModalClose`, `ModalTitle` and `ModalDescription`. That module is internal
  and not exported from the package barrel, like `slot/` and `test-utils`; `Dialog` and
  `Drawer` remain the supported surfaces.

  **Breaking — two exports removed**, mirroring `Dialog`:

  | Removed         | Why                                                                            | What to do                          |
  | --------------- | ------------------------------------------------------------------------------ | ----------------------------------- |
  | `DrawerPortal`  | The top layer places the drawer above everything without moving it in the tree | Delete the wrapper                  |
  | `DrawerOverlay` | `::backdrop` already _is_ a full-viewport box beneath the drawer               | Delete it; style `dialog::backdrop` |

  Neither had a consumer. `DrawerOverlayProps` goes with them; `DrawerProps` is now
  exported. Prop types are hand-written rather than inherited from Radix, so `asChild` no
  longer arrives for free — it is reimplemented on the in-house `Slot`, because
  `apps/www/src/components/changelog/changelog-drawer.tsx` ships it.

  **Fixed, same as `Dialog`:** `aria-describedby` is emitted only when a
  `DrawerDescription` exists, rather than always pointing at an id that may name nothing.

  **CSS.** `.overlay` is gone; its paint moved to `.content::backdrop`. Two things needed
  deliberate handling. A modal `<dialog>` is centred by the UA at `inset: 0; margin: auto`,
  so pinning to an edge now sets `margin-block: 0` with per-side `margin-inline` — without
  it the drawer floats in the middle of the viewport. And `.content` declared
  `display: flex`, which overrides the UA's `dialog:not([open]) { display: none }`; Radix
  unmounted the content when closed so it never showed, but a native `<dialog>` stays in the
  DOM and would have left a full-height panel on the page. Layout now applies only under
  `[open]`. Every visual dimension is otherwise unchanged.

  Verified against a real browser rather than assumed: the browser suite measures the
  drawer's actual box on both sides, which is what proves the margin override works. Four
  naive regressions were introduced and each was caught — dropping the margin overrides (2
  failures), leaving `display: flex` when closed (3), ignoring the `side` prop (1), and
  removing the scroll lock (1). That last one initially caught nothing, which exposed a
  missing scroll-lock assertion in `Drawer`'s suite that `Dialog`'s had; it is now covered.

- dc2e8fc: Fixes the `RadioCardItem` accessibility defect recorded in `docs/adr/0002-known-gaps.md`
  and removes all 14 `it.skip` markers from its test file.

  `RadioCardItem` rendered the real radio with `aria-hidden="true"` and `tabIndex={-1}`, and
  moved selection onto a bare `<div role="radio" onClick>`. The control was therefore
  invisible to assistive technology and unreachable by keyboard — a shipped defect every
  consumer inherited.

  **The card is now a `<label>` wrapping a real `<input type="radio">`.** That single change
  is the whole fix: a click anywhere on the card activates the input natively, the input
  stays in the tab order, and arrow keys move between cards because the inputs share a
  `name`. There is no click handler, no key handler, no `tabIndex`, and no `role` asserted by
  hand — all of it is browser behaviour, unlocked by the native-input migration in A.3.

  Selected, focused and disabled styling is expressed with `:has()` against that input
  (`.itemRoot:has(input:checked)`) rather than mirrored onto `data-state` / `data-disabled`
  attributes, so the card cannot drift out of sync with the control it describes. `:has()`
  has been Baseline Widely Available since December 2023, comfortably inside the
  Baseline Newly Available floor set by `docs/adr/0003-browser-support-floor.md`.

  **Breaking.** `RadioCardItemProps` now extends `ComponentPropsWithoutRef<'label'>` rather
  than `<'div'>`, and its ref is `HTMLLabelElement`. The internal `_groupValue`,
  `_groupOnValueChange` and `_groupName` props are gone — selection, the shared `name` and
  the change callback travel through `RadioGroup`'s context to the input, so the card no
  longer mirrors group state in JavaScript. `RadioCardGroup`'s public API is unchanged.

  Accessibility improvements beyond the defect itself: the card's visible title now supplies
  the control's accessible name through the wrapping label, with no `aria-label` to keep in
  sync, and `required` is a real form constraint rather than `aria-required` on a div.

  ### On the 14 quarantined tests

  Twelve documented the defect and now pass. Two mechanical translations were needed, neither
  of which weakens them: they asserted `aria-checked` and `data-disabled`, which a native
  input does not expose, and they asserted card modifier classes on the `role="radio"`
  element, which is now the `<input>` and cannot carry them.

  Two were **dropped**, because they were mis-specified from the start and never described
  the accessibility defect:
  - `applies variant classes` asserted `s.itemVariantOutlined` for a `variant` prop that has
    never existed on `RadioCardItem` — no prop, no stylesheet rule.
  - `has proper indicator element` queried a hard-coded `.cds-radio-card-item--indicator`
    that cannot match the hashed class name, and asserted `toBeDefined()`, which passes on
    `null`. It is rewritten to assert the indicator actually renders.

  The register's claim that all 14 were correct was therefore not quite right, and the
  guidance derived from it has been corrected. Net: 29 behaviour tests, none skipped, plus 7
  new axe tests — `radio-card` had no a11y coverage at all.

  Documentation updated: the `RadioCardItem` entry is deleted from `0002-known-gaps.md` per
  the register's own convention, and both `AGENTS.md` files, the `new-component` skill, and
  the design-system, accessibility and test-engineer agent guides now point at `radio-card`
  as the reference for a selectable card rather than as the anti-pattern. `checkbox-card`
  still carries the same defect and is now named as the anti-pattern in its place; it is
  commented out of the form barrel and does not ship.

- dc2e8fc: `Radio` and `RadioGroup` are now native `<input type="radio">` elements instead of
  `@radix-ui/react-radio-group`. This is the clearest case in the Radix removal for the
  platform being better than the library: radios that share a `name` get arrow-key
  navigation, single selection, wrapping, roving tabindex and form participation **from the
  browser**, with no JavaScript. `@radix-ui/react-roving-focus` was reimplementing all of it.

  **Breaking.**

  | Before (Radix)                                                                      | After (native)                                                                |
  | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
  | `<RadioGroup onValueChange={(v) => …}>`                                             | `<RadioGroup onChange={(v) => …}>` — same `(value: string) => void` signature |
  | `<RadioGroup loop>`                                                                 | removed; native radios always wrap                                            |
  | `RadioGroupProps extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>` | `extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange' \| 'defaultValue'>` |
  | `RadioProps extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>`      | `extends Omit<ComponentPropsWithoutRef<'input'>, 'type'>`                     |
  | `Radio` ref is `HTMLButtonElement`                                                  | ref is `HTMLInputElement`                                                     |
  | `RadioCardGroupProps.loop`                                                          | removed for the same reason                                                   |

  `onValueChange` is renamed rather than removed. A radio group is the one abstraction the
  platform genuinely lacks — HTML has no group element and no group change event — so a
  group-level callback stays, but it no longer carries a Radix-shaped name. `Radio` still
  accepts its own DOM `onChange`, which fires alongside the group callback.

  `RadioGroup` now generates a shared `name` with `useId()` when none is given. This is not
  cosmetic: the shared `name` is the only thing that makes the browser treat the inputs as
  one group, and therefore the only reason keyboard navigation works at all. Two groups on
  one page stay independent without any wiring.

  `value` is now typed `string` rather than Radix's looser type, and `RadioGroupOrientation`
  is newly exported. `orientation` sets both `aria-orientation` and the `data-orientation`
  styling hook the stylesheet already used.

  Styling moved off `[data-state]` and `[data-disabled]` onto `:checked` and `:disabled`,
  with `appearance: none` on the input. Because a radio is a void element and cannot contain
  its own dot, the indicator is now an `aria-hidden` sibling revealed by CSS — which keeps
  uncontrolled groups working, since React never learns which radio the browser selected.
  The dot's existing 8×6 dimensions are reproduced exactly, so there is no visual change.

  Consumers updated: `radio-card` internally (its own public `onValueChange` is unchanged),
  and `www`'s admin role-change dialog, which is a one-word rename.

  Testing: the previous 15 tests asserted the Radix surface — `aria-checked`,
  `data-disabled`, and a `value` _attribute_ on a `<button role="radio">`. Replaced with 37
  tests on the native contract, including a full keyboard block covering arrow keys in both
  axes, wrapping at both ends, single-tab-stop entry at the selected radio, and Space
  selection — none of which the component implements. Adds 7 axe tests; `Radio` had none.

  `@radix-ui/react-radio-group` is dropped from `dependencies` and the Rollup `external`
  array, and leaves `pnpm-lock.yaml` entirely.

  The `RadioCardItem` accessibility defect is **not** fixed here — that is task A.4, which
  this unblocks. It now carries a comment pointing at its 14 quarantined tests so its
  passing suite is not mistaken for correctness.

- 85d321b: `Separator` no longer wraps `@radix-ui/react-separator`. It renders a plain `<div>` that
  carries `role="separator"` (or `role="none"` when `decorative`, which remains the
  default), `aria-orientation` only for the vertical non-decorative case, and
  `data-orientation` always — the stylesheet sizes the separator off that attribute rather
  than off a class. The rendered markup is unchanged in every case, so there is no visual
  or accessibility difference; the 30 tests backfilled in Radix 0.3 pass untouched. A dead
  `orientation--${orientation}` class lookup was dropped along the way — the stylesheet
  never declared those rules, so `classnames` had always been discarding it.

  **Breaking, for types only.** `SeparatorProps` previously extended
  `ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>`, so consumers inherited Radix's
  props — most notably `asChild`. It now extends `ComponentPropsWithoutRef<'div'>` and
  declares `color`, `orientation`, and `decorative` explicitly. `asChild` is gone; compose
  by rendering the separator alongside your element instead of merging into it. `SeparatorElement`
  is now `HTMLDivElement` rather than `ElementRef<typeof SeparatorPrimitive.Root>`, so no
  Radix type reaches `dist/index.d.ts`. `SeparatorOrientation` is newly exported.

  `@radix-ui/react-separator` is dropped from `dependencies` and from the Rollup `external`
  array. Nothing else in the workspace depended on it, so it leaves `pnpm-lock.yaml`
  entirely.

  Also adds the `'use client'` directive that `separator.tsx` was missing — previously
  masked by the whole-bundle Rollup banner.

- dc2e8fc: `Switch` is now a native `<input type="checkbox" role="switch">` instead of
  `@radix-ui/react-switch`. Radix rendered a `<button role="switch">` and bubbled a hidden
  input in for form participation; that workaround is gone, and there is now exactly one
  input in the DOM. A checkbox carrying `role="switch"` is the standard native switch — it
  keeps form participation, label association and Space-to-toggle, while still being
  announced as an on/off control rather than a checkbox.

  **Breaking**, matching the Checkbox migration in A.2:

  | Before (Radix)                                                              | After (native)                                                      |
  | --------------------------------------------------------------------------- | ------------------------------------------------------------------- |
  | `onCheckedChange={(checked) => …}`                                          | `onChange={(e) => … e.target.checked}`                              |
  | `SwitchProps extends ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>` | `extends Omit<ComponentPropsWithoutRef<'input'>, 'type' \| 'role'>` |
  | ref is `HTMLButtonElement`                                                  | ref is `HTMLInputElement`                                           |

  `Switch` has no external consumers — it appears only in stories — so nothing outside the
  package changes.

  One deliberate behaviour change: **Enter no longer toggles the switch.** Radix's
  button-based control activated on Enter for free; a native checkbox does not, because
  Enter submits the form. Space toggles, which is the platform behaviour for this control.

  The track is the input itself, styled with `appearance: none`. The thumb and check mark
  cannot be children of a void element, so they are `aria-hidden` siblings positioned over
  it. Styling moved off `[data-state]` and `[data-disabled]` onto `:checked` and
  `:disabled`.

  That fixes a latent bug in passing: the thumb's position and the check mark's visibility
  were previously driven by `thumbChecked` and `checkIconVisible` classes computed from the
  `checked` **prop**, so an uncontrolled switch never moved its thumb — React never learned
  the value had changed. Both are now sibling selectors off `:checked`, so uncontrolled
  switches animate correctly. The `thumbChecked` and `checkIconVisible` classes are gone.

  `.thumb:hover` became `.root:hover:not(:disabled) ~ .thumb`, since the thumb is no longer
  a child of the control and cannot be hovered directly. Its specificity is deliberately
  left higher than the `:checked` rule, exactly as `.thumb:hover` outranked `.thumbChecked`
  before, so hover behaviour is unchanged.

  Testing: the previous 8 tests asserted `aria-checked` and `onCheckedChange`. Replaced with
  24 tests on the native contract — `FormData` participation, `role="switch"` without also
  being exposed as a checkbox, Space but not Enter, label association — plus 7 new axe
  tests; `Switch` had none.

  `@radix-ui/react-switch` is dropped from `dependencies` and the Rollup `external` array,
  and leaves `pnpm-lock.yaml` entirely. `cadence-core` now declares **8 Radix packages,
  down from 12** at the start of the epic.

### Minor Changes

- a918b1d: Rebuild `Tabs` on the WAI-ARIA APG roving-tabindex pattern, removing
  `@radix-ui/react-tabs`.

  No native element exists for tabs, so this is a real reimplementation rather than a
  handover to the platform — but the APG pattern is precisely specified and highly
  testable, and the 52 tests backfilled in #313 carried through it almost unchanged.

  **Not a breaking type change.** `tabs/types.ts` was already hand-written and Radix-free,
  so no consumer loses a prop. `Tabs`, `TabsList`, `TabsTrigger` and `TabsContent` keep
  their entire surface: `value`/`defaultValue`/`onValueChange`, `orientation`, `dir`,
  `activationMode`, `loop`, `isContained`, `disabled`, `icon`, `padding`, `background`.

  Two behaviour changes, both deliberate, both decisions the backfill left open:
  - **The roving tabindex is now eager.** Radix left every tab at `tabindex="-1"` and put
    the tab stop on the `tablist` itself, handing off on the first keypress. The selected
    tab now carries the stop from first render and the tablist is not focusable — a
    focusable non-interactive container is a defect in its own right. Keyboard entry is
    unchanged. The one exception is a `Tabs` with no selection at all, where the list still
    takes the stop and forwards focus to the first enabled tab, because otherwise the whole
    group drops out of the tab order.
  - **`forceMount` no longer un-hides the panel.** It previously dropped the `hidden`
    attribute too, leaving an unselected panel in the accessibility tree so two `tabpanel`s
    were reachable at once. It now means what it says and nothing more: keep the children
    mounted. `hidden` tracks selection alone.

  Three latent bugs fixed while the files were open: the `padding` union omitted
  `'2x-small'` although `.tabs--content--padding--2x-small` exists in the stylesheet;
  `TabsContent` referenced a `tabs--content` class the stylesheet has never defined; and it
  emitted `tabs--content--padding--undefined` / `--background--undefined` classes when
  those props were unset. The `@ts-ignore` over `forceMount` is gone with the Radix types
  that required it, and all four files gained the `'use client'` directive they were
  missing.

  `data-state="active" | "inactive"` is still emitted on triggers and panels. It is this
  component's own attribute now rather than Radix's, kept because `tabs.module.css` styles
  the active trigger through it and consumers may have done the same — so the stylesheet is
  untouched and there is no visual change.

  **`@radix-ui/react-tabs` does not leave `pnpm-lock.yaml`.** `apps/auth` declares it
  independently for its own duplicate tabs component, which is tracked separately as
  `Radix C.5`. What this removes is `cadence-core`'s declaration, its Rollup `external`
  entry, and every Radix type from the emitted `dist/components/tabs/*.d.ts` — verified
  against the built output, not the source.

### Patch Changes

- 50af95d: Adds the accessibility test harness the Radix removal work depends on: registers
  `@storybook/addon-a11y`, and extracts the ad-hoc `axe.run` and declared-rule helpers from
  the sidebar suite into `src/test-utils/` so every component suite shares one
  implementation.

  Tooling only — no component, API, or bundle change. `src/test-utils/` is excluded from
  `tsconfig.json` alongside `__test__/`, so nothing reaches `dist/`.

- 213053c: Add a browser-mode vitest project, so behaviour jsdom cannot host has somewhere to live.

  jsdom does not implement `HTMLDialogElement` — `showModal` and `close` are `undefined` on
  every installed version (26.1.0, 28.1.0, 29.1.1). Focus trapping, `Escape`, top-layer
  placement and background inerting are therefore unverifiable in the default suite, and
  those are precisely the four behaviours the upcoming native-`<dialog>` rewrite exists to
  obtain. Stubbing `showModal` in a setup file would assert against the stub rather than the
  platform, which is the `form/radio-card/` failure mode the test-backfill gate exists to
  prevent.

  `vite.config.ts` now defines two vitest projects. `jsdom` keeps every existing spec and
  stays the default `pnpm test`, so the shared CI job never downloads a browser. `browser`
  runs `src/**/*.browser.test.{ts,tsx}` under Playwright/Chromium via `pnpm test:browser`,
  in its own workflow (`.github/workflows/ci-cadence-browser.yml`). Both projects set
  `extends: true` and so share the CSS-module hashing, which matters because browser specs
  assert on the same `cds-*` class bindings.

  `Dialog`'s five modal-behaviour tests move out of the fenced block in `dialog.test.tsx`
  into `dialog.browser.test.tsx`. They pass unchanged against the current Radix
  implementation — which is the point: the harness is proven against the component being
  replaced, before anything is rewritten.

  No source or public API change. Phase C reuses this project for CSS anchor positioning,
  which jsdom equally cannot compute.

- 1c94d3d: Backfills the test suite for `Dialog` (Radix task 0.3, slice 3) and fixes two defects the
  suite uncovered.

  **An unnamed close button.** `DialogContent` renders its own close button containing nothing
  but `<X />`, and `cadence-icons`' `X` sets `role="img"` with `aria-labelledby={titleId}` —
  undefined unless a `title` is passed, so React omits the attribute entirely. The svg was
  therefore a nameless `role="img"` (`svg-img-alt`) and the button that contained only it was a
  nameless button (`button-name`). Both fire on all six shipping consumer surfaces. It matters
  more than the rule names suggest: initial focus lands on that button, so opening any dialog
  announced an unnamed control. `DrawerContent` carried the identical defect and is fixed
  alongside. The close button now has `aria-label="Close"` and the icon is `aria-hidden`.

  **Eighteen `undefined` display names.** `@radix-ui/react-dialog` 1.1.23 — arriving in the
  dependabot bump #310 — stopped setting `displayName` on its primitives. Eighteen components
  across `dialog`, `tooltip`, `hover-card`, and `dropdown-menu` assigned theirs by copying
  (`DialogContent.displayName = DialogPrimitive.Content.displayName`), so every one silently
  became `undefined`, shifting Storybook's docgen output. All are now hand-set to the strings
  they previously resolved to.

  Also pinned: the closed `DialogTrigger` no longer carries `aria-controls` as of 1.1.23. That
  is Radix removing a dangling IDREF, so the new behaviour is asserted rather than restored.

  **The tests.** 54 across `dialog.test.tsx` and `dialog-a11y.test.tsx`, written against the
  current Radix behaviour so they are the regression contract the B.1 rewrite onto native
  `<dialog>` must satisfy. No visual change, no API change.

- 6690786: Backfill `Drawer`'s test coverage to the standard the rest of the epic holds.

  `Drawer` was not on task 0.3's list of untested components because it had a suite — three
  tests, 58 lines, `fireEvent`-based, every query a `getByText`. No `getByRole`, no keyboard
  coverage, no a11y file. It failed the epic's own success criterion while looking like it
  passed, which is a worse signal than having no tests at all: `form/radio-card/` shipped
  inaccessible with tests on it.

  This is the gate B.2b needs before `Drawer` moves onto the native `<dialog>` base. Three
  files, 61 tests, no source change:
  - **`drawer.test.tsx`** (jsdom, 50 tests) — composition and roles, the `side` prop, the
    trigger's popup attributes including `asChild`, controlled and uncontrolled open state
    with non-drift, styling hooks, ref forwarding, `displayName`s, and the built-in close
    button. Plus the shipping consumer shape from `changelog-drawer.tsx`.
  - **`drawer.browser.test.tsx`** (Chromium, 11 tests) — focus movement and return, `Escape`,
    focus containment, overlay-versus-content clicks, reopening, and which side the drawer
    actually lands on.
  - **`drawer-a11y.browser.test.tsx`** (Chromium, 5 tests) — axe across both sides, with and
    without a description, with interactive content, and while closed.

  **The browser tests are written behaviourally on purpose.** The obvious way to pin Radix's
  background inerting is `trigger.closest('[aria-hidden="true"]')`, because that is its
  mechanism — and that is exactly the assertion that had to be discarded and rewritten when
  `Dialog` migrated, since a native modal inerts through the top layer and sets no attribute
  anywhere. Asserting what a user can reach, rather than how the library achieves it, means
  these survive B.2b instead of being rewritten by the change they exist to protect.

  The a11y suite goes straight into the browser project for the same reason: jsdom hides an
  unopened `<dialog>` through its UA stylesheet and offers no `showModal()` to open it, so
  after B.2b axe would walk a hidden subtree and return a clean result for a drawer it never
  inspected.

  Verified as a real gate rather than decoration — six naive regressions were introduced and
  each was caught: dropping the close button's `aria-label` (3 failures), exposing its icon
  to assistive technology (1), ignoring the `side` prop (2), dropping the base content class
  (3), breaking a `displayName` (1), and dropping `className` forwarding on the trigger (1).

- 84b5bf8: Backfills the test suite for `DropdownMenu` (Radix task 0.3, slice 6, the last one) and
  fixes three decorative icons that reached the accessibility tree.

  `DropdownMenu` is a **deliberate Tier C retention** recorded in
  `docs/adr/0002-known-gaps.md`, not a migration target — so unlike the other slices these
  tests exist to stop a Radix upgrade changing its semantics silently, rather than to prepare
  a rewrite. That is not hypothetical: five of this component's files carried the
  `displayName` regression that arrived in `@radix-ui/react-dropdown-menu` 1.1.24.

  **Three nameless `role="img"` svgs.** The checkbox tick, the radio dot, and the sub-trigger
  chevron are all decorative — `aria-checked` and `aria-haspopup` already carry the meaning —
  but `cadence-icons` renders `role="img"` with an `aria-labelledby` React drops when no
  title is passed. Three `svg-img-alt` violations in a single open menu. All three are now
  `aria-hidden`.

  **The tests.** 53 across `dropdown-menu.test.tsx` and `dropdown-menu-a11y.test.tsx`,
  covering the trigger and menu wiring, roving focus, arrow navigation past disabled items,
  typeahead, `Escape` and focus return, checkbox and radio items, submenus, and every styling
  hook.

  With this, all five components that task 0.3 found untested — `separator`, `dialog`,
  `tabs`, `toast`, and `dropdown-menu` — have suites.

- dc2e8fc: Replaces `@radix-ui/react-slot` with an in-house `Slot` and `Slottable` in
  `src/components/slot/`. **No public API change** — neither was ever re-exported from
  `src/index.ts`, and the one consumer, `sidebar/sidebar-link.tsx`, behaves identically. The
  existing sidebar suite, including `renders through Slot when asChild is true`, passes
  untouched.

  The motivation is coupling rather than dependency count. `sidebar-link.tsx` carried a
  comment explaining that its children had to be spread as siblings rather than wrapped in a
  Fragment _because of how Radix's `SlotClone` used `cloneElement` internally_ — that is a
  dependency on a library's implementation detail, not on its public API. The behaviour is
  now specified by this package's own tests.

  The implementation is about 90 lines: merge props onto the single child element, compose
  refs, and support `Slottable` to mark which child gets promoted. Merge semantics match
  what the sidebar relied on — event handlers compose child-first then slot, `style` merges
  with the child winning, `className` concatenates, and every other prop lets the child win.
  Ref extraction handles both React conventions, since the package's peer range still allows
  18 alongside 19: React 19 moved `ref` into props, and reading `element.ref` under 19 logs
  a deprecation warning, so it branches on `React.version` rather than probing.

  24 tests specify it, including the two misuse cases that should throw rather than silently
  pick a child, and the ref-composition case where the slot and the child each carry a ref.

  `@radix-ui/react-slot` is removed from `dependencies` and the Rollup `external` array.
  Unlike the earlier Tier A migrations it does **not** leave `pnpm-lock.yaml` — the remaining
  Radix packages (`dialog`, `dropdown-menu`, `tabs`, `tooltip`, `hover-card`, `toast`,
  `collapsible`) all depend on it transitively, so it will only disappear when the last of
  them does. What changes here is that `cadence-core` no longer declares or bundles it
  itself.

  `cadence-core` now declares **7 Radix packages, down from 12** at the start of the epic.

- b46f883: Two Radix dependency-hygiene fixes, found while auditing the Radix removal epic.

  `@radix-ui/react-collapsible` and `@radix-ui/react-slot` were missing from the Rollup
  `external` array, so both were bundled into `dist/index.esm.js` while the other ten Radix
  packages stayed external. Consumers were shipping a second copy of code they already had
  installed. Marking them external drops the ESM bundle from 317,829 to 285,457 bytes.

  `www` declared six `@radix-ui/*` dependencies it never imported — it consumes Radix only
  indirectly through `cadence-core`. Removed.

  No API or behavior change in either package.

- cb7e26c: Adds the first test coverage for `Separator`, which shipped untested. Records the current
  `@radix-ui/react-separator` behavior as a regression contract: `role="none"` by default and
  `role="separator"` when `decorative` is false, `aria-orientation` emitted only for the
  vertical non-decorative case, and `data-orientation` present regardless — the attribute the
  stylesheet keys off. Adds an axe suite covering both roles, both orientations, and the
  in-list position.

  Tests only — no component, API, or bundle change.

- dc2e8fc: `SidebarSection` no longer uses `@radix-ui/react-collapsible`. Its collapsible mode is now
  the WAI-ARIA disclosure pattern: a `<button>` carrying `aria-expanded` and `aria-controls`,
  and the region it owns. **No public API change** — `collapsible`, `defaultOpen`, `open` and
  `onOpenChange` all behave as before, in both controlled and uncontrolled modes, and the
  collapsed-rail behaviour that forces sections open is untouched.

  `<details>`/`<summary>` was the first choice, since `summary/` already uses it in this
  package, but two things ruled it out. Controlled mode means fighting the element's own
  toggling, and reproducing the existing exit animation would need `::details-content` with
  `transition-behavior: allow-discrete` — not Baseline, and so below the floor in
  `docs/adr/0003-browser-support-floor.md`. `summary/` animates only its chevron and never
  its content, so it was not a precedent for this. The reasoning is recorded in the
  component.

  The content region stays mounted and toggles `hidden` rather than unmounting, so
  `aria-controls` always resolves to a real element — a dangling `aria-controls` is worse
  than none. `hidden` also takes the links out of the accessibility tree entirely when
  closed, rather than leaving them merely invisible.

  The exit animation is preserved with a small presence effect: the region stays in the DOM
  until its animation ends. That effect first checks the computed `animationName` and hides
  immediately when there is none — without that guard, `prefers-reduced-motion` (which sets
  `animation: none`) would mean `animationend` never fires and the content stayed visible
  forever.

  `data-state` is retained on the trigger, since the chevron rotation already keys off it.

  Testing: `SidebarSection`'s collapsible mode had **no coverage at all** — the existing
  sidebar suites never passed the `collapsible` prop, so a whole interactive mode was
  shipping untested. Adds 18 tests covering disclosure semantics, controlled and
  uncontrolled modes, Enter/Space from the trigger, unique region ids across sibling
  sections, the collapsed-rail override, and axe in both states.

  Also adds the `'use client'` directive missing from `sidebar-header.tsx` and
  `sidebar-footer.tsx`, previously masked by the whole-bundle Rollup banner.

  `@radix-ui/react-collapsible` is dropped from `dependencies` and the Rollup `external`
  array, and leaves `pnpm-lock.yaml` entirely.

  **`cadence-core` now declares 6 Radix packages, down from 12** at the start of the epic —
  `dialog`, `dropdown-menu`, `hover-card`, `tabs`, `toast` and `tooltip`. Phase A is
  complete.

- 1a08d62: Backfills the test suite for `Tabs` (Radix task 0.3, slice 4), unblocking the B.3 rewrite
  onto the WAI-ARIA APG roving-tabindex pattern.

  52 tests across `tabs.test.tsx` and `tabs-a11y.test.tsx`, written against the current Radix
  behaviour so they are the regression contract the replacement has to satisfy. Covers the
  role and id wiring in both directions, the lazy roving tabindex, arrow/`Home`/`End`
  navigation in both orientations, `loop`, disabled-tab skipping, both activation modes,
  controlled and uncontrolled `value`, `forceMount`, and every styling hook.

  No source change — `Tabs` is untouched. Unlike the rest of this epic, B.3 is not a breaking
  type change, because `tabs/types.ts` is already hand-written and Radix-free.

- 2afdc0e: Backfills the test suite for `Toast` (Radix task 0.3, slice 5) and fixes two defects the
  suite uncovered.

  **`className` was silently dropped on five of six parts.** `ToastViewport`, `ToastTitle`,
  `ToastDescription`, `ToastClose`, and `ToastAction` each destructured the prop and then
  never applied it, while still declaring it in their public props type. Only `Toast` itself
  honoured it. All five now merge it the way `Toast` already did. No consumer passes
  `className` to these parts today, so nothing changes visually — the prop simply starts
  working.

  **The close button had no accessible name.** `ToastClose` renders only `<X />`, and
  `cadence-icons`' `X` sets `role="img"` with `aria-labelledby={titleId}` — undefined unless a
  `title` is passed, so React omits the attribute. That left the svg nameless under
  `svg-img-alt` and the button nameless under `button-name`, across all 24 toast consumer
  surfaces. This is the third instance of the same defect, after `Dialog` and `Drawer`. The
  button now carries `aria-label="Close"` and the icon is `aria-hidden`.

  **The tests.** 61 across three files — `use-toast.test.ts` covers the exported reducer as a
  pure state machine, `toast.test.tsx` the rendered contract, and `toast-a11y.test.tsx` the
  axe baseline. Written against the current Radix behaviour so they are the regression
  contract a C.1 rewrite must satisfy.

## 3.3.1

### Patch Changes

- 927c0b8: Repair the repo-wide verification loop so `lint`, `typecheck`, and `test` are trustworthy gates.

  **`pnpm test` now terminates.** `www`, `cadence-core`, `cadence-core-web-components`, and `cadence-icons` defined `test` as bare `vitest` (watch mode), so the root task hung forever and no exit code was ever observed. All four now run `vitest run`, with `test:watch` kept for interactive use.

  **Typechecking exists.** Every workspace gained a `typecheck` script and a matching `typecheck` task in `turbo.json`. Previously type errors only surfaced during `next build`.

  **CI covers the whole monorepo.** New `ci-monorepo.yml` runs lint + typecheck + test across all workspaces. `ci-www.yml` is removed: its lint/unit jobs are superseded, and its E2E job duplicated `ci-www-e2e.yml`, so PRs touching `apps/www` ran Cypress twice.

  Fixes surfaced by turning the gates on:
  - `cms-sanity` — migrated the legacy `.eslintrc` to flat config (ESLint 9 could not read it, so `eslint .` exited 2). Corrected four `dashboardTool` widget `layout` props from `'medium'`/`'large'` to `{ width: … }`, matching `@sanity/dashboard` v5's `LayoutConfig`.
  - `cadence-core` — the sidebar border assertion tested something jsdom cannot evaluate: jsdom does not resolve `var()`, so `border: 1px solid var(--cds-color-border-faint)` computes as `borderStyle: 'none'`. Now asserted against the declared CSS rule.
  - `auth-permissions` — negative permission assertions ("a student cannot manage users") were type errors, because `ac.newRole()` narrows `authorize()` to the resources a role declares. Added a `denies()` helper that keeps the runtime check.
  - `apps/auth` — added the missing `cypress` dependency and scripts; five E2E specs had been unrunnable.
  - Removed a malformed `packages/cadence-core/.prettierrc` (`"printWidth": "80"` as a string, `tabWidht` misspelled) and a dead `.eslintrc` referencing six uninstalled plugins.
  - Aligned pnpm on 9 across `packageManager` and both workflows (was 8 / 9 / 8).
  - Added `.env*` to `.gitignore`; removed the stale `scripts/test-vercel-build.sh`.

  Also fixed: `button.test.tsx` imported `'../Button'` where the file is `button.tsx`.
  macOS is case-insensitive so it resolved locally; Linux CI is not, and this suite had
  never run there before. The new workflow caught it on its first run.

  Known gaps deliberately left, documented in code where they live: 14 `radio-card` tests are quarantined pending an accessibility fix to `RadioCardItem`; `cadence-core` has no lint setup; `pnpm format:check` is not yet gated in CI.

- Updated dependencies [927c0b8]
  - cadence-icons@1.8.1

## 2.4.0

### Minor Changes

- Added Toast component - A notification system built on Radix UI's Toast primitive with variant styling (default, success, error, warning), slide direction animations (from-bottom, from-right), and a global state management pattern via the `useToast` hook and `toast()` function. Includes `Toaster`, `Toast`, `ToastAction`, `ToastClose`, `ToastTitle`, `ToastDescription`, `ToastViewport`, and `ToastProvider` components. Migrated from the www app to the shared library.

## 2.2.0

### Minor Changes

- Added Summary component - A collapsible disclosure widget with configurable title, visual variants (contained/flush), and size options (small/medium/large)

## 1.1.0

### Minor Changes

- 8c4cb6b: Added Badge to Core package

### Patch Changes

- c601ce8: Formatting cleanup, etc
- Updated dependencies [c601ce8]
  - typeface-tiempos-text@1.0.3
  - typeface-favorit@1.0.3
  - cadence-tokens@2.1.1
  - cadence-icons@1.4.1
