import Link from 'next/link'
import {
  Text,
  LogoSymbol,
  Flex,
} from 'cadence-core'
import { socialLinks, siteLinks } from './FooterLinks'
import s from '@styles/components/navigation/footer.module.scss'

const Footer = ({ }) => {

  const getSocialLinks = socialLinks.map(socialLink => {
    return (
      <a
        href={socialLink.url}
        rel='noreferrer noopener'
        key={socialLink.name}
        className={s.footerLink}
      >{`${socialLink.title}`}</a>
    )
  })

  const getSiteLinks = siteLinks.map(category => {
    return (
      <Flex direction='column' key={category.name} gap='small'>
        <Text tag='p' color='primary' collapse={true}><strong>{category.title}</strong></Text>
        <Flex direction='column' gap='small'>
          {category.links.map(link => {
            return <Link href={link.url} key={link.name} className={s.footerLink}>{link.title}</Link>
          })}
        </Flex>
      </Flex>
    )
  })

  return (
    <footer className={s.wrapper}>
      <div className={s.content}>
        <Flex direction='column'>
          <LogoSymbol color='secondary' width={80} />
          <Flex direction='row' gap='x-large'>
            <Flex direction='column' gap='small'>
              {getSocialLinks}
            </Flex>
            {getSiteLinks}
          </Flex>
        </Flex>
      </div>
    </footer>
  )
}

export { Footer }