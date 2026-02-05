---
'cadence-core': minor
'www': patch
---

Migrate Dialog component from www to cadence-core shared library. The new Dialog is a compound component built on Radix UI primitives, providing Dialog, DialogTrigger, DialogContent, DialogOverlay, DialogClose, DialogHeader, DialogFooter, DialogTitle, and DialogDescription sub-components with full accessibility support. The www app now imports Dialog from cadence-core instead of its local implementation.
