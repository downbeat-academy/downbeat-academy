import { ComponentPropsWithoutRef, ElementRef } from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'

type SeparatorColor =
	| 'primary'
	| 'faint'
	| 'brand'
	| 'interactive'
	| 'success'
	| 'warning'
	| 'critical'
	| 'high-contrast'

interface SeparatorProps
	extends ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
	/** The color variant of the separator.
	 * @default 'primary'
	 */
	color?: SeparatorColor
}

type SeparatorElement = ElementRef<typeof SeparatorPrimitive.Root>

export type { SeparatorProps, SeparatorColor, SeparatorElement }
