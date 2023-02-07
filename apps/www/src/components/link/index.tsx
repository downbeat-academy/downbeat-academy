import Link from 'next/link'
import classnames from 'classnames'
import { linkResolver } from '@utils/linkResolver'
import { LinkProps } from './types'
import s from './styledLink.module.scss'

const StyledLink = ({
  children,
  href,
  type = 'primary',
  target,
  documentType,
  style,
}: LinkProps) => {

  const classes = classnames(
    s.root,
    s[`style--${style}_type--${type}`],
  )

  if (href.includes('http')) {
    return (
      <a
        href={href}
        target={target}
        className={classes}
        rel='noopener noreferrer'
      >{children}</a>
    )
  } else {
    return (
      <Link href={linkResolver(href, documentType)} className={classes}>{children}</Link>
    )
  }
}

export { StyledLink }