import s from './Footer.module.scss'

import type { FooterProps } from './types'

export const Footer = ({
  className,
}: FooterProps) => {
  return (
    <footer className={s.footerRoot}>
      <p>This is the footer</p>
    </footer>
  )
}