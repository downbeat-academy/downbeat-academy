import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string
	titleId?: string
}
const SvgRepeat = ({
	title,
	titleId,
	...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		role="img"
		color={props.color}
		aria-labelledby={titleId}
		{...props}
	>
		{title ? <title id={titleId}>{title}</title> : null}
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M20 11a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H6.414l1.293 1.293a1 1 0 1 1-1.414 1.414l-3-3-.002-.002a.997.997 0 0 1 0-1.41l.002-.002 3-3a1 1 0 0 1 1.414 1.414L6.414 17H17a2 2 0 0 0 2-2v-3a1 1 0 0 1 1-1ZM4 13a1 1 0 0 1-1-1V9a4 4 0 0 1 4-4h10.586l-1.293-1.293a1 1 0 0 1 1.414-1.414l3 3 .002.002a.997.997 0 0 1 0 1.41l-.002.002-3 3a1 1 0 0 1-1.414-1.414L17.586 7H7a2 2 0 0 0-2 2v3a1 1 0 0 1-1 1Z"
			clipRule="evenodd"
		/>
	</svg>
)
export default SvgRepeat
