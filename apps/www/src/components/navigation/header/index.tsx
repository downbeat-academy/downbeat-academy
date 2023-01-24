import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import classnames from 'classnames'
import { Flex, LogoLockup } from 'cadence-core'
import s from '@styles/components/navigation/header/header.module.scss'

import { Secondary } from './Secondary'
import { NavLinks } from './NavLinks'
import { Toggle } from './Toggle'

const Header = () => {
  const route = useRouter().asPath;
  const [navToggled, setNavToggled] = useState(false)
  const [scroll, setScroll] = useState(false)

  const handleNavToggle = () => {
    setNavToggled(!navToggled);
  }

  useEffect(() => setNavToggled(false), [route])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        setScroll(window.pageYOffset > 100);
      });
    }
  }, []);

  const classes = classnames(
    s.wrapper,
    [scroll ? s.scroll : ''],
  )

  return (
    <header className={classes}>
      <Secondary />
      <nav className={s.navbar}>
        <div className={s.navbarContent}>
          <Link href='/'>
            <LogoLockup color='brand' width={200} />
          </Link>
          <Toggle handleNavToggle={handleNavToggle} />
          <NavLinks navToggled={navToggled} />
        </div>
      </nav>
    </header>
  )
}

export { Header }