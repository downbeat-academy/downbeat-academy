import classnames from 'classnames'
import s from './bento-item.module.scss'

import type { BentoItemProps } from './types'

const BentoItem = ({
  children,
  background,
  height,
  width,
  className,
}: BentoItemProps) => {

  const classes = classnames(
    s.root,
    s[`background--${background}`],
    s[`height--${height}`],
    s[`width--${width}`],
    className,
  )

  return (
    <article className={classes}>
      {children}
    </article>
  )
}

export { BentoItem }