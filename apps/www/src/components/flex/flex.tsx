import classnames from 'classnames'
import s from './flex.module.css'

import type { FlexProps } from './types'

const Flex = ({
	children,
	tag = 'div',
	gap = 'none',
	padding = 'none',
	direction = 'column',
	className,
	alignItems,
	alignContent,
	justifyItems,
	justifyContent,
	background,
	wrap,
}: FlexProps) => {
	const classes = classnames([
		s.root,
		s[`gap--${gap}`],
		s[`padding--${padding}`],
		s[direction],
		s[`align-items--${alignItems}`],
		s[`align-content--${alignContent}`],
		s[`justify-items--${justifyItems}`],
		s[`justify--${justifyContent}`],
		s[`background--${background}`],
		wrap && s['wrap'],
		className,
	])

	const Tag = tag

	return <Tag className={classes}>{children}</Tag>
}

export { Flex }
export type { FlexProps }
