import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Root as RadioGroupRoot, Item as RadioGroupItem } from '@radix-ui/react-radio-group'

export interface RadioCardGroupProps extends ComponentPropsWithoutRef<typeof RadioGroupRoot> {
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

export interface RadioCardItemProps extends ComponentPropsWithoutRef<typeof RadioGroupItem> {
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