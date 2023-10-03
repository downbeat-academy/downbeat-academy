'use client'

import classnames from 'classnames'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import type { TabContentProps } from './types'

const TabContent = ({
  children,
  value,
  className
}: TabContentProps) => {

  const classes = classnames([
    className,
  ])

  return (
    <TabsPrimitive.Content value={value} className={classes}>
      {children}
    </TabsPrimitive.Content>
  )
}

TabContent.displayName = 'TabContent'

const Content = TabContent;

export { TabContent, Content }
export type { TabContentProps }
