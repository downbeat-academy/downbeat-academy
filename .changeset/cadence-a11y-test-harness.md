---
'cadence-core': patch
---

Adds the accessibility test harness the Radix removal work depends on: registers
`@storybook/addon-a11y`, and extracts the ad-hoc `axe.run` and declared-rule helpers from
the sidebar suite into `src/test-utils/` so every component suite shares one
implementation.

Tooling only — no component, API, or bundle change. `src/test-utils/` is excluded from
`tsconfig.json` alongside `__test__/`, so nothing reaches `dist/`.
