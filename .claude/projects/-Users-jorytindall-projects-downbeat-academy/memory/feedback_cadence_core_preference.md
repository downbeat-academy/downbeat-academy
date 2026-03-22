---
name: Always use Cadence components
description: Never use raw HTML elements when a cadence-core component exists — applies to links, buttons, selects, inputs, and all UI primitives
type: feedback
---

Always use cadence-core components instead of raw HTML elements or inline-styled elements. This includes Link, Button, Select, Input, Text, Badge, and any other UI primitive available in the library.

**Why:** Jory has corrected this multiple times. Using raw `<a>`, `<button>`, `<select>`, etc. with inline styles is inconsistent with the design system and creates maintenance burden. The Cadence components already handle styling, tokens, and accessibility.

**How to apply:** Before writing any UI element, check if cadence-core exports a matching component (`packages/cadence-core/src/index.ts`). If one exists, use it. If it doesn't support the needed functionality, extend the component rather than falling back to raw HTML.
