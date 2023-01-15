import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Flex, LogoLockup } from 'cadence-core'
import s from '@styles/components/navigation/header.module.scss'

import { Secondary } from './Secondary'

const Header = () => {
  return (
    <header className={s.wrapper}>
      <Secondary />
      <nav className={s.navbar}>
        <Link href='/'>
          <LogoLockup color='brand' width={200} />
        </Link>
        <p>This is the navbar</p>
      </nav>
    </header>
  )
}

export { Header }