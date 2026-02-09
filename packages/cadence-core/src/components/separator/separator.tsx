import React from 'react'
import classnames from 'classnames'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import s from './separator.module.css'

import type { SeparatorProps, SeparatorElement } from './types'

const Separator = React.forwardRef<SeparatorElement, SeparatorProps>(
	(
		{
			className,
			orientation = 'horizontal',
			decorative = true,
			color = 'primary',
			...props
		},
		ref
	) => {
		const classes = classnames(
			s.root,
			s[`color--${color}`],
			s[`orientation--${orientation}`],
			className
		)

		return (
			<SeparatorPrimitive.Root
				ref={ref}
				decorative={decorative}
				orientation={orientation}
				className={classes}
				{...props}
			/>
		)
	}
)
Separator.displayName = 'Separator'

export { Separator }
