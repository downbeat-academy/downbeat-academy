import classnames from 'classnames'
import { BadgeProps } from './types'
import s from './badge.module.scss'

const Badge = ({
	type = 'neutral',
	text,
	style = 'fill',
	size = 'default',
	className
}: BadgeProps) => {
	const classes = classnames(
		s.root,
		s[`type--${type}--${style}`],
		s[`size--${size}`],
		className
	)

	return <span className={classes}>{text}</span>
}

export type { BadgeProps }
export { Badge }
