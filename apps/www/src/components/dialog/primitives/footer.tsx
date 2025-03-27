import s from '../dialog.module.css'

const DialogFooter = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={s.footer} {...props} />
)

DialogFooter.displayName = 'DialogFooter'

export { DialogFooter }
