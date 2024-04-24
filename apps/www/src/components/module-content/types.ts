interface ModuleItemProps {
	children?: React.ReactNode
	gridArea?: 'start' | 'center' | 'end' | 'full-bleed'
	padding?:
		| 'none'
		| 'x-small'
		| 'small'
		| 'medium'
		| 'large'
		| 'x-large'
		| '2x-large'
		| '3x-large'
	paddingX?:
		| 'none'
		| 'x-small'
		| 'small'
		| 'medium'
		| 'large'
		| 'x-large'
		| '2x-large'
		| '3x-large'
	paddingY?:
		| 'none'
		| 'x-small'
		| 'small'
		| 'medium'
		| 'large'
		| 'x-large'
		| '2x-large'
		| '3x-large'
	className?: string
}

export type { ModuleItemProps }
