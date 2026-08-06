---
'cadence-core': patch
'www': patch
---

Two Radix dependency-hygiene fixes, found while auditing the Radix removal epic.

`@radix-ui/react-collapsible` and `@radix-ui/react-slot` were missing from the Rollup
`external` array, so both were bundled into `dist/index.esm.js` while the other ten Radix
packages stayed external. Consumers were shipping a second copy of code they already had
installed. Marking them external drops the ESM bundle from 317,829 to 285,457 bytes.

`www` declared six `@radix-ui/*` dependencies it never imported — it consumes Radix only
indirectly through `cadence-core`. Removed.

No API or behavior change in either package.
