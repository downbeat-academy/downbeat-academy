import React, { forwardRef, type ElementType } from 'react'
import classnames from 'classnames'
import s from './link.module.css'

import type { LinkProps } from './types'

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
	(
		{
			as,
			type = 'primary',
			isUnderline = true,
			dataCy,
			className,
			children,
			...restProps
		},
		ref
	) => {
		const classes = classnames(
			s.root,
			s[type],
			{ [s.underline]: isUnderline },
			className
		)

		const Component: ElementType = as || 'a'

		return (
			<Component
				ref={ref}
				className={classes}
				data-cy={dataCy}
				{...restProps}
			>
				{children}
			</Component>
		)
	}
)
Link.displayName = 'Link'

export { Link }
