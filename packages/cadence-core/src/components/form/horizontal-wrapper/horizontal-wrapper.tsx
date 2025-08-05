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
    if (React.isValidElement(child)) {
      const isButton = child.type === 'button' || 
                      (typeof child.type === 'function' && (child.type as any).displayName?.includes('Button')) ||
                      (typeof child.type === 'object' && child.type !== null && (child.type as any).displayName?.includes('Button'))
      
      const childClass = isButton ? s['button'] : s['child']
      const existingClassName = child.props.className || ''
      
      return React.cloneElement(child, {
        ...child.props,
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