import Link from 'next/link'
import {
  Text,
  LogoSymbol,
  Flex,
} from 'cadence-core'
import { socialLinks, siteLinks } from './FooterLinks'
import s from '@styles/components/navigation/footer/footer.module.scss'

const Footer = () => {

  const getSocialLinks = socialLinks.map(socialLink => {
    return (
      <a
        href={socialLink.url}
        rel='noreferrer noopener'
        key={socialLink.name}
        className={s.footerLink}
        target='_blank'
      >{`${socialLink.title}`}</a>
    )
  })

  const getSiteLinks = siteLinks.map(category => {
    return (
      <Flex direction='column' key={category.name} gap='base'>
        <Text tag='p' color='primary' size='base' category='body' weight='bold' collapse={true}>{category.title}</Text>
        <Flex direction='column' gap='x-small'>
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
        <Flex direction='column' gap='x-large'>
          <Link href='/'>
            <LogoSymbol color='secondary' width={80} />
          </Link>
          <Flex direction='row' gap='4x-large' wrap='wrap'>
            <Flex direction='column' gap='base'>
              <Text tag='p' color='primary' size='base' category='body' weight='bold' collapse={true}>Social</Text>
              <Flex direction='column' gap='small'>
                {getSocialLinks}
              </Flex>
            </Flex>
            {getSiteLinks}
          </Flex>
        </Flex>
      </div>
    </footer>
  )
}

export { Footer }