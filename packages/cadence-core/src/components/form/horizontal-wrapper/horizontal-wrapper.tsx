import React from 'react'
import classnames from 'classnames'
import s from './horizontal-wrapper.module.css'
import type { HorizontalWrapperProps } from './types'

const HorizontalWrapper = ({ 
  gap = 'medium',
  children, 
  className,
  ...restProps 
}: HorizontalWrapperProps) => {
  const classes = classnames(s['root'], className)

  // Clone children and apply appropriate classes
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement<Record<string, unknown>>(child)) {
      const isButton = child.type === 'button' ||
                      (typeof child.type === 'function' && (child.type as { displayName?: string }).displayName?.includes('Button')) ||
                      (typeof child.type === 'object' && child.type !== null && (child.type as { displayName?: string }).displayName?.includes('Button'))

      const childClass = isButton ? s['button'] : s['child']
      const existingClassName = (child.props as { className?: string }).className || ''

      return React.cloneElement(child, {
        ...(child.props as Record<string, unknown>),
        className: classnames(childClass, existingClassName)
      })
    }
    return child
  })

  return (
    <div className={classes} {...restProps}>
      {enhancedChildren}
    </div>
  )
}

export { HorizontalWrapper }