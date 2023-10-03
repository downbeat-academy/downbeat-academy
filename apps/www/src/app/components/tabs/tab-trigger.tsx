'use client'

import classnames from 'classnames'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import type { TabTriggerProps } from './types'

const TabTrigger = ({
  children,
  value,
  disabled,
  className
}: TabTriggerProps) => {

  const classes = classnames([
    className,
  ])

  return (
    <TabsPrimitive.Trigger
      value={value}
      className={classes}
      disabled={disabled}
    >
      {children}
    </TabsPrimitive.Trigger>
  )
}

TabTrigger.displayName = 'TabTrigger'

const Trigger = TabTrigger;

export { TabTrigger, Trigger } 
export type { TabTriggerProps }