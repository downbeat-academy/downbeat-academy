import { ComponentPropsWithoutRef } from 'react'
import { Root as CheckboxRoot } from '@radix-ui/react-checkbox'

export interface CheckboxGroupProps {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  disabled?: boolean
  required?: boolean
  name?: string
  orientation?: 'horizontal' | 'vertical'
  isInvalid?: boolean
  className?: string
  children: React.ReactNode
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
}

export interface CheckboxItemProps extends ComponentPropsWithoutRef<typeof CheckboxRoot> {
  value: string
  disabled?: boolean
  required?: boolean
  id?: string
  isInvalid?: boolean
  className?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
}