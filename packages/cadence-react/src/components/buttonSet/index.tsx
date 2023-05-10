import classnames from 'classnames'
import { ButtonSetProps } from './types'
import styles from './buttonSet.module.scss'

const ButtonSet = ({
	children,
	className,
	direction = 'row',
	gap = 'default',
	justify = 'start',
}: ButtonSetProps) => {
	const classes = classnames(
		styles.root,
		styles[`direction--${direction}`],
		styles[`gap--${gap}`],
		styles[`justify--${justify}`],
		className
	)

	return <div className={classes}>{children}</div>
}

export type { ButtonSetProps }
export { ButtonSet }
