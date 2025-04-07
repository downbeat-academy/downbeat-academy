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
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'Clef', value: 'clef' },
            { label: 'Accidental', value: 'accidental' },
            { label: 'Bar Value', value: 'barValue' },
            { label: 'Music Symbol', value: 'musicSymbol' },
            { label: 'Rhythmic Value', value: 'rhythmicValue' },
            { label: 'Text', value: 'text' },
          ],
        },
        {
          name: 'clef',
          type: 'group',
          label: false,
          admin: {
            condition: (data, siblingData) => {
              return siblingData?.type === 'clef' ? true : false
            },
          },
          fields: [Clef],
        },
        {
          name: 'accidental',
          type: 'group',
          label: false,
          admin: {
            condition: (data, siblingData) => {
              return siblingData?.type === 'accidental' ? true : false
            },
          },
          fields: [Accidental],
        },
        {
          name: 'barValue',
          type: 'group',
          label: false,
          admin: {
            condition: (data, siblingData) => {
              return siblingData?.type === 'barValue' ? true : false
            },
          },
          fields: [BarValue],
        },
        {
          name: 'musicSymbol',
          type: 'group',
          label: false,
          admin: {
            condition: (data, siblingData) => {
              return siblingData?.type === 'musicSymbol' ? true : false
            },
          },
          fields: [MusicSymbol],
        },
        {
          name: 'rhythmicValue',
          type: 'group',
          label: false,
          admin: {
            condition: (data, siblingData) => {
              return siblingData?.type === 'rhythmicValue' ? true : false
            },
          },
          fields: [RhythmicValue],
        },
        {
          name: 'text',
          type: 'group',
          label: false,
          admin: {
            condition: (data, siblingData) => {
              return siblingData?.type === 'text' ? true : false
            },
          },
          fields: [Text],
        },
      ],
    },
  ],
}
