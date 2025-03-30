import React from 'react'
import { Link as ReactEmailLink } from '@react-email/components'
import { getLinkStyles, type LinkColor } from './styles'

export interface LinkProps {
  children: React.ReactNode
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
}: LinkProps) => {
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