import Link from 'next/link'
import {
  Text,
  LogoLockup,
  Flex,
} from 'cadence-core'
import { socialLinks, siteLinks } from './FooterLinks'
import s from './footer.module.scss'

const Footer = ({ }) => {
  return (
    <footer className={s.wrapper}>
      <div className={s.content}>
        <Flex direction='column'>
          <LogoLockup />
        </Flex>
      </div>
    </footer>
  )
}

export { Footer }