import type { ComponentProps } from 'react'
import NextLink from 'next/link'

interface LinkProps extends ComponentProps<typeof NextLink> {
  opensInNewTab?: boolean,
  type?: 'primary' | 'secondary' | 'brand',
  className?: string,
  isUnderline?: boolean,
}

export type { LinkProps }