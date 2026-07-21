# Tokenization & Theming Proposal

**Date:** 2026-06-23  
**Scope:** `apps/www`, `packages/cadence-core`, `packages/cadence-tokens`

---

## Executive Summary

The Cadence Design System has a solid foundation — semantic color tokens, spacing scale, typography, border radius, animation durations, and focus rings are already in place and well-adopted across ~100 CSS files. The gaps are well-defined: **shadows, border widths, animation easing curves, overlay colors, icon sizes, breakpoints, and z-index** are all hardcoded and repeated. This proposal lays out a phased plan to close those gaps and establish a theming-ready architecture.

---

## Current State

### What's Working Well

The `--cds-` prefix is used consistently. Token adoption is high in `cadence-core` and reasonable in `apps/www`. The following categories are already tokenized and require no structural changes:

| Category | Token Prefix | Status |
|---|---|---|
| Colors (palette, foreground, surface, border, page) | `--cds-color-*` | Complete |
| Spacing | `--cds-scale-*` | Complete |
| Typography (family, size, line-height) | `--cds-typography-*` | Complete |
| Border radius | `--cds-radii-*` | Complete |
| Transition durations | `--cds-transition-*` | Complete |
| Focus ring | `--cds-focus-ring-*` | Complete |
| Elevation (single shadow) | `--cds-elevation-*` | Partial — expand |

### Gaps (by priority)

---

## Phase 1 — Critical Gaps (High Impact, Low Risk)

These are hardcoded values repeated across 5+ files. Adding tokens here immediately reduces drift and enables theming.

### 1.1 Shadow System

Currently there is a single `--cds-elevation-box-shadow-base` token. Five distinct shadow patterns are hardcoded across 15+ files.

**Proposed tokens in `cadence-tokens/src/elevation.json`:**

```json
{
  "elevation": {
    "box-shadow": {
      "base":    { "value": "0 1px 16px 0 hsla(240, 36%, 22%, 5%)" },
      "raised":  { "value": "0 2px 4px 0 rgba(0, 0, 0, 0.10)" },
      "floating":{ "value": "0 4px 12px 0 rgba(0, 0, 0, 0.10)" },
      "overlay": { "value": "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px" },
      "popover": { "value": "1px 1px 4px 0 rgba(0, 0, 0, 0.10)" },
      "inset":   { "value": "0 -8px 24px -4px rgba(0, 0, 0, 0.10)" }
    }
  }
}
```

**Usage mapping:**

| Token | Replace hardcoded value | Used in |
|---|---|---|
| `--cds-elevation-box-shadow-raised` | `0 2px 4px rgba(0,0,0,0.1)` | `nav-content`, form shadows |
| `--cds-elevation-box-shadow-floating` | `0 4px 12px rgba(0,0,0,0.1)` | `checkbox-card`, `radio-card` |
| `--cds-elevation-box-shadow-overlay` | `hsl(206 22% 7% / 35%) ...` | `dialog`, `drawer` |
| `--cds-elevation-box-shadow-popover` | `1px 1px 4px 0 rgba(0,0,0,0.1)` | `hover-card` |
| `--cds-elevation-box-shadow-inset` | `0 -8px 24px -4px rgba(0,0,0,0.1)` | `table-of-contents` (mobile) |

---

### 1.2 Border Width

`1px` and `2px` appear as hardcoded border widths 20+ times. No tokens exist for these.

**Proposed tokens in `cadence-tokens/src/border.json`:**

```json
{
  "border": {
    "width": {
      "thin":   { "value": "1px" },
      "medium": { "value": "2px" }
    }
  }
}
```

**CSS output:** `--cds-border-width-thin`, `--cds-border-width-medium`

These replace every `border: 1px solid var(--cds-color-border-*)` pattern. The value itself rarely changes; the theming benefit is being able to set `--cds-border-width-thin: 0` to flatten a theme, or `2px` for a heavier stroke.

---

### 1.3 Overlay Color

`rgba(0, 0, 0, 0.5)` is hardcoded in `dialog.module.css` and `drawer.module.css` as the backdrop color. This is a theming target — dark themes or brand themes need a different overlay.

**Proposed token in `cadence-tokens/src/color.json`** (under the existing color block):

```json
{
  "color": {
    "overlay": {
      "scrim": { "value": "rgba(0, 0, 0, 0.5)" }
    }
  }
}
```

**CSS output:** `--cds-color-overlay-scrim`

---

## Phase 2 — Motion & Interaction Tokens

### 2.1 Animation Easing Curves

Transition durations are already tokenized (`--cds-transition-01` through `--cds-transition-09`). But easing functions are hardcoded and inconsistent:

