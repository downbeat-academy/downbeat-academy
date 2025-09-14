import classnames from 'classnames'
import s from '../hover-card.module.css'

type HoverCardTitleProps = {
	children: React.ReactNode
	className?: string
}

const HoverCardTitle = ({
	children,
	className,
	...props
}: HoverCardTitleProps) => {
	const classes = classnames(s.title, className)

	return (
		<div className={classes} {...props}>
			{children}
		</div>
	)
}

export { HoverCardTitle }
