import { ComponentPropsWithoutRef, ReactNode } from 'react'

// `onChange` is omitted deliberately: this component's change API is `onValueChange`, and
// the div's DOM handler would otherwise collide with the group-level callback that
// `RadioGroup` now takes under that same name.
export interface RadioCardGroupProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  value?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  required?: boolean
  name?: string
  orientation?: 'horizontal' | 'vertical'
  isInvalid?: boolean
  className?: string
  children: ReactNode
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  // Grid layout props
  columns?: 1 | 2 | 3 | 4 | 5 | 6
  gap?: 'small' | 'base' | 'large'
}

// The card is a `<label>`, which is what lets a click anywhere on it activate the radio
// natively — no click handler, and no separate control to keep in sync.
export interface RadioCardItemProps extends ComponentPropsWithoutRef<'label'> {
  value: string
  disabled?: boolean
  required?: boolean
  id?: string
  isInvalid?: boolean
  className?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  // Card-specific props
  children?: ReactNode
  size?: 'small' | 'medium' | 'large'
  alignment?: 'left' | 'center'
  // Rich content props
  icon?: ReactNode
  title?: string
  badge?: ReactNode
  // Internal props passed from RadioCardGroup (prefixed with _).
  //
  // `_groupValue`, `_groupOnValueChange` and `_groupName` are gone: selection, the shared
  // `name`, and the change callback now travel through RadioGroup's context to the native
  // input, so the card no longer mirrors group state in JavaScript.
  _groupDisabled?: boolean
  _groupRequired?: boolean
  _groupIsInvalid?: boolean
}