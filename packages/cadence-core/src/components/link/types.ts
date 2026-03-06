import type { ElementType, ComponentPropsWithRef, ReactNode } from 'react'

/** Color variant for the link */
type LinkType = 'primary' | 'secondary' | 'brand' | 'inherit'

interface LinkOwnProps {
	/** The polymorphic element type to render.
	 * @default 'a'
	 */
	as?: ElementType
	/** The color variant of the link.
	 * @default 'primary'
	 */
	type?: LinkType
	/** Whether the link text has an underline.
	 * @default true
	 */
	isUnderline?: boolean
	/** Test identifier */
	dataCy?: string
	/** Additional CSS class names */
	className?: string
	/** Content to display inside the link */
	children?: ReactNode
}

type LinkProps = LinkOwnProps &
	Omit<ComponentPropsWithRef<'a'>, keyof LinkOwnProps>

export type { LinkProps, LinkType }
