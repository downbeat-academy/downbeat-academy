import s from '../dialog.module.css'

const DialogHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={s.header} {...props} />
)

DialogHeader.displayName = 'DialogHeader'

export { DialogHeader }
