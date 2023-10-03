'use client'

import classnames from 'classnames'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import type { TabsProps } from './types'

const Tabs = ({
  children,
  defaultValue,
  value,
  onValueChange,
  orientation = 'horizontal',
  dir = 'ltr',
  activationMode = 'automatic',
  className,
}: TabsProps) => {

  const classes = classnames([
    className,
  ])

  return (
    <TabsPrimitive.Root
      className={classes}
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      orientation={orientation}
      dir={dir}
      activationMode={activationMode}
    >
      {children}
    </TabsPrimitive.Root>
  )
}

Tabs.displayName = 'Tabs'

const Root = Tabs;

export {
  Tabs,
  Root,
}

export type { TabsProps }

