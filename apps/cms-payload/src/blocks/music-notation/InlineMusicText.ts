import type { Block } from 'payload'

// Primitives
import { Accidental } from './primitives/Accidental'

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
      fields: [Accidental],
    },
  ],
}
