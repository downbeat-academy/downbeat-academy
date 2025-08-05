import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Root as CheckboxRoot } from '@radix-ui/react-checkbox'

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

export interface CheckboxCardItemProps extends ComponentPropsWithoutRef<typeof CheckboxRoot> {
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
  variant?: 'default' | 'outlined' | 'filled'
  // Rich content props
  icon?: ReactNode
  title?: string
  description?: string
  badge?: ReactNode
}