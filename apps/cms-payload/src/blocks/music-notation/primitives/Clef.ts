import { Field } from 'payload'

export const Clef: Field = {
  name: 'clef',
  label: 'Clef',
  type: 'select',
  options: [
    { label: `Treble Clef (𝄞)`, value: `treble-clef` },
    { label: `Alto Clef (𝄡)`, value: `alto-clef` },
    { label: `Bass Clef (𝄢)`, value: `bass-clef` },
    { label: `Drum Clef`, value: `drum-clef` },
  ],
}
