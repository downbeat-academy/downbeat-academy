import { ComponentPropsWithoutRef, ReactNode } from 'react'

export interface RadioCardGroupProps extends ComponentPropsWithoutRef<'div'> {
  value?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  required?: boolean
  name?: string
  orientation?: 'horizontal' | 'vertical'
  loop?: boolean
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

export interface RadioCardItemProps extends ComponentPropsWithoutRef<'div'> {
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
  // Internal props passed from RadioCardGroup (prefixed with _)
  _groupValue?: string
  _groupOnValueChange?: (value: string) => void
  _groupDisabled?: boolean
  _groupRequired?: boolean
  _groupName?: string
  _groupIsInvalid?: boolean
}