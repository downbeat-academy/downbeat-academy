import NextLink from 'next/link'
import classnames from 'classnames'
import s from './link.module.css'

import type { LinkProps } from './types'

const Link = ({
	opensInNewTab = false,
	href,
	children,
	type = 'primary',
	className,
	isUnderline = true,
	dataCy,
	target,
	ariaDescribedBy,
	...restProps
}: LinkProps) => {
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
			data-cy={dataCy}
		>
			{children}
		</NextLink>
	)
}

export { Link }
export type { LinkProps }
