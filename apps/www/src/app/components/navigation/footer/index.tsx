import classnames from 'classnames'
import s from './footer.module.scss'

import type { FooterProps } from './types'

const Footer = ({
  className,
}: FooterProps) => {

  const classes = classnames(
    s['footer--root'],
    [className]
  )
  return (
    <footer className={classes}>
      <p>This is the footer</p>
    </footer>
  )
}

export { Footer }