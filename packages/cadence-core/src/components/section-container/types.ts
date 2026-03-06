import type { ElementType, HTMLAttributes, ReactNode } from 'react'

type SectionContainerBackground =
	| 'primary'
	| 'faint'
	| 'high-contrast'
	| 'brand'
	| 'interactive'
	| 'success'
	| 'warning'
	| 'critical'

type SectionContainerBorderColor =
	| 'primary'
	| 'faint'
	| 'brand'
	| 'interactive'
	| 'success'
	| 'warning'
	| 'critical'
	| 'high-contrast'

interface SectionContainerProps
	extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
	/** The HTML element to render.
	 * @default 'div'
	 */
	tag?: ElementType | string
	/** Content to display inside the container */
	children: ReactNode
	/** Background color variant */
	background?: SectionContainerBackground
	/** Border color variant.
	 * @default 'primary'
	 */
	borderColor?: SectionContainerBorderColor
	/** Additional CSS class names */
	className?: string
}

export type {
	SectionContainerProps,
	SectionContainerBackground,
	SectionContainerBorderColor,
}
