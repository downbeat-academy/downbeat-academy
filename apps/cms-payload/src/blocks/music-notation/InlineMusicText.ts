import type { Block } from 'payload'

// Primitives
import { Accidental } from './primitives/Accidental'
import { BarValue } from './primitives/BarValue'
import { Clef } from './primitives/Clef'
import { MusicSymbol } from './primitives/MusicSymbol'
import { RhythmicValue } from './primitives/RhythmicValue'
import { Text } from './primitives/Text'

export const InlineMusicText: Block = {
  slug: 'inline-music-text',
  interfaceName: 'InlineMusicTextBlock',
  labels: {
    singular: 'Inline Music Text',
    plural: 'Inline Music Texts',
  },
  fields: [
    {
      name: 'options',
      label: 'Options',
      type: 'array',
      fields: [Clef, Accidental, BarValue, MusicSymbol, RhythmicValue, Text],
    },
  ],
}
