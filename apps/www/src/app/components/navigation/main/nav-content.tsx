import s from './nav-content.module.scss'
import { LogoLockup } from '@components/brand'
import { Link } from '@components/link'

const NavContent = ({ children }) => {
  return (
    <div className={s.root}>
      <div className={s.logo}>
        <Link href="/">
          <LogoLockup width={180} color='brand' />
        </Link>
      </div>
      <nav>
        Links go here
      </nav>
    </div>
  )
}

export { NavContent };