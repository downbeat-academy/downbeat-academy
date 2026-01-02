'use client'

import React, { forwardRef } from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import classnames from 'classnames'
import { ChevronDown, Check } from 'cadence-icons'
import s from './select.module.css'
import type {
  SelectProps,
  SelectTriggerProps,
  SelectContentProps,
  SelectItemProps,
  SelectGroupProps,
  SelectLabelProps
} from './types'

/**
 * Select Root component
 * Wraps Radix Select.Root and provides the context for all child components
 */
const Select = ({ children, ...props }: SelectProps) => {
  return (
    <SelectPrimitive.Root {...props}>
      {children}
    </SelectPrimitive.Root>
  )
}

/**
 * SelectTrigger component
 * The button that opens the select dropdown. Includes the value display and chevron icon.
 */
const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(({
  className,
  isInvalid,
  placeholder,
  children,
  ...props
}, ref) => {
  const triggerClasses = classnames(
    s['trigger'],
    isInvalid && s['is-invalid'],
    className
  )

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={triggerClasses}
      {...props}
    >
      <SelectPrimitive.Value placeholder={placeholder} className={s['trigger-value']}>
        {children}
      </SelectPrimitive.Value>
      <SelectPrimitive.Icon asChild>
        <ChevronDown width={16} height={16} className={s['trigger-icon']} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
})

/**
 * SelectContent component
 * The dropdown content container. Wraps Portal, Content, and Viewport.
 */
const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(({
  className,
  children,
  position = 'popper',
  sideOffset = 4,
  ...props
}, ref) => {
  const contentClasses = classnames(
    s['content'],
    className
  )

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={contentClasses}
        position={position}
        sideOffset={sideOffset}
        {...props}
      >
        <SelectPrimitive.ScrollUpButton className={s['scroll-button']}>
          <ChevronDown width={16} height={16} style={{ transform: 'rotate(180deg)' }} />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className={s['viewport']}>
          {children}
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className={s['scroll-button']}>
          <ChevronDown width={16} height={16} />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
})

/**
 * SelectItem component
 * Individual selectable option within the dropdown
 */
const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(({
  className,
  children,
  ...props
}, ref) => {
  const itemClasses = classnames(
    s['item'],
    className
  )

  return (
    <SelectPrimitive.Item
      ref={ref}
      className={itemClasses}
      {...props}
    >
      <SelectPrimitive.ItemText className={s['item-text']}>
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className={s['item-indicator']}>
        <Check width={16} height={16} />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
})

/**
 * SelectGroup component
 * Groups related select items together
 */
const SelectGroup = forwardRef<HTMLDivElement, SelectGroupProps>(({
  className,
  children,
  ...props
}, ref) => {
  const groupClasses = classnames(
    s['group'],
    className
  )

  return (
    <SelectPrimitive.Group
      ref={ref}
      className={groupClasses}
      {...props}
    >
      {children}
    </SelectPrimitive.Group>
  )
})

/**
 * SelectLabel component
 * Label for a group of select items
 */
const SelectLabel = forwardRef<HTMLDivElement, SelectLabelProps>(({
  className,
  children,
  ...props
}, ref) => {
  const labelClasses = classnames(
    s['label'],
    className
  )

  return (
    <SelectPrimitive.Label
      ref={ref}
      className={labelClasses}
      {...props}
    >
      {children}
    </SelectPrimitive.Label>
  )
})

Select.displayName = 'Select'
SelectTrigger.displayName = 'SelectTrigger'
SelectContent.displayName = 'SelectContent'
SelectItem.displayName = 'SelectItem'
SelectGroup.displayName = 'SelectGroup'
SelectLabel.displayName = 'SelectLabel'

export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel
}

export type {
  SelectProps,
  SelectTriggerProps,
  SelectContentProps,
  SelectItemProps,
  SelectGroupProps,
  SelectLabelProps
}
