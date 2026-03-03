'use client'

import { forwardRef } from 'react'
import NextLink from 'next/link'
import { Link as CadenceLink, type LinkProps as CadenceLinkProps } from 'cadence-core'

type LinkProps = Omit<CadenceLinkProps, 'as'>

const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
	<CadenceLink ref={ref} as={NextLink} {...props} />
))
Link.displayName = 'Link'

export { Link }
export type { LinkProps }
