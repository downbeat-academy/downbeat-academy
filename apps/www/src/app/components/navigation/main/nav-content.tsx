import s from './nav-content.module.scss'
import { LogoLockup } from '@components/brand'
import { Link } from '@components/link'

const NavContent = ({ links }) => {

  const staticLinks = [
    {
      text: 'Articles',
      href: '/articles'
    },
    {
      text: 'About',
      href: '/about'
    },
    {
      text: 'Contributors',
      href: '/contributors'
    },
    {
      text: 'Contact',
      href: '/contact',
    }
  ]

  const mapLinks = staticLinks.map(link => {
    return (
      <li key={link.text} className={s[`link-item`]}>
        <Link href={link.href} type='secondary'>{link.text}</Link>
      </li>
    )
  })

  return (
    <div className={s.root}>
      <div className={s.logo}>
        <Link href="/">
          <LogoLockup width={180} color='brand' />
        </Link>
      </div>
      <nav>
        <ul className={s[`nav-links`]}>
          {mapLinks}
        </ul>
      </nav>
    </div>
  )
}

export { NavContent };