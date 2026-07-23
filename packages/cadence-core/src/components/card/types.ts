import { ElementType, HTMLAttributes } from 'react'

type CardRadius = 'none' | 'hard' | 'medium' | 'soft' | 'x-soft'

type CardBackground =
	| 'primary'
	| 'faint'
	| 'high-contrast'
	| 'brand'
	| 'interactive'
	| 'success'
	| 'warning'
	| 'critical'

interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
	children?: React.ReactNode
	borderColor?: 'none' | 'primary' | 'faint'
	/** Corner rounding, mapped to the `--cds-radii-*` tokens */
	radius?: CardRadius
	/** Surface color, mapped to the `--cds-color-surface-*` tokens */
	background?: CardBackground
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

export type { CardProps, CardImageProps, CardContentProps, CardRadius, CardBackground }
