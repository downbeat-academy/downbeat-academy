import React from 'react'
import classnames from 'classnames'
import s from './avatar-group.module.css'

import type { AvatarGroupProps } from './types'

const AvatarGroup = ({
  children,
  spacing = 'overlap-small',
  direction = 'horizontal',
  className,
}: AvatarGroupProps) => {
  const classes = classnames(
    s.root,
    s[`direction--${direction}`],
    s[`spacing--${spacing}`],
    className,
  )

  return (
    <div className={classes} data-cy="cds-avatar-group">
      {children}
    </div>
  )
}

export { AvatarGroup }
export type { AvatarGroupProps }
