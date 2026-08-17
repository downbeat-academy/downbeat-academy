'use client'

import { forwardRef } from 'react'
import NextLink from 'next/link'
import {
	Link as CadenceLink,
	type LinkProps as CadenceLinkProps,
} from 'cadence-core'

// An adapter, not a component. `cadence-core`'s Link is polymorphic and renders a bare
// `<a>` by default; this binds it to `next/link` so app routes keep client-side
// navigation. Identical to `apps/www/src/components/link/`, and the same shape as
// `components/ui/button.tsx`.
//
// It replaced a full second implementation of Link that this app used to carry. That copy
// also silently ignored `isUnderline={false}`, because it never set `text-decoration: none`
// on the base class the way `cadence-core` does.
type LinkProps = Omit<CadenceLinkProps, 'as'>

const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
	<CadenceLink ref={ref} as={NextLink} {...props} />
))
Link.displayName = 'Link'

export { Link }
export type { LinkProps }
