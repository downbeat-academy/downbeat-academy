import React, { PropsWithChildren } from 'react'
import { Link as ReactEmailLink } from '@react-email/components'
import { getLinkStyles, type LinkColor } from './styles'

export interface LinkProps {
  href: string
  color?: LinkColor
  style?: React.CSSProperties
  download?: boolean
}

export const Link = ({
  children,
  href,
  color = 'brand',
  style,
  download,
}: PropsWithChildren<LinkProps>) => {
  return (
    <ReactEmailLink
      href={href}
      download={download}
      style={{
        ...getLinkStyles(color),
        ...style,
      }}
    >
      {children}
    </ReactEmailLink>
  )
} 