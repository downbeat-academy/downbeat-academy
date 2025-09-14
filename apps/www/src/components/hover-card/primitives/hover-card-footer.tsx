import classnames from 'classnames'
import s from '../hover-card.module.css'

type HoverCardFooterProps = {
	children: React.ReactNode
	className?: string
}

const HoverCardFooter = ({
	children,
	className,
	...props
}: HoverCardFooterProps) => {
	const classes = classnames(s.footer, className)

	return (
		<div className={classes} {...props}>
			{children}
		</div>
	)
}

export { HoverCardFooter }
