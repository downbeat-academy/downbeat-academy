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
		<header className={classes} {...props}>
			{children}
		</header>
	)
}

export { HoverCardTitle }
