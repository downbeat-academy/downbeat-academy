import { ElementType, HTMLAttributes } from 'react'

interface SectionContainerProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
	tag?: ElementType | string
	children: React.ReactNode
	background?:
	| 'primary'
	| 'faint'
	| 'high-contrast'
	| 'brand'
	| 'interactive'
	| 'success'
	| 'warning'
	| 'critical'
	borderColor?:
	| 'primary'
	| 'faint'
	| 'brand'
	| 'interactive'
	| 'success'
	| 'warning'
	| 'critical'
	| 'high-contrast'
	className?: string
}

export type { SectionContainerProps }
