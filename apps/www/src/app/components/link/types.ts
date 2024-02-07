import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { ComponentProps } from 'react'

interface CustomLinkProps extends NextLinkProps {
  opensInNewTab?: boolean,
  type?: 'primary' | 'secondary' | 'brand' | 'inherit',
  className?: string,
  dataCy?: string,
  isUnderline?: boolean,
}

type LinkProps = ComponentProps<typeof NextLink> & CustomLinkProps

export type { LinkProps }
