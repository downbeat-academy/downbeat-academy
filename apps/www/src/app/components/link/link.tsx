import NextLink from 'next/link'
import classnames from 'classnames'
import s from './link.module.scss'

import type { LinkProps } from "./types"

const Link = ({
  opensInNewTab = false,
  href,
  children,
  type = 'primary',
  className,
  isUnderline = true,
  ...restProps
}: LinkProps) => {

  const target = opensInNewTab ? '_blank' : restProps.target

  let ariaDescribedBy: LinkProps['aria-describedby']
  if (restProps['aria-describedby']?.length > 0) {
    ariaDescribedBy += ` ${restProps['aria-describedby']}`
  }

  const classes = classnames([
    s.root,
    s[type],
    {
      [s.underline]: isUnderline,
    },
    className,
  ])

  return (
    <NextLink
      href={href}
      {...restProps}
      target={target}
      aria-describedby={ariaDescribedBy}
      className={classes}
    >
      {children}
    </NextLink>
  )
}

export { Link }
export type { LinkProps }