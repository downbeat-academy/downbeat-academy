import { ElementType, HTMLAttributes } from 'react'

interface GridProps extends HTMLAttributes<HTMLElement> {
	children?: React.ReactNode
	columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
	tag?: ElementType | string
	className?: string
}

export type { GridProps }
