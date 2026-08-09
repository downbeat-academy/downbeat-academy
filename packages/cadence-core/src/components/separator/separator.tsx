'use client'

import React from 'react'
import classnames from 'classnames'
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
		const classes = classnames(s.root, s[`color--${color}`], className)

		return (
			<div
				ref={ref}
				// A decorative separator is a visual flourish with no structural meaning, so
				// it is hidden from the accessibility tree entirely.
				role={decorative ? 'none' : 'separator'}
				// `horizontal` is the ARIA default for `separator`, so it is left implicit;
				// `role="none"` carries no orientation at all.
				aria-orientation={
					!decorative && orientation === 'vertical' ? 'vertical' : undefined
				}
				// Emitted regardless of `decorative` — the stylesheet sizes the separator off
				// this attribute rather than off a class.
				data-orientation={orientation}
				className={classes}
				{...props}
			/>
		)
	}
)
Separator.displayName = 'Separator'

export { Separator }
