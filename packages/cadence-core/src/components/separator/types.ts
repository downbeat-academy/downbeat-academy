import { ComponentPropsWithoutRef } from 'react'

type SeparatorColor =
	| 'primary'
	| 'faint'
	| 'brand'
	| 'interactive'
	| 'success'
	| 'warning'
	| 'critical'
	| 'high-contrast'

type SeparatorOrientation = 'horizontal' | 'vertical'

interface SeparatorProps extends ComponentPropsWithoutRef<'div'> {
	/** The color variant of the separator.
	 * @default 'primary'
	 */
	color?: SeparatorColor
	/** The axis the separator is drawn along.
	 * @default 'horizontal'
	 */
	orientation?: SeparatorOrientation
	/** When true the separator is presentational only and is hidden from the
	 * accessibility tree. Set to false when it conveys a real structural division.
	 * @default true
	 */
	decorative?: boolean
}

type SeparatorElement = HTMLDivElement

export type {
	SeparatorProps,
	SeparatorColor,
	SeparatorOrientation,
	SeparatorElement,
}
