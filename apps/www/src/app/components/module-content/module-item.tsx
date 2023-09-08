import classnames from 'classnames'
import s from './module-item.module.scss'

import type { ModuleItemProps } from './types'

const ModuleItem = ({
  children,
  gridArea,
  padding,
  paddingX,
  paddingY,
  className,
}: ModuleItemProps) => {

  const classes = classnames(
    s.root,
    s[`grid-area--${gridArea}`],
    {
      [s[`padding--${padding}`]]: !paddingX && !paddingY,
    },
    {
      [s[`padding-x--${paddingX}`]]: !padding,
      [s[`padding-y--${paddingY}`]]: !padding,
    },
    className,
  )

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export { ModuleItem }