- `ease-in-out` — used on most cadence-core components
- `cubic-bezier(0.16, 1, 0.3, 1)` — ease-out spring, used 4+ times in `dropdown-menu`, `dialog`, `drawer`
- `cubic-bezier(0.4, 0, 0.6, 1)` — standard ease, used in pulse animation

**Proposed tokens in `cadence-tokens/src/animation.json`:**

```json
{
  "animation": {
    "easing": {
      "standard":  { "value": "ease-in-out" },
      "enter":     { "value": "cubic-bezier(0.16, 1, 0.3, 1)" },
      "exit":      { "value": "cubic-bezier(0.4, 0, 0.2, 1)" },
      "linear":    { "value": "linear" }
    }
  }
}
```

**CSS output:** `--cds-animation-easing-standard`, `--cds-animation-easing-enter`, etc.

The `enter` easing (`cubic-bezier(0.16, 1, 0.3, 1)`) is the spring curve used on all overlay openings. Naming it semantically (`enter`) makes it easy to swap all overlay motion in one place for a reduced-motion or brand theme.

---

### 2.2 Disabled State Opacity

`opacity: 0.6` is hardcoded across multiple components for disabled states.

**Proposed token:**

```json
{
  "state": {
    "disabled": {
      "opacity": { "value": "0.6" }
    }
  }
}
```

**CSS output:** `--cds-state-disabled-opacity`

---

## Phase 3 — Layout & Size Tokens

### 3.1 Breakpoints

Breakpoints are entirely missing from the token system. Three values appear across 15+ files:

| Breakpoint | Usage |
|---|---|
| `480px` | small mobile |
| `768px` | tablet / mobile nav |
| `1000px` | content layout switch |
| `1200px` | max-width for content areas |

CSS custom properties cannot be used directly in `@media` queries, but they can be defined as tokens for documentation and SCSS variable output. The SCSS output (`tokens.scss`) from style-dictionary can be used in media query mixins.

**Proposed tokens in `cadence-tokens/src/layout.json`:**

```json
{
  "breakpoint": {
    "sm":  { "value": "480px" },
    "md":  { "value": "768px" },
    "lg":  { "value": "1000px" },
    "xl":  { "value": "1200px" }
  }
}
```

**SCSS output:** `$cds-breakpoint-sm`, `$cds-breakpoint-md`, etc.

Pair with a SCSS mixin file in `cadence-tokens/src/mixins.scss`:

```scss
@mixin breakpoint-up($bp) {
  @media (min-width: #{$bp}) { @content; }
}

// Usage: @include breakpoint-up($cds-breakpoint-md) { ... }
```

**Note:** The `1200px` max-content-width also appears as a layout constant inside `grid.module.css` calculations. This should become its own token: `--cds-layout-content-max-width: 1200px`.

---

### 3.2 Icon Sizes

Icon size values (`16px`, `20px`, `24px`) appear hardcoded in `cadence-core` components. These map to `--cds-scale-*` tokens approximately but aren't formally defined.

**Proposed tokens in `cadence-tokens/src/size.json`:**

```json
{
  "size": {
    "icon": {
      "small":  { "value": "1rem" },
      "medium": { "value": "1.25rem" },
      "large":  { "value": "1.5rem" }
    }
  }
}
```

**CSS output:** `--cds-size-icon-small` (16px), `--cds-size-icon-medium` (20px), `--cds-size-icon-large` (24px)

---

### 3.3 Z-Index Scale

Z-index values are inconsistently hardcoded across 6+ files. Theming and layering is impossible without a defined scale.

**Proposed tokens in `cadence-tokens/src/z-index.json`:**

```json
{
  "z-index": {
    "base":        { "value": "1" },
    "raised":      { "value": "10" },
    "dropdown":    { "value": "40" },
    "overlay":     { "value": "50" },
    "toast":       { "value": "60" }
  }
}
```

**CSS output:** `--cds-z-index-base`, `--cds-z-index-dropdown`, `--cds-z-index-overlay`, etc.

---

### 3.4 Content Width Constraints

Several max-width values appear repeatedly:

| Value | Context |
|---|---|
| `300px` | Sidebar / table of contents |
| `400px` | Modals, hover-card |
| `600px` | Forms, auth pages |
| `65ch` | Body text reading width |
| `75ch` | Wide reading width |

`ch`-based values are semantic and probably shouldn't change per theme, but the pixel values are strong theming candidates.

**Proposed tokens:**

```json
{
  "size": {
    "content": {
      "sidebar":  { "value": "300px" },
      "dialog":   { "value": "400px" },
      "form":     { "value": "600px" },
      "prose":    { "value": "65ch" },
      "prose-wide": { "value": "75ch" }
    }
  }
}
```

