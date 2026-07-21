---
"cadence-core": patch
---

Phase 4 tokenization: button padding, audio player sizing, and debug cleanup.

Button component padding values replaced with scale tokens where the design scale aligns (4px → 2x-small, 8px → x-small, 16px → base, 20px → large, 24px → x-large). Values without a scale equivalent (6px, 9px, 10px) remain as explicit pixel values.

Audio player player-button sizes now use scale tokens (32px → 2x-large, 40px → 3x-large, 56px → 4x-large) and `border-radius: 50%` replaces hardcoded pixel radii.

Audio player controls and progress-bar updated: `--track-height` and `--thumb-size` local custom properties now reference `--cds-scale-2x-small` and `--cds-scale-large` respectively. Thumb dimensions and `border: 1px` in controls replaced with CDS tokens. Removed leftover `background: red` debug declaration.
