import { Field } from 'payload'

export const MusicSymbol: Field = {
  name: 'musicSymbol',
  label: 'Music Symbol',
  type: 'select',
  options: [
    { label: `Dal Segno`, value: `dal-segno` },
    { label: `Da Capo (𝄊)`, value: `da-capo` },
    { label: `Segno`, value: `segno` },
    { label: `Fermata`, value: `fermata` },
    { label: `Breath Mark`, value: `breath-mark` },
    { label: `Caesura`, value: `caesura` },
    { label: `Code`, value: `code` },
  ],
}
