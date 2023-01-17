import Link from 'next/link'
import classnames from 'classnames'
import { HeaderLinkTypes } from './types'
import s from '@styles/components/navigation/header/headerLinks.module.scss'

const HeaderLinks = ({ viewport }: HeaderLinkTypes) => {

  const classes = classnames(
    s.wrapper
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

export { HeaderLinks } 