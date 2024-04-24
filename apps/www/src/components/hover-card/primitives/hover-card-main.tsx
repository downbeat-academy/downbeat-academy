import classnames from 'classnames'
import s from '../hover-card.module.scss'

type HoverCardMainProps = {
	children: React.ReactNode
	className?: string
}

const HoverCardMain = ({
	children,
	className,
	...props
}: HoverCardMainProps) => {
	const classes = classnames(s.main, className)

	return (
		<div className={classes} {...props}>
			{children}
		</div>
	)
}

export { HoverCardMain }
