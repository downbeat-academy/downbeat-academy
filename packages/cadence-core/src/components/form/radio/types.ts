import { ComponentPropsWithoutRef } from 'react'

export type RadioGroupOrientation = 'horizontal' | 'vertical'

export interface RadioGroupProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange' | 'defaultValue'> {
  /** The selected value. Providing this makes the group controlled. */
  value?: string
  /** The initially selected value, for an uncontrolled group. */
  defaultValue?: string
  /** Fired with the newly selected value.
   *
   * Note this is not a DOM change event — HTML has no group element to fire one. It is
   * the group abstraction the platform lacks.
   */
  onChange?: (value: string) => void
  /** The shared `name` given to every radio, which is what makes the browser treat them
   * as one group. Generated automatically when omitted.
   */
  name?: string
  /** Disables every radio in the group. */
  disabled?: boolean
  /** Marks every radio in the group as required, so the group must have a selection. */
  required?: boolean
  /** Lays the group out along an axis, and sets `aria-orientation`.
   * @default 'vertical'
   */
  orientation?: RadioGroupOrientation
}

export interface RadioProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
  /** The value submitted when this radio is selected. */
  value: string
  /** Renders the critical border and focus ring. */
  isInvalid?: boolean
}
