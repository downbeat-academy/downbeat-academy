import Link from 'next/link'
import classnames from 'classnames'
import { NavLinksProps } from './types'
import s from '@styles/components/navigation/header/navLinks.module.scss'

const NavLinks = ({ navToggled }: NavLinksProps) => {

  const classes = classnames(
    s.wrapper,
    [navToggled === true ? s.navLinksOpen : '']
  )

  return (
    <div className={classes}>
      <Link href='/articles' className={s.styledLink}>Articles</Link>
      <Link href='/about' className={s.styledLink}>About</Link>
      <Link href='/contributors' className={s.styledLink}>Contributors</Link>
      <Link href='/contact' className={s.styledLink}>Contact</Link>
    </div>
  )
}

export { NavLinks } 