---

## Phase 4 — Component-Level Cleanup

These are internal component values. They're less about theming and more about removing magic numbers.

### 4.1 Button Padding

`button.module.css` has 16 hardcoded padding values across 4 sizes. These don't map cleanly to `--cds-scale-*` tokens but should be consistent. Recommend using local CSS custom properties per component that reference global scale tokens:

```css
/* button.module.css */
.button {
  /* Map from scale tokens */
  --button-padding-block-xs:  var(--cds-scale-3x-small);   /* 0.125rem */
  --button-padding-inline-xs: var(--cds-scale-x-small);    /* 0.5rem */

  --button-padding-block-sm:  var(--cds-scale-2x-small);
  --button-padding-inline-sm: var(--cds-scale-small);

  --button-padding-block-md:  var(--cds-scale-2x-small);
  --button-padding-inline-md: var(--cds-scale-medium);

  --button-padding-block-lg:  var(--cds-scale-small);
  --button-padding-inline-lg: var(--cds-scale-large);
}
```

This keeps component-level flexibility while making the values traceable.

### 4.2 Audio Player Custom Properties

`audio-player` uses local CSS custom properties (`--track-color`, `--thumb-color`, etc.) for range input styling. These are a good pattern but should reference color tokens:

```css
--track-color: var(--cds-color-surface-high-contrast);
--thumb-color: var(--cds-color-foreground-primary);
--progress-color: var(--cds-color-foreground-brand);
```

### 4.3 Remove Debug Color

`sidebar.module.css` contains `background: lightgreen` — a debug value. This should be removed.

---

## Theming Architecture

With the tokens above in place, CSS theming becomes straightforward via attribute selectors on a root element:

```css
/* Default (light) theme — already in tokens.css */
:root {
  --cds-color-surface-primary: ...;
  --cds-color-foreground-primary: ...;
  /* etc */
}

/* Dark theme override */
[data-theme="dark"] {
  --cds-color-surface-primary: ...;
  --cds-color-foreground-primary: ...;
  --cds-color-overlay-scrim: rgba(0, 0, 0, 0.7);
  --cds-elevation-box-shadow-overlay: ...;
}
```

Style Dictionary supports multiple output files per platform, so theme variants can be generated from separate token sets and merged at build time.

---

## Implementation Order

| Phase | Tokens to Add | Files to Update | Effort |
|---|---|---|---|
| **1 — Shadows** | `elevation.box-shadow.*` (5 new) | `dialog`, `drawer`, `hover-card`, `checkbox-card`, `radio-card`, `nav-content`, `table-of-contents` | Low |
| **1 — Border width** | `border.width.thin/medium` | 20+ CSS files | Low (sed-able) |
| **1 — Overlay color** | `color.overlay.scrim` | `dialog`, `drawer` | Trivial |
| **2 — Easing** | `animation.easing.*` | `dropdown-menu`, `dialog`, `drawer`, `skeleton-loader` | Low |
| **2 — Disabled opacity** | `state.disabled.opacity` | `button`, `form` inputs | Low |
| **3 — Breakpoints** | `breakpoint.*` + SCSS mixin | All files with `@media` | Medium (requires SCSS refactor) |
| **3 — Icon sizes** | `size.icon.*` | Icon-using components | Low |
| **3 — Z-index** | `z-index.*` | 6 files | Low |
| **3 — Content widths** | `size.content.*` | `dialog`, forms, `sidebar` | Low |
| **4 — Button padding** | Local props mapping scale | `button.module.css` | Medium |
| **4 — Audio player** | Reference color tokens | `audio-player/*.css` | Low |
| **4 — Debug cleanup** | Remove `lightgreen` | `sidebar.module.css` | Trivial |

---

## Notes on Style Dictionary Config

The existing `config.js` already outputs both CSS variables and SCSS variables. No config changes are needed to support the new tokens — just add new JSON source files under `cadence-tokens/src/` following the existing structure.

One recommended addition: a `size/px` transform for the breakpoint and size tokens that should stay in `px` rather than converting to `rem`:

```js
StyleDictionary.registerTransform({
  name: 'size/px-passthrough',
  type: 'value',
  matcher: (token) => token.attributes.category === 'breakpoint',
  transformer: (token) => token.original.value, // keep px as-is
});
```

---

## Out of Scope

- `100%`, `100vw`, `100vh`, `100dvh` — these are intentional layout values, not candidates for tokens
- `65ch` / `75ch` reading widths — could be tokens but are semantically clear as-is
- Font smoothing in `global.css` — standard reset, not theming-relevant
- `1px` in CSS transforms/animations (e.g., `translateY(1px)`) — visual micro-adjustments, not border widths
