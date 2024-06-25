const DropdownMenuShortcut = ({
	className,
	...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
	return <span {...props} />
}

DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

export { DropdownMenuShortcut }
