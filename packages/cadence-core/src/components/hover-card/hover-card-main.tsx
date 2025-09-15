import React from 'react'
import classnames from 'classnames'
import s from './hover-card.module.css'

export interface HoverCardMainProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const HoverCardMain = ({ children, className, ...props }: HoverCardMainProps) => {
  const classes = classnames(s.main, className)

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export { HoverCardMain }