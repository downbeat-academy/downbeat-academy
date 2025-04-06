import { Field } from 'payload'

export const Accidental: Field = {
  name: 'accidental',
  type: 'select',
  options: [
    { label: `Flat (♭)`, value: `flat` },
    { label: `Sharp (♯)`, value: `sharp` },
    { label: `Double Flat (𝄫)`, value: `double-flat` },
    { label: `Double Sharp (𝄪)`, value: `double-sharp` },
    { label: `Natural (♮)`, value: 'natural' },
  ],
}
