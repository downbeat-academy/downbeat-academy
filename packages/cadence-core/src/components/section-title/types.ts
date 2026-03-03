import type { ReactNode } from 'react'

type SectionTitleAlignment = 'left' | 'center' | 'right'

type SectionTitleBackground =
	| 'primary'
	| 'faint'
	| 'high-contrast'
	| 'brand'
	| 'interactive'
	| 'success'
	| 'warning'
	| 'critical'

interface SectionTitleProps {
	/** Background color variant */
	background?: SectionTitleBackground
	/** Text alignment.
	 * @default 'left'
	 */
	alignment?: SectionTitleAlignment
	/** Primary title content */
	title?: ReactNode
	/** Secondary subtitle content */
	subtitle?: ReactNode
	/** Whether to show a bottom border.
	 * @default true
	 */
	hasBorder?: boolean
	/** Additional content to render */
	children?: ReactNode
	/** Additional CSS class names */
	className?: string
}

export type { SectionTitleProps, SectionTitleAlignment, SectionTitleBackground }
