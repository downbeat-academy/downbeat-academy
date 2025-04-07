import type { Block } from 'payload'

export const InlineChord: Block = {
  slug: 'inline-chord',
  interfaceName: 'InlineChordBlock',
  labels: {
    singular: 'Inline Chord',
    plural: 'Inline Chords',
  },
  fields: [
    {
      name: 'root',
      label: 'Root',
      type: 'text',
      admin: {
        placeholder: 'The root of the chord.',
      },
    },
    {
      name: 'quality',
      label: 'Quality',
      type: 'select',
      options: [
        { label: 'Major', value: 'major' },
        { label: 'Major 7', value: 'major7' },
        { label: 'Major 6', value: 'major6' },
        { label: 'Dominant 7', value: 'dominant7' },
        { label: 'Minor', value: 'minor' },
        { label: 'Minor 7', value: 'minor7' },
        { label: 'Minor/Major 7', value: 'minMaj7' },
        { label: 'Diminished', value: 'dim' },
        { label: 'Diminished 7', value: 'dim7' },
        { label: 'Half diminished 7', value: 'halfDim7' },
        { label: 'Suspended (sus4)', value: 'sus4' },
        { label: 'Augmented', value: 'aug' },
        { label: 'Augmented 7', value: 'aug7' },
      ],
    },
    {
      name: 'extension',
      label: 'Extension',
      type: 'select',
      options: [
        { label: '♭9', value: 'flat9' },
        { label: '♭5', value: 'flat5' },
        { label: '♯5', value: 'sharp5' },
        { label: '♭13', value: 'flat13' },
        { label: '♯9', value: 'sharp9' },
        { label: '♯11', value: 'sharp11' },
        { label: '♯9/♭9', value: 'sharp9flat9' },
        { label: '6/9', value: 'sixNine' },
        { label: 'Altered', value: 'altered' },
      ],
    },
    {
      name: 'alternateBass',
      label: 'Alternate Bass Note',
      type: 'text',
      admin: {
        placeholder: '(Optional) Give an alternate bass note to the root of the chord.',
      },
    },
  ],
}
