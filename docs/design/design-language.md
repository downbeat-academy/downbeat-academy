# The Cadence design language

Why the system is shaped the way it is, and how to choose within it.

[`../architecture/design-system.md`](../architecture/design-system.md) covers the
mechanism — which package holds what, the build order, the styling conventions. This file
covers the intent. It is the document to read before making a visual decision, because the
mechanism can tell you that you must use a semantic token and cannot tell you *which one*.

**No values appear here.** Every value lives in
[`packages/cadence-tokens/tokens/`](../../packages/cadence-tokens/tokens/) and is cited by
path. If this file and the token files disagree, the token files are right — see
[`../adr/0004-design-source-of-truth.md`](../adr/0004-design-source-of-truth.md).

---

## Color

### The six ramps

`tokens/color/palette.json` holds six ramps, each named for something edible and each
carrying exactly one job. The names are deliberately not semantic — that is the point of
the layer. Picking a ramp is a decision about *meaning*, not about hue.

| Ramp | Job | Reached for when |
| --- | --- | --- |
| `blackberry` | **Neutral.** The full range from white through to near-black, tinted toward blue rather than grey. | Text, page and component surfaces, borders, disabled states — anything not carrying a signal |
| `violet` | **Brand.** | Something is Downbeat Academy's, rather than merely interactive |
| `blueberry` | **Interactive.** | Something can be clicked, followed, or focused |
| `kale` | **Success.** | An operation completed, a state is valid |
| `pineapple` | **Warning**, and the default page ground. | Something needs attention but is not an error — and, at its lightest step, the warm paper the site sits on |
| `peach` | **Critical.** | Something failed, or is destructive |

Two consequences worth internalizing:

**Brand and interactive are different ramps on purpose.** `violet` is identity; `blueberry`
is affordance. A link is blueberry because it can be clicked, not because it belongs to
the brand. Collapsing the two — making every interactive element brand-colored — is the
most common way a design system loses the ability to signal interactivity at all.

**The page is warm, not white.** `color.page.primary` resolves to the lightest `pineapple`
step, an off-white that reads as paper. `color.page.secondary` is the true white from
`blackberry`. Defaulting a new page surface to white rather than to
`--cds-color-page-primary` is a visible regression, not a neutral choice.

### The five semantic families

`tokens/color/` splits the semantic layer five ways. Each answers a different question, and
a new color need belongs to whichever question it answers:

| File | Question | Contains |
| --- | --- | --- |
| `foreground.json` | What sits *on* a surface? | Text, icons, and anything drawn in the foreground |
| `surface.json` | What is a *component* filled with? | Card, button, badge, banner fills |
| `border.json` | What separates or outlines? | Borders, dividers, outlines |
| `page.json` | What is the *page* filled with? | The ground everything else sits on |
| `overlay.json` | What obscures what is behind it? | Scrims |

The distinction between `page` and `surface` is the one that gets confused. `page` is the
ground; `surface` is a thing placed on the ground. A card is a surface, the page behind it
is a page. There is no `surface.page` and there should not be.

### The intensity convention

Each family carries the same five status roles — `brand`, `interactive`, `success`,
`warning`, `critical` — mapped to different steps of the same ramp. The step is not
arbitrary:

| Family | Ramp step | Why |
| --- | --- | --- |
| `foreground.*` | `500` default, `600` hover, `700` active | Colored text on a light ground. Darkens as it is engaged |
| `surface.*` | `600` | A fill that light text will sit on, so it must be darker than the foreground equivalent |
| `border.*` | `500` | Matches the foreground so an outlined and a filled variant of the same component read as the same color |

`foreground.interactive` and `foreground.brand` carry all three of default/hover/active.
`critical`, `warning`, and `success` carry default/hover only — they are states being
reported, not controls being pressed. If a status color needs an `active` step, that is a
signal the component is doing something a status color should not be used for.

**Adding a status role means adding it to all three families, at the matching steps.** A
role present in `foreground` but missing from `border` produces components that cannot be
outlined.

### Neutrals

`primary` is the workhorse; `strong` is for emphasis above it; `faint` is for de-emphasis
below it; `disabled` is below that. `high-contrast` is the inversion — a foreground for
use on `surface.high-contrast`, and vice versa. The pairing is the contract: use
`foreground.high-contrast` **only** on a high-contrast or status surface, never on
`page.primary`, where it is white on near-white.

