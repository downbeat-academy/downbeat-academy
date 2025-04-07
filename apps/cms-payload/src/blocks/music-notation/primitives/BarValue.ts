import { Field } from 'payload'

export const BarValue: Field = {
  name: 'barValue',
  label: 'Bar Value',
  type: 'select',
  options: [
    { label: `Single (𝄀)`, value: `single` },
    { label: `Double (𝄁)`, value: `double` },
    { label: `Final (𝄂)`, value: `final` },
    { label: `Reverse Final (𝄃)`, value: `final-reverse` },
    { label: `Dashed (𝄄)`, value: `dashed` },
    { label: `Left Repeat (𝄆)`, value: `repeat-left` },
    { label: `Right Repeat (𝄇)`, value: `repeat-right` },
  ],
}
