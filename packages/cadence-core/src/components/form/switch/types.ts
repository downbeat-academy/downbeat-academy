import { ComponentPropsWithoutRef } from 'react'

export interface SwitchProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'role'> {
  /** Renders the critical border and focus ring. */
  isInvalid?: boolean
}