### Contrast and accessibility

**WCAG 2.1 AA is the floor** — 4.5:1 for body text, 3:1 for large text and for non-text UI
(borders, icons, focus indicators). Same bar the `accessibility-engineer` agent enforces.

Ratios below are measurements, not design values — they are the record of what has been
checked. There is no automated contrast check in `pnpm verify`, so this list is the only
record there is. **Re-measure after any palette change.** Measured 2026-08-05.

**Safe — the neutral foregrounds.** Every neutral clears AA comfortably on every light
ground (`page.primary`, `page.secondary`, `page.faint`, `surface.primary`, `surface.faint`):

| | on lightest ground | on `page.faint` |
| --- | --- | --- |
| `foreground.strong` | 19.3 | 17.8 |
| `foreground.primary` | 18.5 | 16.7 |
| `foreground.faint` | 11.1 | 10.0 |
| `foreground.disabled` | 6.3 | 5.7 |

`foreground.high-contrast` on `surface.high-contrast` is 19.7. `border.primary` (18.5) and
`border.faint` (11.1) clear the 3:1 non-text bar with enormous margin.

**Not safe — status colors.** This is where the system currently fails, and the failures
are not marginal:

| Pairing | Ratio | AA text (4.5) | AA non-text (3.0) |
| --- | --- | --- | --- |
| `foreground.high-contrast` on `surface.brand` | 15.3 | pass | pass |
| `foreground.high-contrast` on `surface.interactive` | 5.6 | pass | pass |
| `foreground.high-contrast` on `surface.critical` | 4.8 | pass, barely | pass |
| `foreground.high-contrast` on `surface.warning` | 3.7 | **fail** | pass |
| `foreground.high-contrast` on `surface.success` | 3.7 | **fail** | pass |
| `foreground.brand` on a light ground | 9.1 | pass | pass |
| `foreground.interactive` on a light ground | 4.1 | **fail** | pass |
| `foreground.critical` on a light ground | 3.2 | **fail** | pass |
| `foreground.success` on a light ground | 2.3 | **fail** | **fail** |
| `foreground.warning` on a light ground | 1.9 | **fail** | **fail** |

Read that carefully before using a status color for text:

- **`foreground.warning` and `foreground.success` are not text colors.** At under 3:1 they fail even as icons and borders. Use the `surface.*` fill with `foreground.high-contrast` on it, or pair the color with a shape or label that carries the meaning independently.
- **`foreground.interactive` fails AA for body text**, which matters most because it is the link color. Links currently rely on underline and context as well as color, which is the right belt-and-braces answer, but the color alone is not sufficient signal.
- **White on `surface.warning` and `surface.success` fails.** A badge or banner in those roles needs a darker fill or a dark foreground.
- **`foreground.brand` is the only status color that is comfortably safe as text.**

**Never pair a status foreground with its own status surface** — `foreground.warning` on
`surface.warning` measures 1.9. Every same-ramp pairing lands between 1.4 and 1.9. They are
adjacent steps of one ramp and were never intended to combine.

`foreground.disabled` at 6.3 is legible. Disabled text is conventionally exempt from AA;
this system does not need the exemption, so do not treat it as license to darken the
ground behind it.

These are tracked as a gap, not accepted as correct — see
[`../adr/0002-known-gaps.md`](../adr/0002-known-gaps.md). Do not work around a failing
pairing by picking a palette step by eye; the fix is a token change.

---

## Space and rhythm

`tokens/scale/index.json` is a single 12-step scale used for **every** dimension —
padding, margin, gap, and (via `radii`) corner rounding. There is no separate spacing
scale for components versus layout.

