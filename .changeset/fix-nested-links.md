---
'www': patch
---

Fix nested anchor tag hydration error in HandbookReference component

- Use `asChild` on `HoverCardTrigger` so the Radix primitive delegates to the child `Link` element instead of wrapping it in a second `<a>` tag.
- Render the `QuestionCircleOutline` icon directly inside the `Link` since `asChild` bypasses the trigger's built-in icon rendering.
