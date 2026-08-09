import { ComponentPropsWithoutRef } from 'react'

export interface CheckboxProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
  /** Renders the critical border and focus ring. */
  isInvalid?: boolean
  /** The third, mixed state. Native checkboxes model this as a DOM property
   * rather than a value of `checked`, so it is set imperatively via ref.
   * @default false
   */
  indeterminate?: boolean
}