The scale is not linear. It is fine-grained at the bottom (`3x-small` through `base`,
where the increments are small enough to tune a button's padding) and coarse at the top
(`2x-large` upward, where the increments are large enough to separate page sections). Pick
the step by what you are separating:

- `3x-small`–`2x-small` — optical adjustments; the gap between an icon and its label
- `x-small`–`small` — inside a control
- `base`–`large` — between related controls, or a component's own padding
- `x-large`–`2x-large` — between distinct components
- `3x-large` and up — between page sections

**A token is the default.** If the right value seems to be between two steps, it is usually
one of the two steps. Most "this needs to be in between" instincts are worth resisting —
the scale exists so spacing stays consistent and re-tunable, and a repeated departure from
it is a missing token to propose, not a number to inline.

**But the visual result decides.** Optical corrections are real. A value that is
technically on-scale can still look wrong against a particular typeface, icon, or border
weight, and forcing the nearest step to keep the arithmetic tidy is the wrong trade —
the scale serves the design, not the reverse.

When you do depart from the scale:

- Keep it local to one component. If the same off-scale value shows up in a second place, it is a token, and the honest fix is to propose one.
- Say why in the PR. "Optically centered against the cap height" is a reason; silence reads as carelessness and will be corrected later by someone who assumes it was.
- Never reach for a palette token or an inline color to solve a spacing problem.

`radii` aliases the same scale rather than defining its own values, which is why a
`radii` step and a `scale` step of the same nominal size stay in sync. The names are
intent-based — `hard` through `x-soft` — because the correct rounding for a component
depends on how soft it should feel, not on its size.

---

## Layout

`tokens/breakpoint/index.json` defines four breakpoints, consumed through the SCSS mixins
in `packages/cadence-tokens/mixins.scss` rather than by writing media queries by hand.

| Breakpoint | What it is for |
| --- | --- |
| `sm` | Large phone. Where single-column stops being the only option |
| `md` | Tablet. Where the sidebar can appear and multi-column content becomes readable |
| `lg` | Laptop. The primary design target for the site |
| `xl` | Large desktop. Where content stops growing and starts centring |

Design at `lg` first and adapt outward. The site's content is long-form reading, and `lg`
is where most of it is read.

`tokens/content/index.json` fixes three widths — `sidebar`, `dialog`, `form` — that are
constraints rather than steps. They are pixel values on purpose: they must not scale with
root font size, because the thing they contain (a nav column, a modal, a set of inputs)
has a legibility ceiling independent of type size.

There is **no measure token** for long-form text. Article and lexicon bodies are
constrained by the layout that contains them. This is a real gap; if a measure constraint
is needed in more than one place, propose a `content.width.prose` token rather than
repeating a value.

---

## Elevation

`tokens/elevation/elevation.json` names shadows by **what is casting them**, not by depth
number. Choose by asking what the element is:

| Token | The element is | Examples |
| --- | --- | --- |
| `base` | Resting on the page, barely lifted | Default card |
| `raised` | Deliberately lifted, still in flow | Nav bar, elevated form section |
| `floating` | Lifted by interaction, still in flow | Card on hover, selectable card |
| `overlay` | Out of flow, above a scrim | Dialog, drawer |
| `popover` | Out of flow, small, anchored to a trigger | Hover card, tooltip |
| `inset` | Casting *inward* — content continues past an edge | Scroll affordance on a truncated region |

`inset` is the odd one and the one most often misused: it is not an elevation, it is a
signal that there is more content out of view.

Elevation pairs with `tokens/z-index/index.json`, which is also named by role rather than
number: `base`, `raised`, `dropdown`, `overlay`, `sticky`. An element with an `overlay`
shadow should carry an `overlay` z-index. Introducing a raw `z-index` number anywhere is
how stacking bugs start.

---

## Motion

Motion in Cadence is **feedback, not decoration**. Its job is to make a state change
legible: to show that a thing opened rather than appeared, or that a control acknowledged
a press. Motion that does not carry that information should not be there.

`tokens/animation/transition.json` provides a numbered duration ladder (`01` upward) as
complete `transition` shorthands. Rough guidance:

- The fastest steps are for direct manipulation — hover, press, focus. Fast enough to feel instant.
- The middle steps are for elements entering or leaving — dropdowns, tooltips, toasts.
- The slowest steps are for large surfaces — drawers, full-height panels. Reserve them; anything a user triggers frequently at this duration feels sluggish.

`tokens/animation/easing.json` provides `standard`, `enter`, `exit`, and `linear`. `enter`
decelerates sharply, so an element arrives quickly and settles; `exit` is symmetrical and
faster to leave than to arrive. Use `linear` only for continuous indeterminate motion — a
progress spinner — never for anything that starts and stops.

**The transition and easing tokens do not compose.** The `transition.*` tokens bake in
`ease-in-out` and are `all`-property shorthands; the `easing.*` tokens are standalone
curves. For a simple state change, use a `transition` token. For enter/exit choreography,
compose `transition-duration`, `transition-property`, and a `easing` token by hand rather
than overriding a shorthand. Two of the `transition` steps currently carry the same
duration — see [`../adr/0002-known-gaps.md`](../adr/0002-known-gaps.md).

Every motion must be safe to remove. Anything that conveys state must also convey it
statically, and `prefers-reduced-motion` must leave the interface fully usable.

---

## Typography

The productive/expressive split is the primary typographic decision:

- **Productive** — traditional web application elements. Forms, buttons, tables,
  navigation, dashboards, settings, admin surfaces, in-app microcopy. The default for UI.
- **Expressive** — brand-oriented and editorial. Marketing headlines, hero sections,
  long-form article/handbook/lexicon bodies, quotes.

Never mix the two inside one surface. Full detail in
[`../../AGENTS.md`](../../AGENTS.md#typography-productive-vs-expressive) and
[`../architecture/design-system.md`](../architecture/design-system.md#typography-productive-vs-expressive).
What follows is only what those do not cover.

### Fluid versus fixed

`tokens/typography/font-size.json` has a `fluid` branch and a `fixed` branch — and
**`fluid` exists only for `expressive`**. There is no fluid productive scale, and that is
deliberate rather than an omission:

- **Expressive type is fluid** because it is brand and editorial. A hero headline should fill the viewport it is given, and article bodies read better when they scale with the space available.
- **Productive type is fixed** because it is application UI. A button label that changes size with the viewport makes controls feel unstable and breaks the density that dense interfaces depend on.

In `cadence-core`, this is the `isFluid` prop on `Text`. Setting `isFluid` on a productive
type is a no-op at best and a bug at worst; if you want a productive size to change at a
breakpoint, change the `size` at that breakpoint.

The expressive scale runs two steps further at the top than the productive scale. There is
no productive equivalent of the largest display sizes because no application UI element
should be that large.

### Line height

`tokens/typography/line-height.json` sets expressive body noticeably looser than
productive body — long-form reading needs the leading; a dense table does not. Headline
leading is the same for both, because a headline is short enough that the family matters
more than the measure.

---

## Iconography

Icons live as SVG in
[`packages/cadence-icons/src/assets/`](../../packages/cadence-icons/src/assets/) and are
compiled to React by SVGR. `src/components/` is generated — edit the SVG.

**Before adding an icon, ask whether it earns its place.** An icon that repeats an adjacent
label adds noise. An icon without a label needs an accessible name and is usually worse
than a short label. The bar for a new icon is that it is doing work no word is doing.

Drawing rules:

- Draw on a square viewBox and keep the optical weight consistent with the existing set — a new icon that is visibly heavier or lighter than its neighbours will read as broken even when it is correct in isolation.
- Strokes, not fills, unless the concept is genuinely a solid shape. Keep stroke weight uniform across the set.
- Do not embed color. Icons inherit `currentColor` so they follow the foreground token of whatever contains them. A hardcoded fill breaks that everywhere at once.
- Optical alignment beats geometric alignment: center the icon by eye against a cap-height label, not by bounding box.

`tokens/size/index.json` provides three icon sizes. They correspond to the productive type
sizes an icon is most often set beside, so an icon and its label share a cap height. Use
these rather than sizing an icon to a specific label.

---

## Making a decision this file does not cover

If the value you need exists as a semantic token, use it. If it exists only in the palette,
you need a semantic token above it, not a palette reference.

If it exists nowhere, you are making a **design decision**, and design decisions are made
in Figma — see [`figma-workflow.md`](./figma-workflow.md). A genuinely new primitive value
belongs in the palette, which is authored there and transcribed back here. A new *role* for
values that already exist belongs in the semantic layer, which is authored here — name it
for its meaning, place it in the family it belongs to, and check the contrast of every
pairing it introduces.

Either way, record the reasoning in [`../proposals/`](../proposals/) alongside the work;
`../proposals/tokenization-proposal.md` is the exemplar for that shape. Where the choice is
genuinely open, ask rather than pick silently.

Inventing a value inline is the one option that is never correct.

## Related

- [`README.md`](./README.md) — what else lives in this directory, and the Notion boundary
- [`figma-workflow.md`](./figma-workflow.md) — how design and code stay in sync
- [`../architecture/design-system.md`](../architecture/design-system.md) — the mechanism
- [`../adr/0004-design-source-of-truth.md`](../adr/0004-design-source-of-truth.md) — why values live in one place
- [`../adr/0002-known-gaps.md`](../adr/0002-known-gaps.md) — what is deliberately unfinished
