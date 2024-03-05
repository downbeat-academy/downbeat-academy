import classnames from 'classnames'
import s from './bento-box.module.scss'

import type { BentoBoxProps } from './types'

const BentoBox = ({
  children,
  isFullHeight = true,
  className,
}: BentoBoxProps) => {

  const classes = classnames(
    s.root,
    { [s['full-height']]: isFullHeight },
    className,
  )

  return (
    <section className={classes}>
      {children}
    </section>
  )
}

export { BentoBox }