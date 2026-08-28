import { ComponentPropsWithoutRef, ReactNode } from 'react'

export interface CheckboxCardGroupProps {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
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

// The card is a `<label>`, which is what lets a click anywhere on it toggle the checkbox
// natively — no click handler, and no separate control to keep in sync.
//
// `onChange` is omitted deliberately: this component's change API is `onCheckedChange`,
// and the label's DOM handler would otherwise collide with the input's own.
export interface CheckboxCardItemProps
  extends Omit<ComponentPropsWithoutRef<'label'>, 'onChange'> {
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
  // Checkbox-specific props
  checked?: boolean | 'indeterminate'
  onCheckedChange?: (checked: boolean) => void
  // Internal props passed from CheckboxCardGroup (prefixed with _).
  //
  // `_groupDefaultValue` is gone: the group now holds its own uncontrolled state and always
  // passes a concrete `_groupValue`, so an item never has to reason about a default it
  // cannot act on.
  _groupValue?: string[]
  _groupOnValueChange?: (value: string[]) => void
  _groupDisabled?: boolean
  _groupRequired?: boolean
  _groupName?: string
  _groupIsInvalid?: boolean
}