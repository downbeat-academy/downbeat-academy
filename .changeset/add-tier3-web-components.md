---
"cadence-core-web-components": minor
---

Add Tier 3 composite display web components: Banner, Section Title, Blockquote, and Summary.

- `cds-banner` — thin wrapper with a `type` attribute (`primary` | `secondary` | `tertiary`) and a single default slot; compose `<section>`/`<aside>` inside for content + actions
- `cds-section-title` — `alignment` (`left` | `center` | `right`), `background`, and `has-border` (boolean, default `true`) attributes; named `title` and `subtitle` slots plus a default slot for body content
- `cds-blockquote` — `attribution`, `link`, and `collapse` (boolean) attributes; default slot for the quote text; composes `cds-text` and `cds-link` internally
- `cds-summary` — wraps native `<details>`/`<summary>` for stateless disclosure; `is-open`, `type` (`contained` | `flush`), `size` (`small` | `medium` | `large`), and `max-width` attributes; named `title` slot and default content slot, with an inline chevron icon that rotates when open

All components include Storybook stories and unit tests.
