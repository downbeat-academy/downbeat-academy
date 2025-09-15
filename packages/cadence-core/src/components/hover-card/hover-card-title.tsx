import React from 'react'
import classnames from 'classnames'
import s from './hover-card.module.css'

export interface HoverCardTitleProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const HoverCardTitle = ({ children, className, as: Component = 'div', ...props }: HoverCardTitleProps) => {
  const classes = classnames(s.title, className)

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}

export { HoverCardTitle }