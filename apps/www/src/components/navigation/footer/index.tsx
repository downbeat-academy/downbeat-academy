import Link from 'next/link'
import {
  Text,
  LogoSymbol,
  Flex,
} from 'cadence-core'
import { linkResolver } from '@utils/linkResolver'
import { socialLinks, siteLinks } from './FooterLinks'
import s from './footer.module.scss'

const Footer = ({ }) => {

  const getSocialLinks = socialLinks.map(socialLink => {
    return (
      <a
        href={socialLink.url}
        rel='noreferrer noopener'
        key={socialLink.name}
      >{`${socialLink.title}`}</a>
    )
  })

  console.log(socialLinks[0].icon)

  const getSiteLinks = siteLinks.map(category => {
    return (
      <Flex direction='column' key={category.name}>
        <Text tag='p'><strong>{category.title}</strong></Text>
        {category.links.map(link => {
          return <Link href={link.url} key={link.name}>{link.title}</Link>
        })}
      </Flex>
    )
  })

  return (
    <footer className={s.wrapper}>
      <div className={s.content}>
        <Flex direction='column'>
          <LogoSymbol color='secondary' width={80} />
          {getSocialLinks}
        </Flex>
        <Flex direction='row'>
          {getSiteLinks}
        </Flex>
      </div>
    </footer>
  )
}

export { Footer }