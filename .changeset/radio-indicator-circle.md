---
'cadence-core': patch
---

Draw the `Radio` selection dot as a circle rather than a slight ellipse.

`radio.module.css` declared the dot as `width: 8px; height: 6px` with `border-radius: 50%`,
which renders an ellipse. The dimensions were reproduced exactly during the native-input
migration so that migration would produce no visual diff, with the discrepancy recorded in
a comment rather than fixed — correcting it there would have been a visual change hiding
inside a behaviour-only change.

The height is now `8px`, and a test asserts the two dimensions match so the dot cannot
silently become an ellipse again. `RadioCardItem` renders a `Radio`, so this changes the
appearance of radio cards too.
