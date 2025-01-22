import React from 'react'
import * as SwitchBase from '@radix-ui/react-switch';
import { Check } from 'cadence-icons';
import s from './switch.module.scss';

import type { SwitchProps } from './types';

const Switch = ({ id }: SwitchProps) => {
  return (
    <SwitchBase.Root className={s['switch-root']} id={id}>
      <Check color='white' width='18' className={s['switch-check']} />
      <SwitchBase.Thumb className={s['switch-thumb']} />
    </SwitchBase.Root>
  )
}

export { Switch }