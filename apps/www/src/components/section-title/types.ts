interface SectionTitleProps {
	background?:
		| 'primary'
		| 'faint'
		| 'high-contrast'
		| 'brand'
		| 'interactive'
		| 'success'
		| 'warning'
		| 'critical'
	alignment?: 'left' | 'center' | 'right'
	title?: React.ReactNode
	subtitle?: React.ReactNode
	hasBorder?: boolean
	children?: React.ReactNode
	className?: string
}

export type { SectionTitleProps }
