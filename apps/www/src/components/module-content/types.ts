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

interface ModuleRendererProps {
	modules: Array<{
		_type: string
		_key?: string
		content?: any
		[key: string]: any
	}>
}

export type { ModuleItemProps, ModuleRendererProps }
