---
'cadence-core': minor
---

Added Avatar and AvatarGroup components to cadence-core, migrated from the www app.

### Avatar
Renders a user avatar with support for three image modes:
- `imageUrl` — a plain URL rendered as an `<img>` tag
- `imageObject` — a React node (e.g. a Next.js `<Image>`) rendered directly
- Fallback — a generated placeholder from `boring-avatars` based on the user's name

Available in `small`, `medium`, and `large` sizes.

### AvatarGroup
Lays out child Avatar components in a row or column with configurable spacing, including overlapping modes (`overlap-small`, `overlap-large`) for compact displays.
