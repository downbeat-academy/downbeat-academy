import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Flex, LogoLockup } from 'cadence-core'
import s from '@styles/components/navigation/header/header.module.scss'

import { Secondary } from './Secondary'
import { HeaderLinks } from './HeaderLinks'
import { Toggle } from './Toggle'

const Header = () => {
  return (
    <header className={s.wrapper}>
      <Secondary />
      <nav className={s.navbar}>
        <div className={s.navbarContent}>
          <Link href='/'>
            <LogoLockup color='brand' width={200} />
          </Link>
          <HeaderLinks />
          <Toggle />
        </div>
      </nav>
    </header>
  )
}

export { Header }