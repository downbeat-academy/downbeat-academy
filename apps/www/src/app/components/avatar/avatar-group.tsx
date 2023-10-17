import classnames from 'classnames'
import s from './avatar-group.module.scss'

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
    <div className={classes}>
      {children}
    </div>
  )
}

export { AvatarGroup }
export type { AvatarGroupProps }