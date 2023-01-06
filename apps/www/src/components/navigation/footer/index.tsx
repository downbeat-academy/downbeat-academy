import Link from 'next/link'
import {
  Text,
  LogoLockup,
  Flex,
} from 'cadence-core'
import { socialLinks, siteLinks } from './FooterLinks'
import s from '@styles/components/navigation/footer.module.css'
import { Button } from '@components/button'

const Footer = ({ }) => {
  return (
    <footer className={s.wrapper}>
      <div className={s.content}>
        <Button text="Button text" />
        {/* <Flex direction='column'>
          <LogoLockup />
        </Flex> */}
      </div>
    </footer>
  )
}

export { Footer }