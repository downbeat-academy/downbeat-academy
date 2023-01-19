import classnames from 'classnames'
import { FlexProps } from './types'
import s from './flex.module.scss'

const Flex = ({
	children,
	as,
	direction = 'row',
	gap = 'base',
	padding,
	background = 'primary',
	borderRadius,
	justify,
	wrap = 'nowrap',
	align,
	textAlign,
	borderColor,
}: FlexProps) => {
	const Component = as || 'div'

	const classes = classnames(
		s.root,
		s[`direction--${direction}`],
		s[`gap--${gap}`],
		s[`padding--${padding}`],
		s[`background--${background}`],
		s[`border-radius--${borderRadius}`],
		s[`border-color--${borderColor}`],
		s[`justify--${justify}`],
		s[`wrap--${wrap}`],
		s[`align--${align}`],
		s[`text-align--${textAlign}`]
	)

	return <Component className={classes}>{children}</Component>
}

export type { FlexProps }
export { Flex }
