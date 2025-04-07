import { Field } from 'payload'

export const RhythmicValue: Field = {
  name: 'rhythmicValue',
  label: 'Rhythmic Value',
  type: 'select',
  options: [
    { label: `Whole Note`, value: `whole-note` },
    { label: `Half Note`, value: `half-note` },
    { label: `Quarter Note`, value: `quarter-note` },
    { label: `Eighth Note`, value: `eighth-note` },
    { label: `Sixteenth Note`, value: `sixteenth-note` },
    { label: `Thirty-second Note`, value: `thirty-second-note` },
  ],
}
