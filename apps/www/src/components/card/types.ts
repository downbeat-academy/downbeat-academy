import { ElementType, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLElement> {
	children?: React.ReactNode
	borderColor?: 'none' | 'primary' | 'faint'
	tag?: ElementType | string
	className?: string
}

interface CardImageProps {
	image?: any
	alt?: string
	url?: string
}

interface CardContentProps {
	children?: React.ReactNode
	background?: string
	className?: string
}

export type { CardProps, CardImageProps, CardContentProps }
