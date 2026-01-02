import { ComponentPropsWithoutRef } from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'

export interface SelectProps extends ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {}

export interface SelectTriggerProps extends ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  isInvalid?: boolean
  placeholder?: string
}

export interface SelectContentProps extends ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {}

export interface SelectItemProps extends ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {}

export interface SelectGroupProps extends ComponentPropsWithoutRef<typeof SelectPrimitive.Group> {}

export interface SelectLabelProps extends ComponentPropsWithoutRef<typeof SelectPrimitive.Label> {}
