import React from 'react'
import classnames from 'classnames'
import s from './hover-card.module.css'

export interface HoverCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const HoverCardFooter = ({ children, className, ...props }: HoverCardFooterProps) => {
  const classes = classnames(s.footer, className)

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export { HoverCardFooter }